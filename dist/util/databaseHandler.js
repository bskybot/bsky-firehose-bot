"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const fs_1 = __importDefault(require("fs"));
class DatabaseHandler {
    constructor(dbPath) {
        this.dbPath = dbPath;
        this.db = null;
        this.isConnected = false;
    }
    // Erstellt eine Datenbankdatei, falls sie nicht existiert
    static createDatabase(dbName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(dbName)) {
                const db = yield (0, sqlite_1.open)({
                    filename: dbName,
                    driver: sqlite3_1.default.Database,
                });
                yield db.close();
                console.log(`Datenbank "${dbName}" wurde erstellt.`);
            }
            else {
                console.log(`Datenbank "${dbName}" existiert bereits.`);
            }
        });
    }
    // Öffnet die Verbindung zur bestehenden Datenbank
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield (0, sqlite_1.open)({
                filename: this.dbPath,
                driver: sqlite3_1.default.Database,
            });
            this.isConnected = true;
        });
    }
    // Erstellt die Tabelle, falls sie nicht existiert
    createTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            const query = `
      CREATE TABLE IF NOT EXISTS "${tableName}" (
        did TEXT PRIMARY KEY,
        dm_sent DATE,
        consent_date DATE,
        UNIQUE(did)
      )
    `;
            yield this.db.run(query);
        });
    }
    addRows(tableName, dids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            if (!dids.length)
                return; // Wenn das Array leer ist, abbrechen
            const placeholders = dids.map(() => "(?)").join(", "); // Platzhalter für jedes Element im Array
            const insertQuery = `
      INSERT OR IGNORE INTO "${tableName}" (did)
      VALUES ${placeholders}
    `;
            yield this.db.run(insertQuery, dids); // Einmalige Ausführung der Query mit allen Werten
        });
    }
    // Aktualisiert die Spalte "dm_sent" einer bestimmten Zeile
    updateDmSentDate(tableName, did) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            const query = `
      UPDATE "${tableName}"
      SET dm_sent = CURRENT_TIMESTAMP
      WHERE did = ?
    `;
            yield this.db.run(query, [did]);
        });
    }
    // Aktualisiert die Spalte "consent_date" einer bestimmten Zeile
    updateConsentDate(tableName, did) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            const query = `
      UPDATE "${tableName}"
      SET consent_date = CURRENT_TIMESTAMP
      WHERE did = ?
    `;
            yield this.db.run(query, [did]);
        });
    }
    deleteNoFollower(tableName, dids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            // 1. Hole alle existierenden DIDs aus der Tabelle
            const existingDidsQuery = `SELECT did FROM "${tableName}"`;
            const existingDidsRows = yield this.db.all(existingDidsQuery);
            const existingDids = existingDidsRows.map(row => row.did);
            // 2. Entferne Zeilen, deren DIDs nicht im Array vorhanden sind
            const toDelete = existingDids.filter(did => !dids.includes(did));
            yield this.deleteRows(tableName, toDelete);
        });
    }
    // Lösche eine Vielzahl an Zeilen aus der Tabelle
    deleteRows(tableName, dids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            if (!dids.length)
                return; // Wenn das Array leer ist, abbrechen
            // Erstelle eine Liste mit Platzhaltern für die IN-Klausel
            const placeholders = dids.map(() => '?').join(', ');
            const query = `
      DELETE FROM "${tableName}"
      WHERE did IN (${placeholders})
    `;
            yield this.db.run(query, dids);
        });
    }
    // Überprüft, ob für die gegebene DID dm_sent gesetzt ist
    hasDmSent(tableName, did) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            const query = `
      SELECT dm_sent
      FROM "${tableName}"
      WHERE did = ?
    `;
            const row = yield this.db.get(query, [did]);
            // Wenn keine Zeile gefunden wird oder dm_sent NULL ist, return false, sonst true
            return (row === null || row === void 0 ? void 0 : row.dm_sent) !== null;
        });
    }
    // Überprüft, ob für die gegebene DID das consent_date gesetzt ist
    hasConsentDate(tableName, did) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                throw new Error('Database not connected.');
            const query = `
      SELECT consent_date
      FROM "${tableName}"
      WHERE did = ?
    `;
            const row = yield this.db.get(query, [did]);
            // Wenn keine Zeile gefunden wird oder consent_date NULL ist, return false, sonst true
            return (row === null || row === void 0 ? void 0 : row.consent_date) !== null;
        });
    }
    // Schließt die Datenbankverbindung
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                yield this.db.close();
                this.db = null;
                this.isConnected = false;
            }
        });
    }
}
exports.default = DatabaseHandler;

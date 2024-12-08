import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import fs from 'fs';
import { Logger } from './logger';

// Typ für die Datenbankinstanz
type SQLiteDatabase = Database<sqlite3.Database, sqlite3.Statement>;

class DatabaseHandler {
  private db: SQLiteDatabase | null = null;
  public isConnected = false;

  constructor(private dbPath: string) {}

  // Erstellt eine Datenbankdatei, falls sie nicht existiert
  static async createDatabase(dbName: string) {
    if (!fs.existsSync(dbName)) {
      const db = await open<sqlite3.Database, sqlite3.Statement>({
        filename: dbName,
        driver: sqlite3.Database,
      });
      await db.close();
      Logger.info(`Datenbank "${dbName}" wurde erstellt.`);
    } else {
      Logger.info(`Datenbank "${dbName}" existiert bereits.`);
    }
  }

  // Öffnet die Verbindung zur bestehenden Datenbank
  async connect() {
    this.db = await open<sqlite3.Database, sqlite3.Statement>({
      filename: this.dbPath,
      driver: sqlite3.Database,
    });

    this.isConnected = true;
  }

  // Erstellt die Tabelle, falls sie nicht existiert
  async createTable(tableName: string) {
    if (!this.db) throw new Error('Database not connected.');
  
    const query = `
      CREATE TABLE IF NOT EXISTS "${tableName}" (
        did TEXT PRIMARY KEY,
        dm_sent DATE,
        consent_date DATE,
        UNIQUE(did)
      )
    `;
    await this.db.run(query);
  }

  async addRows(tableName: string, dids: string[]) {
    if (!this.db) throw new Error('Database not connected.');
    if (!dids.length) return; // Wenn das Array leer ist, abbrechen
  
    const placeholders = dids.map(() => "(?)").join(", "); // Platzhalter für jedes Element im Array
    const insertQuery = `
      INSERT OR IGNORE INTO "${tableName}" (did)
      VALUES ${placeholders}
    `;
  
    await this.db.run(insertQuery, dids); // Einmalige Ausführung der Query mit allen Werten
  }
  
  // Aktualisiert die Spalte "dm_sent" einer bestimmten Zeile
  async updateDmSentDate(tableName: string, did: string) {
    if (!this.db) throw new Error('Database not connected.');
  
    const query = `
      UPDATE "${tableName}"
      SET dm_sent = CURRENT_TIMESTAMP
      WHERE did = ?
    `;
    await this.db.run(query, [did]);
  }


  // Aktualisiert die Spalte "consent_date" einer bestimmten Zeile
  async updateConsentDate(tableName: string, did: string) {
    if (!this.db) throw new Error('Database not connected.');
  
    const query = `
      UPDATE "${tableName}"
      SET consent_date = CURRENT_TIMESTAMP
      WHERE did = ?
    `;
    await this.db.run(query, [did]);
  }

  async deleteNoFollower(tableName: string, dids: string[]): Promise<void> {
    if (!this.db) throw new Error('Database not connected.');

    // 1. Hole alle existierenden DIDs aus der Tabelle
    const existingDidsQuery = `SELECT did FROM "${tableName}"`;
    const existingDidsRows: { did: string }[] = await this.db.all(existingDidsQuery);
    const existingDids = existingDidsRows.map(row => row.did);
  
    // 2. Entferne Zeilen, deren DIDs nicht im Array vorhanden sind
    const toDelete = existingDids.filter(did => !dids.includes(did));
    await this.deleteRows(tableName, toDelete);
      
  }

  // Lösche eine Vielzahl an Zeilen aus der Tabelle
  async deleteRows(tableName: string, dids: string[]) {
    if (!this.db) throw new Error('Database not connected.');
  
    if (!dids.length) return; // Wenn das Array leer ist, abbrechen
  
  
    // Erstelle eine Liste mit Platzhaltern für die IN-Klausel
    const placeholders = dids.map(() => '?').join(', ');
  
    const query = `
      DELETE FROM "${tableName}"
      WHERE did IN (${placeholders})
    `;
  
    await this.db.run(query, dids);
  }

  // Überprüft, ob für die gegebene DID dm_sent gesetzt ist
  async hasDmSent(tableName: string, did: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected.');

    const query = `
      SELECT dm_sent
      FROM "${tableName}"
      WHERE did = ?
    `;

    const row: { dm_sent: string | null } | undefined = await this.db.get(query, [did]);

    // Wenn keine Zeile gefunden wird oder dm_sent NULL ist, return false, sonst true
    return row?.dm_sent !== null;
  }
  

  // Überprüft, ob für die gegebene DID das consent_date gesetzt ist
  async hasConsentDate(tableName: string, did: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected.');

    const query = `
      SELECT consent_date
      FROM "${tableName}"
      WHERE did = ?
    `;

    const row: { consent_date: string | null } | undefined = await this.db.get(query, [did]);

    // Wenn keine Zeile gefunden wird oder consent_date NULL ist, return false, sonst true
    return row?.consent_date !== null;
  }

  // Schließt die Datenbankverbindung
  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.isConnected = false;
    }
  }
}

export default DatabaseHandler;

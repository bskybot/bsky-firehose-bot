import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import fs from 'fs';
import { Logger } from './logger';

/** 
 * Type alias for the SQLite database instance.
 */
type SQLiteDatabase = Database<sqlite3.Database, sqlite3.Statement>;

/**
 * A handler for interacting with a SQLite database, including creating tables, inserting,
 * updating, and deleting records, as well as checking certain conditions within the stored data.
 */
export class DatabaseHandler {
  private db: SQLiteDatabase | null = null;
  public isConnected = false;

  /**
   * Creates a new instance of `DatabaseHandler`.
   * 
   * @param dbPath - The path to the SQLite database file.
   */
  constructor(private dbPath: string) {}

  /**
   * Creates a new SQLite database file if it does not already exist.
   * If it exists, logs a message indicating the database is already present.
   * 
   * @param dbName - The name (path) of the database file to create.
   */
  static async createDatabase(dbName: string) {
    if (!fs.existsSync(dbName)) {
      const db = await open<sqlite3.Database, sqlite3.Statement>({
        filename: dbName,
        driver: sqlite3.Database,
      });
      await db.close();
      Logger.info(`Database "${dbName}" has been created.`);
    } else {
      Logger.info(`Database "${dbName}" already exists.`);
    }
  }

  /**
   * Opens a connection to the SQLite database at the specified `dbPath`.
   * 
   * @returns A promise that resolves once the connection is established.
   * @throws An error if the database connection fails.
   */
  async connect() {
    this.db = await open<sqlite3.Database, sqlite3.Statement>({
      filename: this.dbPath,
      driver: sqlite3.Database,
    });

    this.isConnected = true;
  }

  /**
   * Creates a table if it does not already exist.
   * 
   * The table contains columns for:
   * - `did`: The primary key (unique identifier for a user).
   * - `dm_sent`: A DATE indicating when a direct message was sent.
   * - `consent_date`: A DATE indicating when consent was given.
   * 
   * @param tableName - The name of the table to create.
   * @returns A promise that resolves once the table is created (or already exists).
   * @throws An error if the database is not connected.
   */
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

  /**
   * Inserts multiple DID (user ID) rows into the specified table using a single query.
   * If a DID already exists, the `INSERT OR IGNORE` clause ensures it won't be duplicated.
   * 
   * @param tableName - The name of the table.
   * @param dids - An array of DIDs to insert.
   * @returns A promise that resolves once the rows are inserted.
   * @throws An error if the database is not connected.
   */
  async addRows(tableName: string, dids: string[]) {
    if (!this.db) throw new Error('Database not connected.');
    if (!dids.length) return; // No operation if array is empty.
  
    const placeholders = dids.map(() => "(?)").join(", ");
    const insertQuery = `
      INSERT OR IGNORE INTO "${tableName}" (did)
      VALUES ${placeholders}
    `;
  
    await this.db.run(insertQuery, dids);
  }
  
  /**
   * Updates the `dm_sent` column for a specific DID, setting it to the current timestamp.
   * 
   * @param tableName - The name of the table.
   * @param did - The DID of the user to update.
   * @returns A promise that resolves once the update is completed.
   * @throws An error if the database is not connected.
   */
  async updateDmSentDate(tableName: string, did: string) {
    if (!this.db) throw new Error('Database not connected.');
  
    const query = `
      UPDATE "${tableName}"
      SET dm_sent = CURRENT_TIMESTAMP
      WHERE did = ?
    `;
    await this.db.run(query, [did]);
  }

  /**
   * Updates the `consent_date` column for a specific DID, setting it to the current timestamp.
   * 
   * @param tableName - The name of the table.
   * @param did - The DID of the user to update.
   * @returns A promise that resolves once the update is completed.
   * @throws An error if the database is not connected.
   */
  async updateConsentDate(tableName: string, did: string) {
    if (!this.db) throw new Error('Database not connected.');
  
    const query = `
      UPDATE "${tableName}"
      SET consent_date = CURRENT_TIMESTAMP
      WHERE did = ?
    `;
    await this.db.run(query, [did]);
  }

  /**
   * Removes rows corresponding to DIDs that are no longer present in the given `dids` array.
   * 
   * This function:
   * 1. Retrieves all existing DIDs from the specified table.
   * 2. Determines which DIDs are not in the current list of `dids`.
   * 3. Deletes those rows.
   * 
   * @param tableName - The name of the table.
   * @param dids - The current list of DIDs to retain.
   * @returns A promise that resolves once the non-follower entries are removed.
   * @throws An error if the database is not connected.
   */
  async deleteNoFollower(tableName: string, dids: string[]): Promise<void> {
    if (!this.db) throw new Error('Database not connected.');

    const existingDidsQuery = `SELECT did FROM "${tableName}"`;
    const existingDidsRows: { did: string }[] = await this.db.all(existingDidsQuery);
    const existingDids = existingDidsRows.map(row => row.did);
  
    const toDelete = existingDids.filter(did => !dids.includes(did));
    await this.deleteRows(tableName, toDelete);
  }

  /**
   * Deletes multiple rows from the specified table based on the provided DIDs.
   * 
   * @param tableName - The name of the table.
   * @param dids - An array of DIDs to delete from the table.
   * @returns A promise that resolves once the rows are deleted.
   * @throws An error if the database is not connected.
   */
  async deleteRows(tableName: string, dids: string[]) {
    if (!this.db) throw new Error('Database not connected.');
    if (!dids.length) return; // No operation if array is empty.
  
    const placeholders = dids.map(() => '?').join(', ');
  
    const query = `
      DELETE FROM "${tableName}"
      WHERE did IN (${placeholders})
    `;
  
    await this.db.run(query, dids);
  }

  /**
   * Checks if `dm_sent` is set for a given DID in the specified table.
   * 
   * @param tableName - The name of the table.
   * @param did - The DID to check.
   * @returns A promise that resolves to `true` if `dm_sent` is not null, otherwise `false`.
   * @throws An error if the database is not connected.
   */
  async hasDmSent(tableName: string, did: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected.');

    const query = `
      SELECT dm_sent
      FROM "${tableName}"
      WHERE did = ?
    `;

    const row: { dm_sent: string | null } | undefined = await this.db.get(query, [did]);

    return row?.dm_sent !== null;
  }
  
  /**
   * Checks if `consent_date` is set for a given DID in the specified table.
   * 
   * @param tableName - The name of the table.
   * @param did - The DID to check.
   * @returns A promise that resolves to `true` if `consent_date` is not null, otherwise `false`.
   * @throws An error if the database is not connected.
   */
  async hasConsentDate(tableName: string, did: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not connected.');

    const query = `
      SELECT consent_date
      FROM "${tableName}"
      WHERE did = ?
    `;

    const row: { consent_date: string | null } | undefined = await this.db.get(query, [did]);

    return row?.consent_date !== null;
  }

  /**
   * Closes the database connection if it is open.
   * 
   * @returns A promise that resolves once the database connection is closed.
   */
  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.isConnected = false;
    }
  }
}

export default DatabaseHandler;
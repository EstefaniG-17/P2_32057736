import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

export class ContactsModel {
    private db: Database | null = null;

    constructor() {
        this.initializeDB();
    }

    private async initializeDB() {
        this.db = await open({
            filename: './contacts.db',
            driver: sqlite3.Database
        });

        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                name TEXT NOT NULL,
                comment TEXT NOT NULL,
                ip_address TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async add(
        email: string,
        name: string,
        comment: string,
        ipAddress: string
    ) {
        if (!this.db) throw new Error('Database not initialized');

        const result = await this.db.run(
            `INSERT INTO contacts (email, name, comment, ip_address)
             VALUES (?, ?, ?, ?)`,
            [email, name, comment, ipAddress]
        );

        return {
            id: result.lastID,
            email,
            name,
            comment,
            ipAddress,
            createdAt: new Date().toISOString()
        };
    }
    
    public async get() {
        if (!this.db) throw new Error('Database not initialized');
        return this.db.all('SELECT * FROM contacts ORDER BY created_at DESC');
    }
}


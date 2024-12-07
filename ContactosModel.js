const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class ContactosModel {
    constructor() {
        this.db = new sqlite3.Database(path.resolve(__dirname, 'contactos.db'), (err) => {
            if (err) {
                console.error('No se pudo conectar a la base de datos:', err);
            } else {
                console.log('Conectado a la base de datos SQLite');
            }
        });

        this.db.run(`CREATE TABLE IF NOT EXISTS contactos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            nombre TEXT,
            comentario TEXT,
            ip TEXT,
            fecha_hora TEXT
        )`);
    }

    guardarContacto(contacto, callback) {
        const { email, nombre, comentario, ip, fechaHora } = contacto;
        this.db.run(
            INSERT INTO contactos (email, nombre, comentario, ip, fecha_hora) VALUES (?, ?, ?, ?, ?),
            [email, nombre, comentario, ip, fechaHora],
            function (err) {
                callback(err);
            }
        );
    }

    obtenerContactos(callback) {
        this.db.all(SELECT * FROM contactos, (err, rows) => {
            callback(err, rows);
        });
    }
}

module.exports = ContactosModel;
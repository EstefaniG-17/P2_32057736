const express = require('express');
const bodyParser = require('body-parser');
const ContactosModel = require('./ContactosModel');

class ContactosController {
    constructor() {
        this.router = express.Router();
        this.contactosModel = new ContactosModel();

        this.router.use(bodyParser.urlencoded({ extended: true }));

        this.router.post('/send', this.add.bind(this));
    }

    add(req, res) {
        const { email, nombre, comentario } = req.body;

        if (!email || !nombre || !comentario) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const fechaHora = new Date().toISOString();

        const nuevoContacto = {
            email,
            nombre,
            comentario,
            ip,
            fechaHora
        };

        this.contactosModel.guardarContacto(nuevoContacto, (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el contacto.');
            }
            res.redirect('/confirmacion');
        });
    }
}

module.exports = ContactosController;
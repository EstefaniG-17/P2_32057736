"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRecaptcha = void 0;
require("dotenv/config");
class ValidateRecaptcha {
    constructor() {
        const recaptchaKey = process.env.RECATPCHA;
        if (!recaptchaKey) {
            console.error("⚠️ Error: La variable de entorno RECATPCHA no está definida.");
            this.secretKey = 'VALOR_POR_DEFECTO_SOLO_PARA_DESARROLLO';
        }
        else {
            this.secretKey = recaptchaKey;
        }
    }
    async validate(req, res, next) {
        try {
            const recaptchaResponse = req.body["g-recaptcha-response"];
            if (!recaptchaResponse) {
                console.error("⚠️ Error: Token reCAPTCHA no recibido.");
                req.session.message = "Verificación reCAPTCHA fallida: No se recibió el token.";
                req.session.success = false;
                return res.redirect("/");
            }
            const googleUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${this.secretKey}&response=${recaptchaResponse}`;
            console.log("🔍 Enviando solicitud a Google reCAPTCHA...");
            const googleResponse = await fetch(googleUrl, { method: "POST" });
            const data = await googleResponse.json();
            console.log("📜 Respuesta de Google reCAPTCHA:", data);
            if (!data.success) {
                console.error("🚫 Verificación fallida.");
                req.session.message = "Verificación reCAPTCHA fallida.";
                req.session.success = false;
                return res.redirect("/");
            }
            console.log("✅ reCAPTCHA validado correctamente.");
            next(); // Continuar con la ejecución de la siguiente función
        }
        catch (error) {
            console.error("❌ Error en la verificación de reCAPTCHA:", error);
            req.session.message = "Error al procesar reCAPTCHA.";
            req.session.success = false;
            return res.redirect("/");
        }
    }
}
exports.ValidateRecaptcha = ValidateRecaptcha;

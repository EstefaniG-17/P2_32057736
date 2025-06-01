# Documentación de Integraciones de API

# README.md - Documentación del Proyecto

Este documento describe el proceso de configuración e integración de los diferentes servicios utilizados en este proyecto.

## Tabla de Contenidos

1.  [Geolocalizador por IP (Ipstack)](#geolocalizador-por-ip-ipstack)
2.  [Google Analytics](#google-analytics)
3.  [Google reCAPTCHA](#google-recaptcha)
4.  [Nodemailer (Notificación por Correo)](#nodemailer-notificación-por-correo)
5.  [Fake Payment API (API de Pagos Falsos)](#fake-payment-api-api-de-pagos-falsos)

---

## 1. Geolocalizador por IP (Ipstack)

Ipstack se utiliza para obtener información geográfica basada en la dirección IP del usuario, como el país de origen.

### Configuración

1.  **Obtener una Clave de API:**
    * Regístrate en [https://ipstack.com/](https://ipstack.com/).
    * Selecciona un plan que se ajuste a tus necesidades (la capa gratuita tiene limitaciones).
    * Una vez registrado, obtendrás una clave de API única.

2.  **Integración en el Código:**
    * En tu archivo `.env` (o configuración de entorno), define una variable para almacenar tu clave de API:
        ```
        IPSTACK_API_KEY=TU_CLAVE_DE_API_IPSTACK
        ```
    * En tu servicio (`src/services/ContactService.ts` en nuestro ejemplo), utiliza la biblioteca `axios` para hacer la petición a la API de Ipstack. Asegúrate de leer la clave de API desde las variables de entorno:
        ```typescript
        import axios from 'axios';
        import 'dotenv/config';

        // ...

        private readonly IPSTACK_API_KEY = process.env.IPSTACK;

        private async getCountryFromIp(ip: string): Promise<string> {
            try {
                const response = await axios.get(
                    `http://api.ipstack.com/${ip}?access_key=${this.IPSTACK_API_KEY}`
                );
                return response.data.country_name || 'Desconocido';
            } catch (error) {
                console.error('Error al obtener país:', error);
                return 'Desconocido';
            }
        }
        ```

### Uso

* La función `getCountryFromIp(ip: string)` en el servicio toma una dirección IP como argumento y devuelve el nombre del país (o 'Desconocido' si falla la consulta).

---

## 2. Google Analytics

Google Analytics se utiliza para rastrear y analizar el tráfico del sitio web y el comportamiento de los usuarios.

### Configuración

1.  **Crear una Propiedad en Google Analytics:**
    * Ve a [https://analytics.google.com/](https://analytics.google.com/) e inicia sesión con tu cuenta de Google.
    * Crea una nueva cuenta o utiliza una existente.
    * Crea una nueva propiedad (por ejemplo, para tu sitio web).
    * Configura un flujo de datos (por ejemplo, "Web").

2.  **Obtener el ID de Seguimiento (G-XXXXXXXXXX):**
    * Una vez creado el flujo de datos, busca el "ID de flujo de datos y de medición". Este es un código que comienza con `G-`.

### Integración en el Frontend (a través de EJS):

1.  **Definir la Clave en el Backend:**
    * En tu archivo `.env` (o configuración de entorno), define una variable para tu ID de seguimiento:
        ```
        GOOGLE_ANALYTICS_KEY=TU_ID_DE_SEGUIMIENTO_GA
        ```
    * En tu archivo `src/routes/index.ts`, pasa esta variable a la plantilla EJS:
        ```typescript
        import 'dotenv/config';
        // ...
        const googleAnalyticsKey = process.env.GOOGLE_ANALYTICS_KEY;

        router.get('/', (req: Request, res: Response) => {
          res.render('index', {
            title: 'Agencia de viajes "Nosotros te llevamos"',
            gaKey: googleAnalyticsKey,
            // ...
          });
        });
        ```

2.  **Utilizar la Variable en la Plantilla EJS (`index.ejs`):**
    * En el `<head>` de tu archivo `index.ejs`, utiliza la variable `gaKey` para insertar el ID de seguimiento:
        ```html
        <% if (gaKey) { %>
          <script async src="[[https://www.googletagmanager.com/gtag/js?id=](https://www.googletagmanager.com/gtag/js?id=)<%= gaKey %>"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '<%= gaKey %>');
          </script>
        <% } %>
        ```
        * **Importante:** La condición `if (gaKey)` asegura que el script solo se incluya si la clave está definida en el backend.

### Uso

* Una vez integrado el código, Google Analytics comenzará a rastrear las visitas a tu sitio web, las páginas vistas, el tiempo de permanencia y otras métricas. Puedes visualizar estos datos en el panel de Google Analytics.

---

## 3. Google reCAPTCHA

Google reCAPTCHA se utiliza para proteger el sitio web contra el spam y el abuso automatizado.

### Configuración

1.  **Registrar tu Sitio en Google reCAPTCHA:**
    * Ve a [https://www.google.com/recaptcha/admin/](https://www.google.com/recaptcha/admin/) e inicia sesión con tu cuenta de Google.
    * Registra un nuevo sitio.
    * Elige el tipo de reCAPTCHA (por ejemplo, reCAPTCHA v2 "No soy un robot" Checkbox o reCAPTCHA v3).
    * Introduce la etiqueta de tu sitio y los dominios donde se utilizará reCAPTCHA.
    * Acepta los términos de servicio y registra tu sitio.
    * Obtendrás una **clave del sitio** (para el frontend) y una **clave secreta** (para el backend).

2.  **Integración en el Frontend:**
    * Añade el script de reCAPTCHA en la `<head>` o justo antes del cierre del `</body>` en tu formulario (`index.ejs` o `index.html`), reemplazando `CLAVE_DEL_SITIO` con tu clave del sitio:
        ```html
        <script src="[https://www.google.com/recaptcha/api.js?render=CLAVE_DEL_SITIO](https://www.google.com/recaptcha/api.js?render=CLAVE_DEL_SITIO)"></script>
        ```
    * Implementa el widget de reCAPTCHA en tu formulario. En este caso, reCAPTCHA v2 Checkbox, añade:
        ```html
        <div class="g-recaptcha" data-sitekey="CLAVE_DEL_SITIO"></div>
        ```

### Integración en el Frontend (a través de EJS):

1.  **Definir la Clave en el Backend:**
    * En tu archivo `.env` (o configuración de entorno), define una variable para tu clave del sitio de reCAPTCHA:
        ```
        RECATPCHA_HTML=TU_CLAVE_DEL_SITIO_RECAPTCHA
        ```
    * En tu archivo `src/routes/index.ts`, pasa esta variable a la plantilla EJS:
        ```typescript
        import 'dotenv/config';
        // ...
        const googleRecatpcha = process.env.RECATPCHA_HTML;

        router.get('/', (req: Request, res: Response) => {
          res.render('index', {
            title: 'Agencia de viajes "Nosotros te llevamos"',
            gaKey: googleAnalyticsKey,
            grKey: googleRecatpcha,
            // ...
          });
        });
        ```

2.  **Utilizar la Variable en la Plantilla EJS (`index.ejs`):**
    * Añade el script de reCAPTCHA y el widget en tu formulario (`index.ejs`), utilizando la variable `grKey`:
        ```html
        <script src="[[https://www.google.com/recaptcha/api.js?render=](https://www.google.com/recaptcha/api.js?render=)<%= grKey %>"></script>
        <form action="/contact/add" method="post">
          <div class="g-recaptcha" data-sitekey="<%= grKey %>"></div>
          <button type="submit">Enviar Comentario</button>
        </form>

        <script>
          grecaptcha.ready(function() {
            grecaptcha.execute('<%= grKey %>', {action: 'submit'}).then(function(token) {
              document.getElementById('g-recaptcha-response').value = token;
            });
          });
        </script>
        <form action="/contact/add" method="post">
          <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
          <button type="submit">Enviar Comentario</button>
        </form>
        ```

### Uso

* El usuario interactúa con el widget de reCAPTCHA en el frontend.
* El token de respuesta se envía al backend junto con el formulario.
* El backend utiliza la clave secreta para verificar la validez del token con la API de Google.

---

## 4. Nodemailer (Notificación por Correo)

Nodemailer se utiliza para enviar correos electrónicos desde la aplicación, en este caso, para notificar sobre nuevos comentarios de contacto.

### Configuración

1.  **Instalar Nodemailer:**
    ```bash
    npm install nodemailer
    ```


2.  **Configurar un Transportador:**
    * En tu servicio de correo electrónico (`src/services/EmailService.ts`), configura un transportador utilizando la información de tu proveedor de correo. En este caso, se utiliza **Gmail** como servicio. Asegúrate de leer las credenciales y direcciones de correo desde las variables de entorno:
        ```typescript
        import nodemailer, { Transporter } from 'nodemailer';
        import 'dotenv/config';

        export class EmailService {
            private transporter: Transporter;
            private emailFrom: string;
            private emailTo: string;

            constructor() {
                this.transporter = nodemailer.createTransport({
                    service: 'Gmail', // Se especifica el servicio Gmail
                    auth: {
                        user: process.env.GMAIL_USER,    // Correo de usuario de Gmail
                        pass: process.env.GMAIL_PASSWORD, // Contraseña de aplicación de Gmail (no la contraseña de tu cuenta)
                    },
                });
                this.emailFrom = process.env.EMAIL_FROM || 'tu_correo_remitente@example.com'; // Correo desde el que se envía
                this.emailTo = process.env.EMAIL_TO || 'tu_correo_destino@example.com';     // Correo al que se envía la notificación
            }

            public async sendContactFormNotification(formData: {
                name?: string;
                debugedEmail?: string;
                comment?: string,
                ipAddress?: string,
                country?: string,
                dateTime?: string
            }): Promise<boolean> {
                try {
                    const mailOptions = {
                        from: this.emailFrom,
                        to: this.emailTo,
                        subject: 'Correo recibido',
                        html: `<p>los datos registrados:</p>
                               <ul>
                                   <li><strong>Nombre:</strong> ${formData.name || 'No proporcionado'}</li>
                                   <li><strong>Correo:</strong> ${formData.debugedEmail || 'No proporcionado'}</li>
                                   <li><strong>Comentario:</strong> ${formData.comment || 'No proporcionado'}</li>
                                   <li><strong>Dirección IP:</strong> ${formData.ipAddress || 'No proporcionado'}</li>
                                   <li><strong>País:</strong> ${formData.country || 'No proporcionado'}</li>
                                   <li><strong>Fecha y Hora:</strong> ${formData.dateTime || 'No proporcionado'}</li>
                               </ul>`,
                    };

                    const info = await this.transporter.sendMail(mailOptions);
                    console.log('Correo electrónico enviado:', info.messageId);
                    return true;
                } catch (error) {
                    console.error('Error al enviar el correo:', error);
                    return false;
                }
            }
        }
        ```
    * Define las siguientes variables en tu archivo `.env`:
        ```
        GMAIL_USER=tu_correo_gmail@gmail.com
        GMAIL_PASSWORD=tu_contraseña_de_aplicacion_gmail
        EMAIL_FROM=tu_correo_remitente@example.com
        EMAIL_TO=tu_correo_destino@example.com
        ```
        **Importante para Gmail:** Si usas Gmail, generalmente necesitarás generar una "contraseña de aplicación" en la configuración de seguridad de tu cuenta de Google, ya que las contraseñas de cuenta normales no funcionan directamente con SMTP para aplicaciones de terceros.
### Uso

* La función `sendContactFormNotification` en el servicio toma un objeto con los detalles del contacto y envía un correo electrónico de notificación a la dirección configurada.

---

## 5. Fake Payment API (API de Pagos Falsos)

La Fake Payment API se utiliza para simular transacciones de pago durante el desarrollo o en un entorno de prueba.

### Configuración

1.  **Encontrar una API de Pagos Falsos:**
    * Busca en línea APIs de pagos falsos o simuladas. Algunas opciones comunes incluyen servicios como Stripe en modo de prueba o APIs específicamente diseñadas para testing de pagos.
    * Para este ejemplo, asumiremos una API simple con un endpoint para procesar pagos.

2.  **Obtener un Token de Autorización (Opcional):**
    * Según la implementación de la Fake Payment API, podría requerirse un token de autorización. En este código, se espera que este token se proporcione a través de una variable de entorno.
    * Define la variable `FAKE_PAY` en tu archivo `.env`:
        ```
        FAKE_PAY=TU_TOKEN_DE_AUTORIZACION_SI_ES_REQUERIDO
        ```

3.  **Integración en el Código (`src/services/PaymentService.ts`):**
    * El servicio `PaymentService` interactúa con la API falsa a través de la biblioteca `axios`.
    * La URL base de la API está definida como una constante:
        ```typescript
        private readonly PAYMENT_API = 'https://fakepayment.onrender.com/';
        ```
    * Se implementa un método `getHeaders()` para incluir el token de autorización en las peticiones, si está configurado:
        ```typescript
        private getHeaders() {
            return {
                'Authorization': `Bearer ${this.FAKE_PAY}`,
                'Content-Type': 'application/json'
            };
        }
        ```
### Uso

1.  **Método `processPayment`:**
    * Este método (`async processPayment(...)`) es el encargado de enviar la información del pago a la API falsa.
    * Recibe los siguientes parámetros: `service`, `email`, `cardholderName`, `cardNumber`, `expMonth`, `expYear`, `cvv`, `amount`, `currency`, `description`, y `reference`.
    * **Validación de Datos:** Antes de interactuar con la API, se realiza una validación de los datos de entrada utilizando funciones del archivo `../utils/validators`. (Nota: La documentación detallada de estas validaciones se omite según tu indicación).
    * **Construcción del Payload:** Los datos del pago se estructuran en un objeto `paymentData` que se enviará a la API.
    * **Petición a la API:** Se realiza una petición `POST` al endpoint `/payments` de la Fake Payment API, incluyendo el `paymentData` en el cuerpo de la solicitud y los headers de autorización (si los hay).
        ```typescript
        const response = await axios.post(`${this.PAYMENT_API}payments`, paymentData, { headers: this.getHeaders() });
        ```
    * **Manejo de la Respuesta Exitosa:** Si la petición a la API es exitosa, se espera una respuesta con información sobre la transacción. El método devuelve un objeto con `success: true`, el `transactionId` proporcionado por la API y un mensaje.
    * **Manejo de Errores:** Si ocurre un error durante la comunicación con la API (por ejemplo, la API devuelve un error o hay un problema de red), se captura el error. Se registra información sobre la respuesta de error de la API y el mensaje de error, y el método devuelve un objeto con `success: false` y un mensaje de error. También se lanza un nuevo error para que el controlador pueda manejar la respuesta HTTP.

2.  **Método `getTransaction`:**
    * Este método (`async getTransaction(transactionId: string)`) se utiliza para obtener información sobre una transacción específica utilizando su ID.
    * Realiza una petición `GET` al endpoint `/payments/:transactionId` de la API falsa, incluyendo los headers de autorización.
        ```typescript
        const response = await axios.get(`${this.PAYMENT_API}payments/${transactionId}`, { headers: this.getHeaders() });
        ```
    * La respuesta de la API (que contiene los detalles de la transacción) se registra en la consola. El manejo específico de esta respuesta (por ejemplo, devolverla al controlador) dependerá de los requerimientos de la aplicación.
    * En caso de error al obtener la transacción, se registra un mensaje de error en la consola.

* El controlador (`src/controllers/PaymentsController.ts`) llama al método `processPayment` del `PaymentService` para iniciar el proceso de pago simulado.
* El controlador puede llamar al método `getTransaction` para obtener detalles de una transacción específica, utilizando el ID proporcionado por la API en la respuesta inicial del pago.
* La Fake Payment API responderá con datos simulados de éxito o fallo del pago, que luego son manejados por el servicio y el controlador para actualizar la interfaz de usuario y la lógica de la aplicación.

---

import nodemailer, { Transporter } from 'nodemailer';
import 'dotenv/config';

export class EmailService {
  private transporter: Transporter;
  private emailFrom: string;
  private emailTo: string;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    this.emailFrom = process.env.EMAIL_FROM || 'tu_correo@example.com';
    this.emailTo = process.env.EMAIL_TO || 'destinatario@example.com';
  }

  public async sendContactFormNotification(formData: { 
    name?: string; 
    debugedEmail?: string; 
    comment?: string, 
    ipAddress?: string, 
    country?: string,
    dateTime?: string}): Promise<boolean> {
    try {
      const mailOptions = {
        from: this.emailFrom,
        to: this.emailTo,
        subject: 'Ha recibido un formulario de contacto',
        html: `<p>nuevo envío producto del formulario de contacto:</p>
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

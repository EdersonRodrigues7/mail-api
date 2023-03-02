import 'dotenv/config';
import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: parseInt(process.env.NODEMAILER_PORT as string, 10),
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ destination, subject, body }: SendMailData) {
        const message = {
            from: 'D-Dev Mail Service <d-dev@gmail.com.br>',
            to: destination,
            subject,
            html: body 
        };

        transport.sendMail(message, function(err){
            if (err) {throw new Error(err.message);}
        });
        
    }
}
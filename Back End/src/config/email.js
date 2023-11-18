import { logger } from "../application/logger.js";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

export const sendEmailVerification = ({ to, nama, userId, token }) => {
  const message = {
    from: "asrah@example.com",
    to: to,
    subject: "Verification Email",
    html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body style="font-family: Arial, sans-serif; padding: 20px;">

                <h2 style="text-align: center;">Email Verification</h2>

                <p>Dear ${nama},</p>

                <p>Terima kasih telah mendaftar di Asrah Mode. Untuk menyelesaikan proses pendaftaran, harap verifikasi alamat email Anda dengan mengklik tautan di bawah:</p>

                <p style="display: inline-block; margin: auto; text-align: center; padding: 12px 10px; background-color: #bf9f3d;">
                  <a href="http://localhost:5000/auth/verify-email/${userId}/${token}" style="text-decoration: none; color: #fff;">Verifikasi Email</a>
                </p>

                <p>Terima kasih,</p>

                <p>Asrah Mode</p>

            </body>
            </html>
          `
  };

  transport.sendMail(message, (err, info) => {
    logger.error(err);
    logger.info(info);
  })
}
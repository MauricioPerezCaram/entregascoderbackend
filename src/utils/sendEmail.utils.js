import { createTransport } from "nodemailer";

async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: process.env.PORT,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    await transport.sendMail({
      from: `Apple Store Mendoza <${process.env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `Usuario ${data.name.toUpperCase()} registrado!`,
      html: "<h1>Usuario registrado!<h1>",
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;

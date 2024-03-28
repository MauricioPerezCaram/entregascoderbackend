import { createTransport } from "nodemailer";

async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: env.PORT,
      // port: process.env.PORT,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSOWRD,
      },
    });
    await transport.sendMail({
      from: `Apple Store Mendoza<${process.env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USUARIO ${data.name.toUpperCase()} REGISTRADO`,
      html: "<h1>Usuario Registrado</h1>",
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;

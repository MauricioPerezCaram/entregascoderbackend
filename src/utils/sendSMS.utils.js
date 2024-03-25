import twilio from "twilio";

async function sendSms(phone) {
  try {
    twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    transport.messages.create({
      body: "Msj de Apple Store Mendoza",
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
  } catch (error) {
    throw error;
  }
}

export default sendSms;

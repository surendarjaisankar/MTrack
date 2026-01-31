exports.send = async (phone, message) => {
  console.log("----------- SMS -----------");
  console.log("To:", phone);
  console.log("Message:", message);
  console.log("---------------------------");
};
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.send = async (phone, message) => {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to: `+91${phone}`
  });
};

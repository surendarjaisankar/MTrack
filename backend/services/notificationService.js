const axios = require("axios");

const sendSMS = async (phone, message) => {
  try {
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message,
        language: "english",
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
        },
      }
    );
  } catch (error) {
    console.log("SMS Failed:", error.message);
  }
};

module.exports = { sendSMS };

exports.send = async (phone, data) => {
  try {
    const response = await axios.post(
      "https://api.msg91.com/api/v5/flow/",
      {
        flow_id: process.env.MSG91_FLOW_ID,
        mobiles: `91${phone}`,
        ...data
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("MSG91 Response:", response.data);

  } catch (error) {
    console.error("MSG91 Error:",
      error.response?.data || error.message
    );
  }
};

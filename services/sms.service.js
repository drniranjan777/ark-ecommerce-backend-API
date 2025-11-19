const AppError = require('../utils/AppError');



//send otp function
const sendSms = async (mobileNumber, template) => {
    const encodedMessage = encodeURIComponent(template);
 
    const url = `https://2factor.in/API/V1/${process.env.SMS_API_KEY}/SMS/${mobileNumber}/AUTOGEN3`

    const response = await fetch(url); 
    const data = await response.json(); // parse JSON

    if (data.Status !== "Success") {
    throw new Error(data.Details || "Failed to send OTP");
  }

    console.log(data,'dataaaaaa')


    return data.Details
};




///verify otp function

const verifyOtp = async (sessionId,otp) => {

  const url = `https://2factor.in/API/V1/${process.env.SMS_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;
  const response = await fetch(url);
  const data = await response.json();

  return data
};

module.exports = {verifyOtp,sendSms}
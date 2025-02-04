import nodeMailer from "nodemailer";
import crypto from "crypto";
 const transporter=nodeMailer.createTransport({
    secure:true,
    service:"gmail",
    auth:{
        user:"pradumankumar.pk5@gmail.com",
        pass:"klik dvpe tbsd onqe"
    }
 })
 const otpStore = {}; 
 const generateOTP=()=>crypto.randomInt(1000,9999).toString();
 export const sendOtp=async(req,res)=>{
    const { email } = req.body;
    console.log(email)
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = generateOTP();
  otpStore[email]={ otp, expires: Date.now() + 5 * 60 * 1000 };
  console.log(otpStore[email].otp)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(otp)
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error sending OTP", details: error.message });
  }
 }
 export const verifyOtp=async(req,res)=>{
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });
 

 // const storedOtp = await redis.get(email);
 console.log(otpStore[email].otp)
  if (!otpStore[email].otp) return res.status(400).json({ error: "OTP expired or invalid" });

  if (otpStore[email].otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

  //await redis.del(email); // Remove OTP after successful verification
  res.json({ message: "OTP verified successfully" });

 }
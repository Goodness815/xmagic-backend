require("dotenv").config();
// initializing installed packages
const express = require("express");
const app = express();
// const bodyParser = require("body-parser")
const nodemailer = require("nodemailer");
const cors = require("cors");
// declearing which port my server will be listening on
const port = process.env.PORT || 8000;

const to = process.env.TO || "sewogoodness111@gmail.com"

// getting the app to get response from the frontend and send json
app.use(express.json({ extended: true }));
app.use(cors());
// initlizing cors
// app.use(cors())
app.get("/", (req, res) => {
    res.send("XmagicHub Contact Form")
})
app.post("/sendmail", async (req, res) => {
    let { subject, message, name, service, email, phoneNumber } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER || "sewogoodness111@gmail.com",
            pass: process.env.PASS || "rbhvldzrwbjtkfvi",
        },

    });

    const details = {
        to: `${to}`,
        subject: `${subject}`,
        html: `<div class="form-container" style=" width: 100%;
            min-height: 100vh;
            background-color: rgb(238, 238, 238);
            position: relative;">
        <div class="form-header" style="  height: 30px;
            display: flex;
            padding:20px;
            justify-content: space-between;
            align-items: center;
            background-color: #131469;
            color: white;">
            <h3>XMagicHub</h3>
        </div>
        <div class="form-body" style="  padding: 20px;">
            <p>A request was submitted on your website!</p>
            <h4 style="color: #131469 !important;">Name: <span style=" color: black;">${name}</span></h4>
            <h4 style="color: #131469 !important;">Email: <span style=" color: black;">${email}</span>
            </h4>
            <h4 style="color: #131469 !important;">Phone: <span style=" color: black;">${phoneNumber}</span></h4>
            <h4 style="color: #131469 !important;">Service: <span style=" color: black;">${service}</span></h4>
            <h4 style="color: #131469 !important;">Subject: <br> <br>
                <span style=" color: black;">${subject}</span>
            </h4>
            <h4 style="color: #131469 !important;">Message: <br> <br>
                <span style=" color: black;">${message}</span>
            </h4>
        </div>
        <div class="form-footer" style=" height: 30px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            padding:20px;
            justify-content: center;
            align-items: center;
            background-color: #131469;
            color: white;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;">
            <div>&copy; Copyright <strong><span>XmagicHub</span></strong>. All Rights Reserved</div>
        </div>
    </div>`,
    };
    // if (to.length > 0 && subject.length > 0 && body.length > 0) {
    try {
        await transporter.sendMail(details, (err, info) => {
            if (err) {
                console.log(err.message)
                res.json({ success: false, message: `Your email to ${to} was not sent!` });
            } else {
                res.json({
                    success: true,
                    message: `Your message to ${to} has been sent !`,
                    info: info,
                });
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
    // } else {
    //     res.json({ success: false, message: "Empty fields ..." });
    // }

});

// starting the server up
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

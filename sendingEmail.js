const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const fs = require("fs");

const SendingEmail = async (options) => {
    try {



        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: options.name,
                link: "http://www.studentmanagement.com//@rajanCoder",

            }
        });


        const email = {
            body: {
                name: options.name,
                intro: 'Welcome to student record management system! We\'re very excited to have you on board.',
                action: {
                    instructions: options.instructions,
                    button: {
                        color: '#22BC66',
                        text: options.text,
                        link: `${process.env.BASE_URL || "http://localhost:3000"}/api/v1/users${options.route}/${options.token}`,
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };

        const emailBody = mailGenerator.generate(email);


        const emailText = mailGenerator.generatePlaintext(email);

        fs.writeFileSync('preview.html', emailBody, 'utf8');









        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT) || 2525,
            secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from: process.env.MAILTRAP_FROM,
            to: options.email,
            subject: options.subject,
            text: emailText,
            html: emailBody,
        });

        console.log("Message sent", info.messageId);
        return info;
    } catch (error) {
        console.error("SendingEmail error:", error);
        throw error;
    }
};

module.exports = SendingEmail;
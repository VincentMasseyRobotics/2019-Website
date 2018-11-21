require('dotenv').load();
const nodemailer = require('nodemailer');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const escape = require('escape-html');
const minify = require('express-minify');
const compression = require('compression');

var app = express();

app.use(compression());
app.use(minify());

var smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.post('/contact', function(req, res) {
    try {
        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;

        console.log(req.body)

        if (name && email && message && name.length <= 100 && email.length <= 100 && message.length < 1500) {

            var email_message = {
                from: process.env.EMAIL_CONTACT,
                to: process.env.EMAIL_RECIPIENT,
                subject: '[FRC4903] New message from ' + escape(name),
                text: 'Your email client does not support the viewing of HTML emails. Please consider enabling HTML emails in your settings, or downloading a client capable of viewing HTML emails.',
                html: '<div style="background: rgb(255, 209, 220)"><h1>This is NOT a phishing email.</h1><br>Name: ' + escape(name) + '<br>Email: ' + escape(email) + '<br>IP: ' + (req.headers['x-forwarded-for'] || req.connection.remoteAddress) + '<br>Message: ' + escape(message) + '<br><br>--<br><b>DO NOT REPLY TO THIS EMAIL!!!! THE INBOX IS CONTROLLED BY A ROBOT. ~beep boop</b></div>'
            };

            transporter.sendMail(email_message, function (error, response) {
                if (error) {
                    console.log('Email failed', error, response);
                    res.status(500).json({'error': 'Something went wrong...'});
                }
                else {
                    console.log('Email sent', email, name, message);
                    res.json({'message': 'success'});
                }
            });

        } else {
            res.status(400).json({'error': 'Invalid submission'});
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({'error': 'Something went wrong...'});
    }
});

app.get('*', function(req, res) {

    res.render(req.path.slice(1), {}, function(err, html) {
        if (err) {
            res.render('404');
        } else {
            res.send(html);
        }
    });

});

app.listen(3000, function () {
    console.log('listening on *:' + 3000);
});
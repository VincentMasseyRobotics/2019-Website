require('dotenv').load();
const nodemailer = require('nodemailer');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
var app = express();

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

        var email_message = {
            from: process.env.EMAIL_CONTACT,
            to: process.env.EMAIL_RECIPIENT,
            subject: '[FRC4903] New message from ' + name,
            text: 'Your email client does not support the viewing of HTML emails. Please consider enabling HTML emails in your settings, or downloading a client capable of viewing HTML emails.',
            html: 'Name: ' + name + '<br>Email: ' + email + '<br>Message: ' + message
        };

        transporter.sendMail(email_message, function(error,response){
            if(error){
                console.log('Email failed', error, response);
                res.status(500).json({'error': 'Something went wrong...'});
            }
            else{
                console.log('Email sent', email, name, message);
                res.json({'message': 'success'});
            }
        });

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
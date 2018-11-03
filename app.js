const path = require('path');
const express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

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
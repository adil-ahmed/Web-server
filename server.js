const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/Views/partials');
app.set('view engine', 'hbs');
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n');

    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (request,response) => {
    //response.send('<h1>Hello express!</h1>');
    // response.send({
    //     name : 'Adil',
    //     age : '23',
    //     likes : [
    //         'cricket',
    //         'riding'
    //     ]
    // });
    response.render('home.hbs', {
        pageTitle : 'Home page',
        //currentYear: new Date().getFullYear(),
        welcomeText : 'Welcome to handlebars!' 
    });
});
app.get('/help', (req,res) => {
    //res.send('Welcome to about page');
    res.render('help.hbs', {
        pageTitle : 'Help page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage : 'Unable to connect'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
}); 










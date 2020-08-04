const express = require('express');
const hbs = require('express-hbs');
const sass = require('node-sass');

const app = express();

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/public/views/partials'
}));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/public/views');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/main', (req, res) => {
    res.render('main');
})

app.listen(3000, () => {
    console.log("Server on at 3000");
});
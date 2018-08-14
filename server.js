const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); 


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.')
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('error.hbs')
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});
hbs.registerHelper('screenIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		pageInfo: 'Welcome to my website'

	})
});//to set up a handler for http get request(like a route in laravel)

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});
app.get('/project', (req, res) => {
	res.render('project.hbs', {
		pageTitle: 'Project Page'
	});
});
app.get('/bad', (req, res) => {
	res.send({
		errorPage: 'Unable to send resquest'
	});
});
app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/math', function(request, response) {
	handleMath(request, response);
});

app.get('/', function(request, response) {
	response.render('pages/form');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function handleMath(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	var mail = requestUrl.query.mail;
	var weight = Number(requestUrl.query.weight);

	computeOperation(response, mail, weight);
}

function computeOperation(response, m, w) {
	m = m.toLowerCase();

	var result = 0;

	if(m == "lstamped") {
		if(w >= 3.5)
		{
			result = 1.13;
		}
		else {
			result = (w - 1) * 0.21 + 0.5;
		}

	} else if (m == "lmetered") {
		result = w * .47;
	} else if (m == "large") {
		result = w * 1;
	} else if (m == "first") {
		result = w * 3.50;
	} else {

	}

	var params = {mail: m, weight: w, result: result};
	response.render('pages/result', params);

}
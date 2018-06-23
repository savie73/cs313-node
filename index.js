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
		if(w >= 3.5) {
			result = 1.10;
		}
		else {
			result = (w - 1) * 0.21 + 0.47;
		}
	} else if (m == "large") {
		if (w >= 13) {
				result =  3.52;
			}
			else {
				result = (w - 1) * 0.21 + 1;
			}
	} else if (m == "first") {
		if (w <= 4)
				result =  3.50;
			else if (w <= 8)
				result = 3.75;
			else if (w <= 9)
				result = 4.10;
			else if (w <= 10)
				result = 4.45;
			else if (w <= 11)
				result = 4.80;
			else if (w <= 12)
				result = 5.15;
			else
				result = 5.50;
	} else {

	}

	var params = {mail: m, weight: w, result: result};
	response.render('pages/result', params);

}
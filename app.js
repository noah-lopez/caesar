const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


fs.readFile('index.html', (err, html) => {
	if (err) {
		throw err;
	}

	const server = http.createServer((req, res) => {

		var request = url.parse(req.url, true);
 	 	var action = request.pathname;

 	 	if (action == '/back.jpg') {
    		var img = fs.readFileSync('./back.jpg');
     		res.writeHead(200, {'Content-Type': 'image/jpg' });
     		res.end(img, 'binary');
  		} else if (action == '/about') {
  			res.statusCode = 200;
			res.setHeader('Content-type', 'text/html');

			fs.readFile('about.html', (err, html2) => {
				if (err) {
					throw err;
				}
				res.write(html2);
				res.end();
			});
  		} else  {
  			res.statusCode = 200;
			res.setHeader('Content-type', 'text/html');
			res.write(html);
			res.end();
  		}
		// res.statusCode = 200;
		// res.setHeader('Content-type', 'text/html');
		// res.write(html);
		// res.end();

	});

	server.listen(port, hostname, () => {
		console.log('server started on port ' + port)
	});
});
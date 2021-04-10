const http = require('http');
const url = require('url');

let data = [];

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    const reqUrl =  url.parse(req.url, true);

    if(reqUrl.pathname === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        return res.end("Hello World");
    }

    if(reqUrl.pathname === '/users' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        return res.end(JSON.stringify(data));
    }

    if(reqUrl.pathname === '/users' && req.method === 'POST') {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {

            body = JSON.parse(body);

            data.push(body);

            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            return res.end(JSON.stringify(body));
        });
    }

    if(reqUrl.pathname.split('/')[1] === 'users' && req.method === 'GET') {

        const user_id = reqUrl.pathname.split('/')[2];
        const user = data.filter(user => user.user_id === user_id);

        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        return res.end(JSON.stringify(user));
    }

    if(reqUrl.pathname.split('/')[1] === 'users' && req.method === 'DELETE') {

        const user_id = reqUrl.pathname.split('/')[2];
        data = data.filter(user => user.user_id !== user_id);

        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        return res.end("success");
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const fs = require('fs'); // import the file system module 

const requestHandler = (req, res) => { // define the request handler function
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write('<html><head><title>Home Page</title></head>')
        res.write('<body><h1>Hello from my Node.js Server!</h1>')
        res.write('<h2>This is the afdafa page</h2>')
        res.write('<form action="/create-user" method="POST"><input type="text" name="createUser"><button type="Create User">Create User</button></form>')
        res.write('</body></html>')
        return res.end()
    }

    if (url === '/users') {
        res.write('<html><head><title>User List</title></head>')
        res.write('<body><h1>Users:</h1>')
        res.write('<ul>')
        res.write('<li>User 1</li>')
        res.write('<li>User 2</li>')
        res.write('<li>User 3</li>')
        res.write('</ul>')
        res.write('</body></html>')
        return res.end()
    }



    if (url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const user = parsedBody.split('=')[1] // user is the value of the user key
            fs.writeFile('users.txt', user, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                console.log(user)
                return res.end()
            })
        })
    }
}

exports.handler = requestHandler;
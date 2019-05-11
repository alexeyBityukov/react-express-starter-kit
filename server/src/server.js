var express = require('express');
var app = express();
const path = require('path');

const port = 5000;

app.get('/api', function (req, res) {
    res.send('Hello World!');
});

//Static file declaration
app.use(express.static(path.join(__dirname, '/../../client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/../../client/build')));
    //
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname, '/../../client/build/index.html'));
    })
}
//build mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../client/public/index.html'));
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
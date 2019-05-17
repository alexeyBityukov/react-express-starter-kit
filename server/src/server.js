let express = require('express');
let app = express();
const path = require('path');
require('./connectToDB');
const api = require('./api');

const port = 5000;

api(app);

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
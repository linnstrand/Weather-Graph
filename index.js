const express = require('express');

//route
const port = 3000;
const app = express();

app.get('*', (req, res) => {
    let url = req.url;
    if (url === '/') url = 'weather-graph.html';

    else {
        url = url.replace(/^\/+/, '');
    }

    res.sendFile(url, { root: __dirname + '/dist' });
});

app.listen(port, () => {
    console.log(`Listning on localhost:${port}`);
});
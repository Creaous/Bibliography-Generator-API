var express = require("express");
var bodyParser = require('body-parser');
const urlMetadata = require('url-metadata');
const moment = require("moment/moment");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.post("/reference/website", (req, res, next) => {
    urlMetadata(req.body.url)
        .then((metadata) => {
            console.log(metadata);

        res.json({
            "author": metadata["og:site_name"],
            "year": "",
            "title": metadata["og:title"],
            "site": metadata["og:site_name"],
            "publisher": metadata["og:site_name"],
            "viewed": moment().format('DD MMMM YYYY'),
            "url": req.body.url
        });
        },
            (err) => {
                console.log(err)
            });
});

app.post("/generate", (req, res, next) => {
    const data = req.body;
    
    console.log(req.body);

    res.send(`${data?.author}, ${data?.year}, ${data?.title}, ${data?.site}, ${data?.publisher}, ${data?.viewed}, ${data?.url}`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
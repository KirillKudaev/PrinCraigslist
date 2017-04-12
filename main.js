//We dont need to make our own server, but its kinda hard to test without it lol



var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var api = new ParseServer({
    databaseURI: "mongodb://root:q2W01rr18YnG@127.0.0.1:27017/bitnami_parse",
    cloud: "./node_modules/parse-server/lib/cloud-code/Parse.Cloud.js",
    appId: "c2223ba7dbada94452e35b1659301bc6fc8bba82",
    masterKey: "69cee5bba1dff897f0db3a8ea29b46c0fda12754",
    fileKey: "e30775ad65f2687260f4d106633689a8699d0428",
    serverURL: "http://ec2-35-163-159-109.us-west-2.compute.amazonaws.com:80/parse"
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.listen(1337, function() {
  console.log('parse-server-example running on port 1337.');
});
var path = require("path");
var express = require("express");
var app = express();
var httpProxy = require("http-proxy");
var apiProxy = httpProxy.createProxyServer();
// var server1C = "http://192.168.1.4";
var server1C = `${process.env.APIHOST}`;

app.all(`${process.env.REACT_APP_APIURL}/*`, function(req, res) {
  console.log("redirecting to Server1C");
  apiProxy.web(req, res, { target: server1C });
});

// test route
app.get("/test", (req, res) => {
  res.status(200).send({ result: "GET: /test" });
});

// FRONTEND
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(5000, () => console.log("Proxy server started (port: 5000)"));

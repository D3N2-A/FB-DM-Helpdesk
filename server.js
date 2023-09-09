const express = require("express");
const https = require("https");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.status(200).send("hello");
});
app.get("/messaging-webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === "hello1234") {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});


app.listen(port, function () {
  console.log("localhost started on", port);
});

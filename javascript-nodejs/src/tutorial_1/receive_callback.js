#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

amqp.connect(
  "amqp://wssu-mjubu",
  (err, conn) => {
    conn.createChannel((err, ch) => {
      var queue_name = "hello";

      ch.assertQueue(queue_name, { durable: false });
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue_name);
      ch.consume(
        queue_name,
        msg => {
          console.log(" [x] Received %s", msg.content.toString());
        },
        { noAck: true }
      );
    });
  }
);

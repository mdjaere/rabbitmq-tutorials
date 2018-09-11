#!/usr/bin/env node

const amqp = require("amqplib/callback_api");

amqp.connect(
  "amqp://wssu-mjubu",
  (err, conn) => {
    conn.createChannel((err, ch) => {
      const queue_name = "hello";
      const msg = "Hello World!";

      ch.assertQueue(queue_name, { durable: false });
      ch.sendToQueue(queue_name, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 500);
  }
);

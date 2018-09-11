#!/usr/bin/env node

const amqp = require("amqplib");

open = amqp.connect("amqp://wssu-mjubu");
let connection = undefined;

// Publisher
open
  .then(conn => {
    connection = conn;
    return conn.createChannel();
  })
  .then(ch => {
    const queue_name = "hello";
    return ch.assertQueue(queue_name, { durable: false }).then(ok => {
      const msg = "Hello World!";
      console.log(" [x] Sent %s", msg);
      return ch.sendToQueue(queue_name, Buffer.from(msg));
    });
  })
  .then(() => {
    connection.close();
    process.exit(0);
  })
  .catch(console.warn);

#!/usr/bin/env node

const amqp = require("amqplib");
open = amqp.connect("amqp://wssu-mjubu");

// Consumer
open
  .then(conn => {
    return conn.createChannel();
  })
  .then(ch => {
    const queue_name = "hello";
    return ch.assertQueue(queue_name, { durable: false }).then(ok => {
      return ch.consume(queue_name, msg => {
        if (msg !== null) {
          console.log(msg.content.toString());
          ch.ack(msg);
        }
      });
    });
  })
  .catch(console.warn);

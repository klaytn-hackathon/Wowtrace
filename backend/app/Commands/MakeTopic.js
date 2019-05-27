'use strict'

const { Command } = require('@adonisjs/ace')
const Env = use('Env')

const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;

class MakeTopic extends Command {
  static get signature() {
    return 'make:topic'
  }

  static get description() {
    return 'Tell something helpful about this command'
  }

  async handle(args, options) {
    this.info('Dummy implementation for make:topic command')

    const client = new kafka.KafkaClient({ kafkaHost: Env.get('KAFKA_HOST', 'localhost:9092') });
    const producer = new HighLevelProducer(client);

    const topicsToCreate = [{
      topic: Env.get('KAFKA_EXPORT_PDF_TOPIC', 'ExportPdf'),
      partitions: 8,
      replicationFactor: 1
    }];

    producer.on('ready', function () {
      producer.createTopics(topicsToCreate, (error, data) => {
        console.log("error", error)
        console.log("data", data)
        process.exit();
        // result is an array of any errors if a given topic could not be created
      });
    });

    producer.on('error', function (err) {
      console.log('error: ' + err);
      process.exit();
    });
  }
}

module.exports = MakeTopic

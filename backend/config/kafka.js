'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  // https://github.com/SOHU-Co/kafka-node/
  client: {
    kafkaHost: Env.get('KAFKA_HOST', 'localhost:9092')
    // connectTimeout: Env.get('KAFKA_CONNECT_TIMEOUT', 10000),
    // requestTimeout: Env.get('KAFKA_REQUEST_TIMEOUT', 30000),
    // autoConnect: Env.get('KAFKA_AUTO_CONNECT', true),
    // connectRetryOptions: {
    //   retries: 5,
    //   factor: 3,
    //   minTimeout: 1 * 1000,
    //   maxTimeout: 60 * 1000,
    //   randomize: true
    // },
    // idleConnection: Env.get('KAFKA_IDLE_CONNECTION', 300000), // 5 minutes
    // reconnectOnIdle: Env.get('KAFKA_RECONNECT_ON_IDLE', true),
    // maxAsyncRequests: Env.get('KAFKA_MAX_ASYNC_REQUESTS', 10)
    // sslOptions: { rejectUnauthorized: false },
    // sasl: {}
  },
  producerOptions: {
    requireAcks: 1,
    ackTimeoutMs: 100,
    partitionerType: 2
  },
  consumerOptions: {
    autoCommit: true,
    groupId: 'GenerateGroup',
    // autoCommitIntervalMs: 5000,
    fetchMaxWaitMs: 5000,
    fetchMinBytes: 1,
    fetchMaxBytes: 1024 * 1024,
    fromOffset: 'earliest',
    // encoding: 'utf8',
    // keyEncoding: 'utf8',
    // batch: undefined,
    // sessionTimeout: 15000,
    protocol: ['roundrobin'],
    // commitOffsetsOnFirstJoin: true,
    outOfRangeOffset: 'earliest',
    // migrateHLC: false,
    // migrateRolling: true,
    onRebalance: (isAlreadyMember, callback) => { callback() } // or null
  }
}

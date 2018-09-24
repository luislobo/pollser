#!/usr/bin/env node

require('mongoose').connect(process.env.MONGODB_URI)

const topics = [
  'Have you heard of PetroCloud before?',
  'Have you heard of MongoDB Change Streams?',
  'Do you work with IOT?',
  'Are you excited about MongoDB Transactions?',
  'Did you enjoy this session?'
]

const Poll = require('../models/poll')

// empty the collection first
Poll.remove({})
  .then(() => {
    let polls = []
    for (let i = 0; i < 5; i++) {
      polls.push({
        topic: topics[i],
        choices: [
          {
            value: 'Yes',
            votes: 0
          },
          {
            value: 'No',
            votes: 0
          }
        ]
      })
    }
    return Poll.create(polls)
  })
  .then((res) => {
    console.log(res)
    process.exit()
  })
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })

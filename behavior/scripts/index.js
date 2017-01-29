'use strict'

const PasswordHowto = require('./lib/PasswordHowto')

exports.handle = (client) => {
  // Create steps
  const passwordHowto = client.createStep({
      satisfied() {
          return false
      },
      PasswordHowto()
      console.log('person wants to know how to make a good password')

      prompt() {
        client.addResponse('password/howto')
        client.done()
      }
  })}

  // prompt(callback){
  //     const environment = client.getCurrentApplicationEnvironment()
  //     PasswordHowto()
  //     console.log('Voila')
  // }

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      main: 'passwordhowto',
      passwordhowto: [passwordHowto],
      //end: [untrained],
    },
  })
}

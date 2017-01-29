'use strict'

const PasswordHowto = require('./lib/password_howto')

exports.handle = function handle(client) {
  // Create steps
  const passwordHowto = client.createStep({
      satisfied() {
          return Boolean(client.getConversationState().good_password)
      },

      extractInfo() {
          const goodPass = client.getEntities(client.getMessagePart(), 'good password')
          if (goodPass) {
              client.updateConversationState({
                  goodPass: true,
              })
              console.log('goodPass is defined')
          }
      },

      prompt() {
        client.addResponse('password/tips')
        client.done()
    },
  })

  // const passwordTips = client.createStep({
  //     satisfied() {
  //         return false
  //     },
  //
  //     prompt() {
  //       //client.addResponse('password/tips')
  //       client.done()
  //     },
  // })
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
    }
  })
}

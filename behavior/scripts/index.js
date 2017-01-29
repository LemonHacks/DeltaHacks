'use strict'

//const PasswordHowto = require('./lib/password_howto')

exports.handle = function handle(client) {
  // Create steps
  const passwordHowto = client.createStep({
      satisfied() {
          let num = client.getFirstEntityWithRole(client.getMessagePart(), 'number')
          console.log("num ", num)
         // client.updateConversationState('foo', 'bar')
          console.log("Conversation state: ", client.getConversationState())
          console.log('satisfied')
          return Boolean(client.getConversationState().goodPassword)
      },

      extractInfo() {
          console.log("Conversation state: ", client.getConversationState())
          let goodPass = client.getFirstEntityWithRole(client.getMessagePart(), 'password#good')
          console.log("goodPass: ", goodPass)
          if (goodPass) {
              client.updateConversationState('goodPassword', goodPass)
              console.log('goodPass is defined')
          }
          console.log("Conversation state: ", client.getConversationState())
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

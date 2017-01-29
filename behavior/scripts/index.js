'use strict'

//const PasswordHowto = require('./lib/password_howto')

exports.handle = function handle(client) {
  // Create steps
  const passwordHowto = client.createStep({
      satisfied() {
          console.log("satisfied is running...")
          return false;
      },

      extractInfo() {
          console.log("extractInfo is running...")
          console.log("client message is ", client.getMessagePart())
          console.log("Conversation state: ", client.getConversationState())
          let num = client.getFirstEntityWithRole(client.getMessagePart(), 'number')
          console.log("num: ", num)
          if (num) {
              client.updateConversationState('number', num)
              console.log('NUMBER is defined')
          }
          console.log("Conversation state: ", client.getConversationState())
      },

      prompt() {
          console.log("prompt is running...")
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

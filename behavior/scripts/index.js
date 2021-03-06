'use strict'

exports.handle = function handle(client) {
  const checkStrength = client.createStep({
    satisfied() {
        console.log("satisfied...")
      return Boolean(client.getConversationState().passLength)
    },

    extractInfo() {
     const length = client.getFirstEntityWithRole(client.getMessagePart(), 'number/passlength')
     console.log("extract...")
      if (length) {
        client.updateConversationState('passLength', length)
        console.log('User wants to check passLength:', length.value)
      }
    },

    prompt() {
        console.log("prompt..")
      client.addResponse('password/good')
      client.done()
    },
  })

  client.runFlow({
    classifications: {},
    streams: {
      main: 'checkStrength',
    }
  })
}

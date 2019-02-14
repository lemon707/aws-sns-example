const express = require('express')
const app = express()
const port = 3000
const AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json')
const sns = new AWS.SNS()

const applicationName = "PushTestAWS"
const platform = "GCM"
const attributesKey = "PlatformCredential"
const attributeValue = ""
const applicationARN = ""
const targetArn = ""
const token = ""

function createPlatformApplication() {
  const params1 = {
    Attributes: {
      [attributesKey]: attributeValue,
    },
    Name: applicationName,
    Platform: platform
  }

  sns.createPlatformApplication(params1, function(err, data) {
    if (err) {
      console.log('createPlatformApplication ERROR', err, err.stack) // an error occurred
    }
    else {
      console.log('createPlatformApplication ', data)           // successful response
    }
  })
}

function createPlatformEndpoint() {
  const params2 = {
    PlatformApplicationArn: applicationARN,
    Token: token,
  }

  sns.createPlatformEndpoint(params2, function(err, data) {
    if (err) {
      console.log('createPlatformEndpoint ERROR', err, err.stack) // an error occurred
    }
    else {
      console.log('createPlatformEndpoint ',data)           // successful response
    }
  })
}

function publish() {
  const params3 = {
    Message: JSON.stringify({
      default:'STRING_VALUE'
    }),
    MessageStructure: 'json',
    TargetArn: targetArn,
  }

  sns.publish(params3, function(err, data) {
    if (err) {
      console.log('PUBLISHED error ', err, err.stack) // an error occurred
    }
    else {
      console.log('PUBLISHED ', data)           // successful response
    }
  })
}


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

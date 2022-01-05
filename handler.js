"use strict";

const AWS = require("aws-sdk");

module.exports.startSF = (event, context, callback) => {
  const stepFunctions = new AWS.StepFunctions({
    endpoint: "http://localhost:8083",
  });
  const stateMachineArn = process.env.OFFLINE_STEP_FUNCTIONS_ARN_HelloMachine;
  const params = {
    stateMachineArn,
  };

  return stepFunctions
    .startExecution(params)
    .promise()
    .then(() => {
      callback(
        null,
        `Your state machine ${stateMachineArn} executed successfully`
      );
    })
    .catch((error) => {
      callback(error.message);
    });
};

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!",
        process: process.env,
      },
      null,
      2
    ),
  };
};

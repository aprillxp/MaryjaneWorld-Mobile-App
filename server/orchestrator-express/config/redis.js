const Redis = require("ioredis");

const uri = "redis://default:1td1NaU93AlGhtDQgkz5hKMK5NHMIbJF@redis-14975.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:14975";
const redis = new Redis(uri);

module.exports = redis;
const { response } = require("express");
const express = require("express");
const router = express.Router();
const pagespeed = require('gpagespeed')
const dotenv = require('dotenv')
const Log = require('../models/Log')
const jwt = require('jsonwebtoken');
const intervelCheck = require("../utils/intervelCheck");
dotenv.config()

router.get('/checkTime', async (req, res) => {
  const verified = jwt.verify(req.headers.autherization.split(' ')[1], process.env.JWT_KEY);
  var urls = 'http://' + req.query.url
  var time = req.query.time
  const options = {
    url: urls,
    key: process.env.PAGEINSIGHT_KEY
  }
  await pagespeed(options)
    .then(async (data) => {
      const datas = Object.entries(data.lighthouseResult.audits);
      const serverTime = datas.filter(item => {
        if (item[0] == 'server-response-time') {
          return JSON.stringify(item[1])
        }
      })

      let responseTime = Number(serverTime[0][1].details.items[0].responseTime);
      if (responseTime > time) {
        const logData = await Log.findOne({ userId: verified.id });
        if (logData) {
          const data = {
            url: urls,
            time: time,
            lastResponded: responseTime
          }
          try {
            await Log.updateOne({ userId: verified.id }, { $push: { "logs": data } })
            res.status(200).send({ message: `Oops ${urls} didnt respond with in the configured time  !`, responseTime: responseTime });
          } catch (error) {
            console.log(error)
          }
        } else {
          const data = {
            url: urls,
            time: time,
            lastResponded: responseTime
          }
          const log = new Log({
            userId: verified.id,
            logs: [data]
          });
          log.save()
        }


      } else {
        res.status(200).send({ message: "Responded ! ", responseTime: responseTime });
      }

    })
    .catch(error => {
      console.error(error)
    })
})

router.get('/intervelCheck', async (req, res) => {
  const verified = jwt.verify(req.headers.autherization.split(' ')[1], process.env.JWT_KEY);
  if (!verified) return res.send('Denied')
  const { logs } = await Log.findOne({ userId: verified.id }, { _id: 0, userId: 0 })
  const promises = await logs.map(async (item) => {
    await intervelCheck(item.url, item._id, verified.id)
  })
  Promise.all(promises).then(function (results) {
    console.log('Completed')
    res.send('Completed')
  })


})
module.exports = router;

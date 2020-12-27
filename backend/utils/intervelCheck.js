const pagespeed = require('gpagespeed');
const Log = require('../models/Log');
const dotenv = require('dotenv')
dotenv.config()

 module.exports =async function (urls,id,userId) {
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
            console.log(responseTime)
            try {
                await Log.updateOne({userId:userId,"logs._id":id},{"logs.$.lastResponded":responseTime});
            } catch (error) {
                console.log(error)
            }
        })
        .catch(error => {
            console.error(error)
        })
   
}


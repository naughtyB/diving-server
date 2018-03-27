let Equipment = require('../mongodb/index.js')['Equipment'];

module.exports = (req, res) => {
  let equipmentId = decodeURIComponent(req.body.equipmentId);
  console.log(equipmentId)
  console.log(equipmentId.length)
  if(equipmentId.length === 24){
    Equipment.find({'_id': equipmentId}, (err, findRes) => {
      if(err){
        res.json({isSuccessful: false, err: '服务器发生错误，请重新连接'})
      }
      else{
        res.json({isSuccessful: true, equipmentDetailData: findRes[0]})
      }
    })
  }
  else{
    res.json({isSuccessful: true, equipmentDetailData: undefined})
  }
}
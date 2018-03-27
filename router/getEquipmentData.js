let Equipment = require("../mongodb/index")["Equipment"];

module.exports = (req, res) => {
  Equipment.find({type: decodeURIComponent(req.body.type)}, (err, findRes) => {
    if(err){
      res.json({isSuccessful: false, err: '服务器发生错误，请刷新'})
    }
    else{
      res.json({isSuccessful: true, equipmentData: findRes})
    }
  })
}
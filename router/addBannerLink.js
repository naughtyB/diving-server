let Homepage = require('../mongodb')['Homepage'];

module.exports = (req, res) => {
  Homepage.update({'_id': decodeURIComponent(req.body.homepageId), 'banner.url': decodeURIComponent(req.body.url)}, {'banner.$.link': decodeURIComponent(req.body.link)},(err, updateRes) => {
    if(err){
      res.json({isSuccessful: false});
    }
    else{
      Homepage.find({}, (err, findRes) => {
        if(err){
          res.json({isSuccessful: false});
        }
        else{
          res.json({isSuccessful: true, homepageData: findRes[0]})
        }
      })
    }
  })
}
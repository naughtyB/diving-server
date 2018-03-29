let fs = require('fs');
let Homepage = require('../mongodb/index')['Homepage'];

module.exports = (req, res) => {
  let path = req.file.path + '.' + req.file.originalname.split('.')[1];
  fs.rename(req.file.path, path, (err) => {
    if(err){
      console.log(err);
      res.json({err: '服务器发生错误'})
    }
    else{
      let url = 'http://localhost:8000/' + path.replace(/\\/g, '/');
      if(req.body.homepageId){
        Homepage.update({'_id': decodeURIComponent(req.body.homepageId)}, {'$push': {banner: {url}}}, (err, response) => {
          if(err){
            res.json({err: '服务器发生错误'})
          }
          else{
            Homepage.find({}, (err, findResponse) => {
              if(err){
                res.json({err: '服务器发生错误'})
              }
              else{
                res.json({homepageData: findResponse[0]})
              }
            })
          }
        })
      }
      else{
        new Homepage({
          banner: [{url}]
        }).save((err, saveRes)=>{
          if(err){
            res.json({err: '服务器发生错误'})
          }
          else{
            Homepage.find({}, (err, findResponse) => {
              if(err){
                res.json({err: '服务器发生错误'})
              }
              else{
                res.json({homepageData: findResponse[0], url})
              }
            })
          }
        })
      }
    }
  })
}
let fs = require('fs');

module.exports = (req, res) => {
  let path = req.file.path + '.' + req.file.originalname.split('.')[1];
  fs.rename(req.file.path, path, (err) => {
    if(err){
      console.log(err);
    }
    else{
      res.json({url: 'http://localhost:8000/' + path.replace(/\\/g, '/')})
    }
  })
}
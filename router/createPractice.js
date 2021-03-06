let Practice = require('../mongodb/index')['Practice'];
let Manager = require('../mongodb/index')['Manager'];

module.exports = (req, res) => {
  let managerMessage = {'mobileNumber' : decodeURIComponent(req.cookies.mobileNumber), '_id': decodeURIComponent(req.cookies.managerId)};
  Manager.find(managerMessage, (err, findResponse) => {
    if(err){
      console.log(err)
      res.json({isSuccessful: false, err: '服务器发生错误，请重新刷新'})
    }
    else if(findResponse.length === 0){
      res.json({isSuccessful: false, loginState: false })
    }
    else{
      let newPractice = new Practice({
        name: req.body.practiceName,
        price: req.body.practicePrice,
        imgUrl: req.body.practiceImgUrl,
        detail: req.body.practiceDetail
      })
      newPractice.save((err, saveRes) => {
        if(err){
          res.json({isSuccessful: false, err: '服务器发生错误，请重新刷新'})
        }
        else{
          res.json({isSuccessful: true})
        }
      })
    }
  })
}
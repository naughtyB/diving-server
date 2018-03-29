let Manager = require("../mongodb/index")["Manager"];

module.exports = (req, res) => {
  if(decodeURIComponent(req.body.captcha) != "5257"){
    res.json({isSuccessful: false, errorType: "captcha", error: "验证码错误"})
  }
  else{
    let managerMessage={mobileNumber: decodeURIComponent(req.body.mobileNumber)};
    let updateManagerMessage={password: decodeURIComponent(req.body.password)};
    Manager.update(managerMessage, updateManagerMessage, (err, response) => {
      if(err){
        res.json({isSuccessful: false, error: "发生错误!请重新提交", errorType: "captcha"})
      }
      else if(response.n == 0){
          res.json({isSuccessful: false, error: "该手机号还没被注册", errorType: "mobileNumber"})
      }
      else{
        Manager.find(managerMessage, (err, findManagerResponse) => {
          if(err){
            res.json({isSuccessful: false, error: "发生错误!请重新提交", errorType: "captcha"})
          }
          else{
            res.json({isSuccessful: true, managerData: findManagerResponse[0]})
          }
        })
      }
    })
  }
}
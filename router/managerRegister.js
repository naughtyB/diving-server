let Manager = require("../mongodb/index")["Manager"];

module.exports = (req, res) => {
  if(decodeURIComponent(req.body.captcha) != "5257"){
    res.json({isSuccessful: false, errorType: "captcha", error: "验证码错误"})
  }
  else{
    let managerMessage={mobileNumber: decodeURIComponent(req.body.mobileNumber), password: decodeURIComponent(req.body.password), managername: decodeURIComponent(req.body.managername), sex: 'secret'};
    Manager.find({mobileNumber: managerMessage.mobileNumber}, (err, findMobileNumberResponse) => {
      if(err){
        res.json({isSuccessful: false, errorType: "captcha", error: "发生错误!请重新提交"})
      }
      else if(findMobileNumberResponse.length > 0){
        res.json({isSuccessful: false, errorType: "mobileNumber", error: "该手机号已经被注册"})
      }
      else{
        Manager.find({managername:managerMessage.managername},(err,findManagerNameResponse)=>{
          if(err){
            res.json({isSuccessful: false, errorType: "captcha", error: "发生错误！请重新提交"})
          }
          else if(findManagerNameResponse.length > 0){
            res.json({isSuccessful: false, errorType: "managername", error: "该昵称已被使用"})
          }
          else{
            let newManager=new Manager(managerMessage);
            newManager.save((err, saveRes) => {
              if(err){
                res.json({isSuccessful: false, errorType: "captcha", error: "发生错误!请重新提交2"})
              }
              else{
                res.json({isSuccessful: true, managerData: saveRes})
              }
            })
          }
        })
      }
    })
  }
} 
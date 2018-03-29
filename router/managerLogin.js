let Manager = require("../mongodb/index")["Manager"];

module.exports = (req, res) => {
  let managerMessage = {mobileNumber: decodeURIComponent(req.body.mobileNumber), password: decodeURIComponent(req.body.password)};
  Manager.find(managerMessage, (err,findManagerResponse) => {
    if(err){
      res.json({isCorrect: false, error: "发生错误!请重新提交", errorType: "password"})
    }
    else if(findManagerResponse.length == 0){
      res.json({isCorrect: false, error: "密码错误", errorType: "password"})
    }
    else{
      res.json({isCorrect: true, managerData: findManagerResponse[0]})
    }
  })
  // let newUser = new User({
  //   mobileNumber: '13542829555',
  //   password: 'zzr7765767'
  // });
  // newUser.save()
};
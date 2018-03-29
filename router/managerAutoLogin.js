let Manager = require('../mongodb/index')['Manager'];

module.exports=(req, res) => {
  let managerMessage={mobileNumber: req.cookies.mobileNumber, _id: req.cookies.managerId};
  Manager.find(managerMessage, (err,findManagerResponse) => {
    if(err || findManagerResponse.length === 0){
      res.json({isCorrect: false});
    }
    else{
      res.json({isCorrect: true, managerData: findManagerResponse[0]})
    }
  })
};
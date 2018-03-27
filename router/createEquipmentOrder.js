let User = require("../mongodb/index")["User"];
let EquipmentOrder = require("../mongodb/index")["EquipmentOrder"];

module.exports = (req, res) => {
  let userMessage = {mobileNumber: req.cookies.mobileNumber, _id: req.cookies.userId};
  User.find(userMessage, (err,findUserResponse) => {
    if(err){
      res.json({isSuccessful: false, error: "服务器发生错误!请重新提交"})
    }
    else if(findUserResponse.length == 0){
      res.json({isSuccessful: false, loginState: false})
    }
    else{
      let data = {
        equipment: req.body.equipmentId,
        user: req.cookies.userId,
        createTime: new Date().getTime().toString(),
        status: '已付款',
        num: req.body.num,
        size: req.body.size,
        price: req.body.price,
        color: req.body.color,
        delivery: req.body.delivery
      };
      let newEquipmentOrder = new EquipmentOrder(data);
      newEquipmentOrder.save((err, saveRes) => {
        if(err){
          res.json({isSuccessful: false, error: "发生错误!请重新提交"})
        }
        else{
          res.json({isSuccessful: true})
        }
      })
    }
  })
}
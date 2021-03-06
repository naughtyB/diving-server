
const express = require("express");
let app = express();
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cookie = require("cookie-parser");
let multer  = require('multer');

let urlencodeParser = bodyParser.urlencoded({extends:false});
let jsonParser = bodyParser.json({extends:false});
let upload =  multer({ dest: './public/upload/' });

app.use(express.static(__dirname));

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookie())

//获取首页数据
app.use('/server/homepage/data', urlencodeParser, require('./router/getHomepageData'));

//获取练习页数据
app.use('/server/practice/data', urlencodeParser, require('./router/getPracticeData'));

//登录
app.use('/server/user/login', urlencodeParser, require('./router/login'));

//自动检测登录
app.use('/server/user/autoLogin', urlencodeParser, require('./router/autoLogin'));

//注册
app.use('/server/user/register', urlencodeParser, require('./router/register'));

//找回密码
app.use('/server/user/resetPassword', urlencodeParser, require('./router/resetPassword'))

//获取用户个人资料
app.use('/server/user/getUserDataFields', urlencodeParser, require('./router/getUserDataFields'));

//改变用户个人资料
app.use('/server/user/changeUserData', urlencodeParser, require('./router/changeUserData'));

//添加用户人员
app.use('/server/user/addUserPerson', urlencodeParser, require('./router/addUserPerson'));

//获取用户人员列表
app.use('/server/user/getUserPerson', urlencodeParser, require('./router/getUserPerson'));

//修改用户人员列表
app.use('/server/user/modifyUserPerson', urlencodeParser, require('./router/modifyUserPerson'));

//删除用户人员
app.use('/server/user/deleteUserPerson', urlencodeParser, require('./router/deleteUserPerson'));

//获取用户收货地址列表
app.use('/server/user/getUserDelivery', urlencodeParser, require('./router/getUserDelivery'));

//添加用户收货地址
app.use('/server/user/addUserDelivery', urlencodeParser, require('./router/addUserDelivery'));

//修改用户收货地址
app.use('/server/user/modifyUserDelivery', urlencodeParser, require('./router/modifyUserDelivery'));

//删除用户收货地址
app.use('/server/user/deleteUserDelivery', urlencodeParser, require('./router/deleteUserDelivery'));

//创建练习订单
app.use('/server/practiceAppointment/createOrder', jsonParser, require('./router/createPracticeOrder'));

//获取用户潜水练习订单
app.use('/server/user/getUserPracticeOrder', urlencodeParser, require('./router/getUserPracticeOrder'));

//获取潜水行程详细信息
app.use('/server/trip/getTripDetailData', urlencodeParser, require('./router/getTripDetailData'));

//获取潜水行程
app.use('/server/trip/getTripData', urlencodeParser, require('./router/getTripData'));

//创建行程订单
app.use('/server/tripAppointment/createOrder', jsonParser, require('./router/createTripOrder'));

//获取装备资料
app.use('/server/equipment/getEquipmentData', urlencodeParser, require('./router/getEquipmentData'));

//创建装备订单
app.use('/server/equipment/createOrder', jsonParser, require('./router/createEquipmentOrder'));

//获取装备详细资料
app.use('/server/equipment/getEquipmentDetailData', urlencodeParser, require('./router/getEquipmentDetailData'));

//管理员登陆
app.use('/server/manager/login', urlencodeParser, require('./router/managerLogin'));

//管理员注册
app.use('/server/manager/register', urlencodeParser, require('./router/managerRegister'))

//管理员重置密码
app.use('/server/manager/resetPassword', urlencodeParser, require('./router/managerResetPassword'));

//管理员自动登录
app.use('/server/manager/autoLogin', urlencodeParser, require('./router/managerAutoLogin'))

//管理员创建课程
app.use('/server/course/createCourse', urlencodeParser, require('./router/createCourse'));

//获取课程资料
app.use('/server/course/getCourseData', urlencodeParser, require('./router/getCourseData'))

//获取课程详细资料
app.use('/server/course/getCourseDetailData', urlencodeParser, require('./router/getCourseDetailData'));

//管理员修改课程详细资料
app.use('/server/course/modifyCourse', urlencodeParser, require('./router/modifyCourse'))

//管理员删除课程
app.use('/server/course/deleteCourse', urlencodeParser, require('./router/deleteCourse'))

// app.use('/bb', urlencodeParser, require('./router/bb'))
//上传文件
app.use('/upload', upload.single('file'), require('./router/upload'));

//上传首页banner
app.use('/uploadHomepage', upload.single('file'), require('./router/uploadHomepage'));

//给banner添加链接
app.use('/server/homepage/addBannerLink', urlencodeParser, require('./router/addBannerLink'));

//删除banner
app.use('/server/homepage/deleteHomepageBanner', urlencodeParser, require('./router/deleteHomepageBanner'))

//管理员创建课程
app.use('/server/practice/createPractice', jsonParser, require('./router/createPractice'));


http.createServer(app).listen(8000);
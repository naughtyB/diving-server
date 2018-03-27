const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/diving";

mongoose.connect(DB_URL);

mongoose.connection.on("connected",() => {
    console.log("Mongoose connection open to "+DB_URL)
});

mongoose.connection.on("error",(err) => {
    console.log("Mongoose connection error: "+err)
});

mongoose.connection.on("disconnected",() => {
    console.log('Mongoose connection disconnected');
});

let Schema=mongoose.Schema;


let HomepageSchema = new Schema({
  banner: [{type: String}]
})

let Homepage = mongoose.model("homepage", HomepageSchema);

let PracticeSchema = new Schema({
  imgUrl: String,
  name: String,
  price: String,
  detail: [{title: String, content: String}],
  practiceTime: [{date: String, time: String}]
})

let Practice = mongoose.model("practice", PracticeSchema);

let UserSchema = new Schema({
  mobileNumber: String,
  password: String,
  username: String,
  sex: String,
  person: [{name: String, mobileNumber: String}],
  delivery: [{name: String, mobileNumber: String, address: String}]
})

let User = mongoose.model("user", UserSchema);

let PracticeOrderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "user"},
  person: [{name: String, mobileNumber: String}],
  practiceTime: {date: String, time: String},
  practice: {type: Schema.Types.ObjectId, ref: "practice"},
  createTime: String,
  status: String
})

let PracticeOrder = mongoose.model("practiceOrder", PracticeOrderSchema);

let TripLineSchema = new Schema({
  name: String,
  totalTime: String,
  embark: String,
  disembark: String,
  dives: String,
  Des: String,
  Route: [{title: String, process:[{step: String, do: String}]}],
  facilities: [String],
  amusement: [String],
  diet: [String],
  equipmentLeasing: [{name: String, value: String}],
  qualification: [{name: String, value: String}]
})

let TripLine = mongoose.model("tripLine", TripLineSchema);

let TripSchema = new Schema({
  name: String,
  areaName: String,
  price: String,
  imgUrl: String,
  imgs: [String],
  wifi: Boolean,
  nitrox: Boolean,
  ac: Boolean,
  luxury: Boolean,
  size: String,
  guest: String,
  about: String,
  tripLine: {type: Schema.Types.ObjectId, ref: "tripLine"},
  tripTime: [{month: String, date: String}]
})

let Trip = mongoose.model("trip", TripSchema);

let TripOrderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "user"},
  person: [{name: String, mobileNumber: String}],
  tripTime: {month: String, date: String},
  trip: {type: Schema.Types.ObjectId, ref: "trip"},
  createTime: String,
  status: String
})

let TripOrder = mongoose.model("tripOrder", TripOrderSchema);

let EquipmentSchema = new Schema({
  name: String,
  imgUrl: String,
  imgs: [String],
  inventory: [{color: String, size: [String], price: String}],
  feature: String,
  detail: String,
  type: String,
  deliveryPrice: String
})

let Equipment = mongoose.model("equipment", EquipmentSchema);

let EquipmentOrderSchema = new Schema({
  equipment: {type: Schema.Types.ObjectId, ref: "equipment"},
  createTime: String,
  status: String,
  user: {type: Schema.Types.ObjectId, ref: "user"},
  num: String,
  price: String,
  color: String,
  size: String,
  delivery: {address: String, name: String, mobileNumber: String}
})

let EquipmentOrder = mongoose.model("equipmentOrder", EquipmentOrderSchema);

let ManagerSchema = new Schema({
  userName: String,
  mobileNumber: String,
  password: String
})

let Manager = mongoose.model("manager", ManagerSchema);

let AbSchema = new Schema({
  data: [{music: [{name: String}]}]
})

let Ab = mongoose.model("Ab", AbSchema)

module.exports={
  Homepage,
  Practice,
  User,
  PracticeOrder,
  Ab,
  TripLine,
  Trip,
  TripOrder,
  Equipment,
  EquipmentOrder,
  Manager
};
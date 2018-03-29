let Homepage = require('../mongodb')['Homepage'];

module.exports = (req, res) => {
  // let newAb = new Ab({
  //   data: [
  //     {
  //       music: [
  //         {
  //           name: '皮'
  //         }
  //       ]
  //     }
  //   ]
  // })

  // newAb.save()
  // Ab.update({'_id': '5ab385920ee5372be84c16c9', 'data._id': '5ab385920ee5372be84c16c8'},{'$push': {
  //   'data.$.music':{
  //     name: '老师'
  //   }
  // }},(err, res) => {
  //   if(err){
  //     console.log(err)
  //   }
  //   else{
  //     console.log('成功')
  //   }
  // })
  Homepage.update({'_id': '5abd20f3ff804b28e0b97821', 'banner._id': '5abd20f3ff804b28e0b97822'}, {'banner.$.link': 'asd'},(err, res) => {
    if(err)console.log(err);
    else{
      console.log('success')
    }
  })
}

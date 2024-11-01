var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')



router.post('/add_new_banner',upload.any(), function(req, res, next) {
    try {
        var files;
       files=req?.files?.map((item)=>{
    
         return item.filename
        })
        // var files=req.files.map((file, i)=>file.filename)
            pool.query("insert into banners (brandid,bannername,picture) values (?,?,?)",[req.body.brandid,req.body.bannername,files+""],function(error,result){
                  if(error){
                res.status(200).json({message:error,status:false})
            }else{
                res.status(200).json({message:'Banner submittes successfully',status:true})
            }
        })
      }
      catch(e){
        console.log(e)
        res.status(200).json({message:'fail to submit Banner',status:false})
      }
});

module.exports = router;

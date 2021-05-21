var express  = require('express');
var router = express.Router();

var db = require("../../connection");
console.log("getCategories");
router.get('/getCategory', function(req, res, next) {
    // var data=req.query;
    // var page_limit=req.params.page_limit;
    // var offset=req.params.offset;
    db.query('SELECT count(*) totalRecords from tbl_categories' ,function (error, results, fields) {
        if (error) throw error;
        var pagination=[];
        if(results[0].totalRecords>0)
        {
          db.query('SELECT * from tbl_categories where category_status=1 ' ,function (error, results1, fields) {
            if (error) throw error;
            let pagination=[]
            res.send({ status: 200, msg: "Success", categoryList: results1 });
            
          });   
        }
        else{
        res.send({ status: 200, msg: "No Record Found"});
        }
        
      });   
    
  });

  



module.exports = router;

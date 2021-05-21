var express  = require('express');
var router = express.Router();

var db = require("../../connection");
console.log("getCategories");
router.get('/getUserLanguage/:id', function(req, res, next) {
    // var data=req.query;
    // var page_limit=req.params.page_limit;
    // var offset=req.params.offset;
    db.query('SELECT count(*) totalRecords from tbl_languages' ,function (error, results, fields) {
        if (error) throw error;
        var pagination=[];
        if(results[0].totalRecords>0)
        {
          db.query('SELECT * from tbl_languages where user_id = '+req.params.id+' ' ,function (error, results1, fields) {
            if (error) throw error;            
            res.send({ status: 200, msg: "Success", LanguageList: results1 });            
          });   
        }
        else{
        res.send({ status: 200, msg: "No Record Found"});
        }        
      });       
  });
  



module.exports = router;

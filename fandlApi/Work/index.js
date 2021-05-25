var express  = require('express');
var router = express.Router();

var db = require("../../connection");
var bodyParser = require('body-parser')
console.log("getCategories");
router.get('/work_list/:id', function(req, res, next) {

    var id  = req.params.id;
    console.log("ID",id);
    // var data=req.query;
    // var page_limit=req.params.page_limit;
    // var offset=req.params.offset;
    db.query('SELECT count(*) totalRecords from tbl_works where user_id = "'+id+'"' ,function (error, results, fields) {
        if (error) throw error;
        var pagination=[];
        if(results[0].totalRecords>0)
        {
          db.query('SELECT * from tbl_works where user_id = "'+id+'" ' ,function (error, results1, fields) {
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

  var jsonParser = bodyParser.json();
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

  router.post('/work_insert', jsonParser,function(req,res){
     work_insert = req.body;
    work_insert.user_id =req.body.user_id;
work_insert.work_position =req.body.work_position;
work_insert.work_company_name =req.body.work_company_name;
work_insert.work_start_date =req.body.work_start_date;
work_insert.work_end_date =req.body.work_end_date;
work_insert.work_currently =req.body.work_currently;
work_insert.work_description =req.body.work_description;
    console.log("work_insert",work_insert);
    db.query('INSERT INTO tbl_works SET ?', work_insert,
    function (err, rows, fields) {
        if (err) {
            if (err.errno==1062) {
                return res.send(JSON.stringify({
                    "status": 202,
                    "message":"Record already exist"
                }));
            } else {
                return res.send(JSON.stringify({
                    "status": 500
                }));
            }
        } else {
            return res.send(JSON.stringify({
                "status": 201,
                "message": "Data Inserted Sucessfully",
                "id": rows.insertId,
                "error": null
            }));
        }
    });
  })

  router.get('/work_delete/:id', function(req, res, next) {

    var id  = req.params.id;
    console.log("ID",id);
    // var data=req.query;
    // var page_limit=req.params.page_limit;
    // var offset=req.params.offset;
    db.query('DELETE from tbl_works where work_id = "'+id+'"' ,function (error, results, fields) {
        if (error) throw error;        
            res.send({ status: 200, msg: "Success" });                 
               
      });   
    
  });

  router.post('/work_update',jsonParser, function(req, res, next) {

    work_insert = req.body;
    work_insert.work_id=req.body.work_id;
    work_insert.user_id =req.body.user_id;
work_insert.work_position =req.body.work_position;
work_insert.work_company_name =req.body.work_company_name;
work_insert.work_start_date =req.body.work_start_date;
work_insert.work_end_date =req.body.work_end_date;
work_insert.work_currently =req.body.work_currently;
work_insert.work_description =req.body.work_description;
    db.query('update tbl_works set work_end_date="'+work_insert.work_end_date+'",work_currently="'+work_insert.work_currently+'",work_description="'+work_insert.work_description+'", work_position="'+work_insert.work_position+'",     work_company_name="'+work_insert.work_company_name+'",work_start_date="'+work_insert.work_start_date+'"  where work_id = "'+work_insert.work_id+'"' ,function (error, results, fields) {
        if (error) throw error;        
            res.send({ status: 200, msg: "Success" });                 
               
      });   
    
  });





module.exports = router;

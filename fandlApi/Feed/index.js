var express  = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require("../../connection");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/follow_user',jsonParser, function(req, res, next) {
    followUser=req.body;
    followUser.followered_to_id=req.body.followered_to_id;
    followUser.follower_by_id=req.body.follower_by_id;
    //followUser.follower_feed_id=req.body.follower_feed_id;
    followUser.follower_status=req.body.follower_status;
    followUser.feed_id=req.body.feed_id;
  //  console.log("dataaaa",followUser)
    db.query('SELECT *  from tbl_followers where followered_to_id='+followUser.followered_to_id+' and follower_by_id='+followUser.follower_by_id+'' ,function (error, results, fields) {
        if (error) throw error;        
        var pagination=[];
        if(results.length>0)        {
            
         db.query('update tbl_followers set follower_status='+followUser.follower_status+' ' ,function (error, results1, fields) {
            if (error) throw error;            
            res.send({ status: 200, msg: "success" });            
          });   
        }
        else{
            db.query('INSERT INTO tbl_followers SET ? ', followUser ,function (error, results1, fields) {
                if (error) throw error;            
                res.send({ status: 200, msg: "success" });            
              });        
        }        
      });       
  });

  router.get('/unfollow/:feed_user_id/:user_id', function(req, res, next) {
    feed_user=req.params.feed_user_id;
    userId=req.params.user_id;
    req_status=5;
    var req_msg='';
    var record=[];
    var record1=[];
    var d= new Date().getDate();

var m=new Date().getMonth()+1;

var y= new Date().getFullYear();
    var modified_date= y+'-'+m+'-'+d;
    db.query('SELECT *  from tbl_friend_request where sender_user_id='+feed_user+' and receiver_user_id='+userId+'' ,function (error, results, fields) {
        if (error) throw error;      
         record=results;
      });  
      
      db.query('SELECT *  from tbl_friend_request where receiver_user_id='+feed_user+' and sender_user_id='+userId+'' ,function (error, results, fields) {
        if (error) throw error;      
         record1=results;
      });
      if(record.length==0)
      {
        db.query('update tbl_friend_request set  request_status='+req_status+',modified_date='+modified_date+' where sender_user_id='+feed_user+' and receiver_user_id='+userId+' ' ,function (error, results1, fields) {
            if (error) throw error;            
            res.send({ status: 200, msg: "success" });            
          });
      }
      if(record1.length==0)
      {
        db.query('update tbl_friend_request set  request_status='+req_status+',modified_date='+modified_date+' where receiver_user_id='+feed_user+' and sender_user_id='+userId+' ' ,function (error, results1, fields) {
            if (error) throw error;            
            res.send({ status: 200, msg: "success" });            
          });
      }
  });

module.exports = router;

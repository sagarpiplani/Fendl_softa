
'use strict';

// export default function (app) {
 
//  }

//  export default (app)=>{
 
//  }

 function abc(app){
         // Insert routes below
  app.use('/fandlApi/getCategories', (req,res,next)=>{
    console.log("sagar");
    next();
  }, require('./fandlApi/getCategories'));
  
  console.log("apihit")
 }

 module.exports = abc;
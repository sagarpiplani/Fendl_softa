
'use strict';

// export default function (app) {
 
//  }

//  export default (app)=>{
 
//  }

 function abc(app){
         // Insert routes below
  app.use('/fandlApi/getCategories',require('./fandlApi/getCategories'));
  app.use('/fandlApi/educationlist', require('./fandlApi/educationlist'));
  app.use('/fandlApi/work', require('./fandlApi/Work'));
  app.use('/fandlApi/languageList', require('./fandlApi/languageList'));
  app.use('/fandlApi/otherUser', require('./fandlApi/otherUser'));
  app.use('/fandlApi/friendRequest', require('./fandlApi/friendRequest'));
  console.log("apihit")
 }

 module.exports = abc;
'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs')
var mongoose = require('mongoose')
var Listing = require('./ListingSchema.js') 
var config = require('./config')

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */

var dbname = `${config.db.uri}/${config.db.db_name}`;

mongoose.connect(dbname).then(() => { 

    fs.readFile('listings.json', 'utf-8', function(err, data) { 
      
        var json = JSON.parse(data);
        json.entries.forEach(function(entry) { 

             var listing = new Listing({code: entry.code, 
				       name: entry.name,
                                       coordinates: entry.coordinates, 
				       address: entry.address});
             listing.save().then(doc => {console.log(doc);}).catch(err => {throw err;});
        });
     
    });

})
.catch(err => { throw err; });


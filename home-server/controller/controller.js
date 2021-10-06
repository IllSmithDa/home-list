var csv = require('jquery-csv');
const csvJSON = (csv) => {

    var lines=csv.split("\n");
  
    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
const parseHomeAddresses = (req, res) => {
    console.log(req.body.currentFile);
    const homeData = JSON.parse(csvJSON(req.body.currentFile));
    // JSON.parse(homeData);
    // const result2 =  csv.toObjects(req.body.currentFile);
    console.log(homeData);
    res.status(200).json({ success: true, homeData})
}

module.exports = {
    parseHomeAddresses,
}
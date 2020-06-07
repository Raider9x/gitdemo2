var util = require("util");
 require('./clipboard.js')(function (err, passwords) {
     console.log("DA NHAN:"+ util.inspect(passwords, {showHidden: false, depth: null}))
});

function check(){
    if(Object.keys(arr).length === 0){
        console.log("CHUA NHAN ARR!");
        setTimeout(function(){check()},5000);
    }
    else{
        console.log("DA NHAN:"+ util.inspect(arr[0], {showHidden: false, depth: null}))
    }
}


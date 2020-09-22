const express = require('express');
const request = require('request');

const app = express();
const port = 5400;

// var url = "http://api.openweathermap.org/data/2.5/weather?q=patna&appid=53508d3c7785dcc45e3152283b14294a"
var url = "http://api.openweathermap.org/data/2.5/forecast?q=patna&units=metric&appid=53508d3c7785dcc45e3152283b14294a"
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');




app.get('/',(req,res)=>{
    res.send("Goto localhost:"+port+"/weather");
})

app.get('/weather',(req,res)=>{
    let dataPromise = getWeather(url);
    dataPromise
    .then((response)=>{
        res.render('main',{data:JSON.parse(response)});
    })
    .catch(err=>res.render(err));


});

function getWeather(url){
    let options = {url:url,headers:{'User-Agent':'request'}};
    let promise =  new Promise((resolve,reject)=>{
        request.get(url,options,(err,response,body)=>{
            if(!err)resolve(body);
            else reject(err);
        })
    });
    return promise;
}






app.listen(port,err=>{
    if(!err)
        console.log(`Starting express on port ${port}`);
});
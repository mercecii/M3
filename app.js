const express = require('express');
const request = require('request');

const app = express();
const port = 5400;

var url = "http://api.openweathermap.org/data/2.5/weather?q=patna&appid=53508d3c7785dcc45e3152283b14294a"


app.get('/',(req,res)=>{
    res.send("API i working");
})

app.get('/weather',(req,res)=>{
    // request(url,(err,response,body)=>{
    //     if(!err){
    //         res.send(JSON.parse(body));
    //     }
    //     else{
    //         console.log(err);
    //         res.send("Error Calling Api");
    //     }
    // })

    let dataPromise = getWeather(url);
    dataPromise
    .then((response)=>{
        res.send(JSON.parse(response));
    })
    .catch(err=>res.send(err));


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
const http=require("http");
const fs=require("fs");
var requests = require("requests");

const homeFile=fs.readFileSync("index.html","utf-8");

const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
   temperature= temperature.replace("{%tempmin%}",orgVal.main.temp_min);
   temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
   temperature=temperature.replace("{%location%}",orgVal.name);
   temperature= temperature.replace("{%country%}",orgVal.sys.country);
   temperature= temperature.replace("{%tempstatus%}",orgVal.weather[0].main);

   return temperature;
}

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
    requests("https://api.openweathermap.org/data/2.5/weather?q=Haridwar&appid=8878e0776c110980147a025846462808" )
    .on("data", (chunk)=>{
        let objData=JSON.parse(chunk);
         let arrData=[objData];
        //console.log(arrData[0].main.temp);
        var realtimedata=arrData.map((val)=>{
            replaceVal(homeFile,val)

        }).join("");

        res.write(realtimedata);   
    })
    .on("end",(err)=>{
        if(err) return console.log("Connection closed due to some error");
        res.end();
    });
}
else{
    res.end("File not found");
}
})


server.listen(3000,"127.0.0.1");
const http=require('http');
const path=require('path');
const fs=require('fs');
const { verify } = require('crypto');

const port=process.env.PORT || 3000;

http.createServer((req,res)=>{
 let filepath=path.join(__dirname,'public', req.url==='/'?'index.html':req.url);

    let extName=path.extname(filepath);
    let contentType='text/html';
    switch(extName){
        case '.js':
        contentType='text/javascript';
        break;

        case '.css':
        contentType='text/css';
        break;

        case '.json':
        contentType='application/json';
        break;

        case '.png':
        contentType='image/png';
        break;

        case '.jpg':
        contentType='image/jpg';
        break;
    }

    fs.readFile(filepath,'utf-8',(err,content)=>{
        if(err){
            if(err.code=='ENOENT'){
                //page not found
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                    res.writeHead(200,{'content-type':'text/html'});
                    res.end(content,'utf-8');
                })
            }
            else{
                //some server error
                res.writeHead(500);
                res.end(`Server Error ${err.code}`)
            }
        }
        else{
        res.writeHead(200,{'content-type' : contentType});
        res.end(content);
        }
    })
    
}).listen(port,()=>{
    console.log(`server is running on post ${port}`);
})





 // if(req.url==='/'){
       
    //     fs.readFile(path.join(__dirname,'public','index.html'),'utf8',(err,content)=>{
    //         if(err) throw err
    //             res.writeHead(200,{'content-type':'text/html'});
    //            res.end(content) 

    //     })
    // }
    // else if(req.url==='/about'){
       
    //     fs.readFile(path.join(__dirname,'public','about.html'),'utf8',(err,content)=>{
    //             if(err) throw err
    //             res.writeHead(200,{'content-type':'text/html'});
    //            res.end(content); 

    //     })
    // }

    // else if(req.url==='/api/users'){
    //     const users=[
    //         {name:"Hardik Sharma", age:23},
    //         {name:"Arjun Sharma", age:54},
    //         {name:"Manisha Sharma", age:49},
    //         {name:"Urvashi Sharma", age:26},
    //     ]
    //     res.writeHead(200,{'content-type':'application/json'});
    //     res.end(JSON.stringify(users)) 
    // }
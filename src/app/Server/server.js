const express= require('express')             //initialize packages 
const bodyparser= require('body-parser');
const cors = require ('cors');

const port = 3000;                            //initialize port

const app = express();                        //initialize instance to use it 

app.use(bodyparser.json());                     //tranfer arrived data to json to deal with
app.use(cors());


app.get('/',function(req,res){                   ////to test api
    
    res.send("Hello from serever")    
})

app.listen(port,function()
{
    console.log("Server running on port " + port);
})


app.post('/users',function(req,res)
{
    console.log(req.body)
    res.status(200).send({"data": "Data Saved Successfully"})
}
)

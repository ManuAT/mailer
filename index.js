var nodemailer = require('nodemailer');
const express = require('express');
var cors = require('cors');

var app = express(); 
var port = process.env.PORT || 8080; 

const sendMail = (params)=>{
  return new Promise((resolve,reject)=>{
    console.log(params);
    const {from,to,sub,body} = params;
    let parsedToAddress;
    try{
      parsedToAddress = (typeof to == 'string'? JSON.parse(to): to).join(',')
    } catch(e){
      parsedToAddress = to;
    }
    

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mailer2828@gmail.com',
        pass: 'manu@2828'
      }
    });
    
    var mailOptions = { 
      from:from,
      to: to,
      subject: sub,
      text: body
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Failure: An Error occured'+ error);
        resolve({status:"failure"});
      } else {
        console.log('Success: Email sent: ' + info.response);
        resolve({status:"success"});
      }
    });
    // ----
  })
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/index.html');
})

app.post('/send',async (req,res)=>{
  res.send(await sendMail(req.body));
})

app.get('/send', async (req,res)=>{
  res.send(await sendMail(req.query));
})

app.listen(port);
console.log("App listening on port " + port);
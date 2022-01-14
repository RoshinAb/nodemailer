const express = require('express')
const app = express()

const nodemailer = require('nodemailer')
app.set('view engine','ejs')
app.set('views',__dirname+'/views')

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.sendFile('views/index.html',{root: __dirname });
})


app.get('/home', async (req,res)=>{
    await res.sendFile('views/home.html',{root: __dirname })
})

app.post('/mailer',(req,res)=>{

    let transporter = nodemailer.createTransport({
        service:"hotmail",
        auth:{
            user:"roshin.a@outlook.com",
            pass:"Srsr101997*"
        },
        tls:{
            rejectUnauthorized:false,
        }
    })


    let mailOptions = {
        from:"roshin.a@outlook.com",
        to:req.body.email,
        subject:"Mail using Nodemailer",
        text:"Hi...This mail is send as part of ICT case-study project using nodemailer..Regards Roshin"
    }
    
    transporter.sendMail(mailOptions,function(err,success){
        if(err){
            console.log("Something went wrong ",err)
           // res.send("Something went wrong");
            res.sendFile('views/mailFail.html',{root: __dirname });
        }
        else{
           console.log("Email sent successfully ",success)
          // res.send("Email sent successfully");
           res.sendFile('views/mailSuccess.html',{root: __dirname })
        }
    })

    //res.sendFile('views/mailer.html',{root: __dirname })
    console.log(req.body)
})  

app.listen(process.env.PORT||5000);
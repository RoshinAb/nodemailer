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
        subject:"Testing",
        text:"many email-new mail-read this once again"
    }
    
    transporter.sendMail(mailOptions,function(err,success){
        if(err){
            console.log("Something went wrong ",err)
            //res.send(<h1>Something went wrong</h1>)
        }
        else{
            console.log("Email sent successfully ",success)
           // res.send(<h1>Email sent successfully</h1>)
        }
    })

    res.sendFile('views/mailer.html',{root: __dirname })
    console.log(req.body)
})  

app.listen(process.env.PORT||5000);
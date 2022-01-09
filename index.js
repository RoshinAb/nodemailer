const express = require('express')
const app = express()

const nodemailer = require('nodemailer')
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.render('index');
})


app.get('/home', async (req,res)=>{
    await res.render('home')
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
        text:"many email"
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

    res.render('mailer')
    console.log(req.body)
})  

app.listen(5000);
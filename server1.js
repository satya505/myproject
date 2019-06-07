var express=require('express');
var app=express();

var books=require("./routes/books")
var students=require("./routes/students")
var path=require('path');

var bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))



app.all('/api/*', function (req, res, next) {
    const auth = { login: "akrivia", password: "pass1234" } // change this

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (!login || !password ||
        login !== auth.login ||
        password !== auth.password) {
        res.set('WWW-Authenticate', 'Basic realm="nope"') // change this
        res.status(401).send('Request is not authorizeddd. You must pass credentials')
        return
    }
    else {
        next();
    }
});


/*app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"nodejs/public/training.html"))
})*/

app.use("/api/books",books)
app.use("/api/students",students)

app.listen(8000,function(){
    console.log("Server is started")
})
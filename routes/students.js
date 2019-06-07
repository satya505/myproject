var express=require('express')
var router=express.Router();
var mysql=require("mysql");

router.route("/")
    .get((req,res)=>{
    	 
        var connection = mysql.createConnection({
            host     : "localhost",
            user     : "root",
            password : "",
            database : "satya"
          });
          connection.connect();
 
          connection.query('SELECT * from students', function (error, students, fields) {
            if (error) throw error;
            res.send(students)
          });
           
          connection.end();
        
    })
    .post((req,res)=>{
        newStudent=req.body;
        var connection = mysql.createConnection({
            host     : "localhost",
            user     : "root",
            password : "",
            database : "satya"
          });
          connection.connect();
 
          connection.query(`insert into students(first_name,branch)values('${newStudent.first_name}','${newStudent.branch}')`,function (error, students, fields) {
            if (error) throw error;
            res.send(students)
          });
           
          connection.end();
        
    })
router.route("/:sno")
    .put((req,res)=>{
        var id=req.params.sno;
        var dataToBeupdated=students.filter((s)=>{
            return s.sno==id
        })
        //dataToBeupdated[0].branch="CSE"
        dataToBeupdated[0]=req.body
        res.send(dataToBeupdated)
    })
    .delete((req,res)=>{
        var id=req.params.sno;

        var latestStudent=students.filter((book)=>{
            return students.sno!=id
        })

        res.send(latestStudent)
    })

module.exports=router;
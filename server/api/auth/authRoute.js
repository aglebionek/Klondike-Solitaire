//Logowanie & rejstracja
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mysqlQuery = require("../../database/connection/mysql_query");
const bcrypt=require("bcrypt")

const saltRounds = 10

//auth jest dodawany automatycznie
router.post("/register", (req, res) => {
   const username=req.body.username
    const email=req.body.email
    const password=req.body.password

    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err)
        {
            console.log(err)
        }
      
      
        const query = fs
            .readFileSync(path.join(__dirname, "../../database/queries/Register.sql"))
            .toString
        const resp = await mysqlQuery(query, { username: username, email: email, password: hash });
      }
      ) 
      res.status(200).json({ resp });
    }
);
router.post("/login", (req, res) => {
  const username=req.body.username
  const password=req.body.password

  db.query("SELECT * FROM users WHERE username = ?",
    username,
    (err,result)=>{
        if(err)
         {res.send({err: err})}

        if(result.length >0){
            bcrypt.compare(password,result[0].password,(error, response)=>
            {
                if(response) {
                    res.send(result)
                }
                else{
                    res.send({message: "Błędne hasło"})
                }
            })           
        }
        else{
            res.send({message: "Błędna nazwa użytkownika"})
        }
        
    })
      
  })
;
module.exports = router;

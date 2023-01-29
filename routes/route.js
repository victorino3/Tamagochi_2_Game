import {dbase} from "../server/connection.js"
import express from "express"
import {fileURLToPath} from 'url';
import path from 'path';
const router = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let saveSessionId = 0

//get all user in db
router.post('/login',(req,res)=>{
    const email = req.body.username;
    const password = req.body.password;
    dbase.query(
        'SELECT * FROM `user` WHERE `email` = ? AND `password` = ?',
        [email, password],
        function(err, results) {
            if (results.length > 0) {
                let [image] = results
                saveSessionId = image.id
                res.json({message:true})
            } else {
                res.json({message:false})
            }
         
        }
       
      );
      
})

router.post('/register', (req,res)=>{
    const email = req.body.username
    const password = req.body.password
    const availableMoney =  req.body.moneyTodb
    const foodAlert =  req.body.foodTodb
    dbase.query('INSERT INTO user (email, password, availableMoney,foodAlert) VALUES(?, ?, ?,?)',
    [email, password,availableMoney,foodAlert ],(error,results) => {
       if (error) return res.json({ error: error });
       res.send(results)
       });
})

router.post("/values/update",(req,res)=>{
    const email = req.body.username
    const password = req.body.password
    const availableMoney =  req.body.moneyTodb
    const foodAlert =  req.body.foodTodb
    const id = saveSessionId
    console.log(req.body.moneyTodb, "----", req.body.foodTodb )
    dbase.query('UPDATE user SET availableMoney = ?, foodAlert = ? WHERE id = ?;', 
    [id,availableMoney,foodAlert ],(error,results) => {
        if (error) return res.json({ error: error });
        res.send(results)
    });

})

//let sql = "INSERT INTO imagerandom (`image`,`name`) VALUES ('"+image_path+"','"+name+"');";
router.get('/getdata',(req,res)=>{
    dbase.query(
        'SELECT * FROM `user` WHERE `id` = ?',
        [saveSessionId],
        function(err, results) {
         let [image] = results
         console.log(image)
         res.json({message:image})
        }
       
      );
      
})


export {router}

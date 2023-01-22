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
         let [image] = results
         saveSessionId = image.id
         res.json({message:image.image})
        }
       
      );
      
})

router.post('/register', (req,res)=>{
    const email = req.body.username
    const password = req.body.password
    const availableMoney =  req.body.availableMoney
    const foodAlert =  req.body.foodAlert
    dbase.query('INSERT INTO user (id, email, password, availableMoney,foodAlert) VALUES(?, ?, ?, ?,?)',
    [id, email, password,availableMoney,foodAlert ],(error,results) => {
       if (error) return res.json({ error: error });
       res.send(results)
       });
})

router.post("/values/update",(req,res)=>{
    const email = req.body.username
    const password = req.body.password
    const availableMoney =  req.body.availableMoney
    const foodAlert =  req.body.foodAlert
    const id = saveSessionId
    dbase.query('REPLACE INTO user (id, email, password, availableMoney,foodAlert) VALUES(?, ?, ?, ?,?)', 
    [id, email, password,availableMoney,foodAlert ],(error,results) => {
        if (error) return res.json({ error: error });
        res.send(results)
    });

})

//let sql = "INSERT INTO imagerandom (`image`,`name`) VALUES ('"+image_path+"','"+name+"');";
router.get('/getdata',(req,res)=>{
    dbase.query(
        'SELECT * FROM `stratergy` WHERE `id` = ?',
        [saveSessionId],
        function(err, results) {
         let [image] = results
         console.log(image)
         res.json({message:image})
        }
       
      );
      
})
export {router}

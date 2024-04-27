const connection = require('../Data/Connection');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs')
//const app=express();



const upload = multer({dest: 'uploads/'});
router.post('/upload-cv', upload.single('cv'),(req,res)=> {
    const cvFile= req.file;


    //check if a file was uploaded
    if(!cvFile ){
        return res.status(400).send('no cv file uploaded');

    }
    //read file content as binary data
    fs.readFile(cvFile.path, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading CV file');
        }

        //insert binary data into the database
        const sql='INSERT INTO etudiant (cv) values (?)';
        connection.query(sql , [data] , (err, result)=> {
            if (err){
                console.error('Error inserting CV into database:', err);
                return res.status(500).send('Error inserting CV into database');
            }
        //in case i would remove the path file from the server
         fs.unlink(cvFile.path,(err)=>{
             if (err){ 
              console.error('error deleting uploaded file:',err);
            }
         });

         res.send('cv uploaded and stored successfullyyyy');
    });
    });
});


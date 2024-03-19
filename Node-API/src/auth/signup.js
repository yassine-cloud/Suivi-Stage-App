const bcrypt = require('bcrypt');
const jwt = require('./JWTconf');
const connection = require('../Data/Connection');
const { log } = require('console');


exports.signup = async (req, res) => {
    /*let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let departement=req.body.departement;
    let pwd=req.body.pwd;
    let rpwd= req.body.rpwd;
    let mobile=req.body.mobile;*/
    const { firstname, lastname, email, departement, pwd, rpwd, mobile } = req.body;
    

    //testing passwosds
    if(pwd!== rpwd){
        return res.status(400).send("Passwors do not match");
    }
    //testing existing user
    try {
        const [existingUser] = await searchStudent(email);
        if(existingUser.length >0){
            return res.status(400).send("User already exists");
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(pwd,10);
        //insert new student
        const [result] = await connection.query('INSERT INTO etudiant (nom,prenom,email,password,departement,contact) VALUES (?,?,?,?,?,?)',[firstname, lastname, email,departement,hashedPassword,mobile]);


    }catch (err) {
        console.error("Signup error",err);
        return res.status(500).send('Internal Server Error');
    }
}

async function searchStudent(email){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM etudiant WHERE email = ?', [email],(err,result)=>{
                if (err){
                    console.log("Search student error",err);
                    reject(err);
                }else{resolve(result)}
            })
        })
    }


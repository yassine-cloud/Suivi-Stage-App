const express = require('express')
const app = express()
const multer = require('multer')
const fs = require('fs')
const connection = require('./src/Data/Connection');

// Node JS API initialising
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with the appropriate origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond to preflight requests
  }
  next();
});
const port = 3000
////-----------------------------------------------



// Routes
const auth = require('./src/auth/login')
const sign = require('./src/auth/signup')
const controle=require('./src/auth/controler')
const etudiant = require('./src/Data/etudiant')
const entreprise = require('./src/Data/entreprise')
const encadrant = require('./src/Data/encadrant')
const offre=require('./src/Data/offre')
const depot=require('./src/Data/deopotOffre')
const profilEtudiant = require('./src/Data/pofilEtudiant')
const middelware=(req,res,next)=>{ next();};

////-----------------------------------------------


// API request
app.post('/login', auth.login)
app.post('/register' , sign.signup)
app.post('/controle', controle.verifyToken)

app.get('/etudiants', etudiant.getEtudiants)
app.get('/encadrants', encadrant.getEncadrants)
app.get('/entreprises', entreprise.getEntreprises)
app.get('/offres',offre.getOffres)

app.post('/signup', sign.signup)

app.post('/etudiant', etudiant.getEtudiant)
app.post('/encadrant', encadrant.getEncadrant)
app.post('/entreprise', entreprise.getEntreprise)

// MOD Entreprise
app.post('/addEntreprise', entreprise.addEntreprise)
app.post('/editEntreprise',entreprise.updateEntreprise);
app.delete('/entreprise',entreprise.deleteEntreprise);

// Entreprise Ajout Offre
app.post('/addOffre', offre.addOffre)

// deposer sur une offre
app.post('/depotOffre', depot.addDepot)

////-----------------------------------------
const upload = multer({dest: 'uploads/'});
app.post('/upload-cv', upload.single('cv'),(req,res)=> {
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
        const sql='UPDATE etudiant SET  cv = ?  Where id_etu= ? ';
        connection.query(sql , [data, req.body.id_etu ] , (err, result)=> {
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


////-----------------------------------------------
/// Offres 
app.post('/offresentreprise', offre.getOffresEntreprise)

/////-------------------------------------------
/*
// hash code
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/hash', async (req, res) => {
  const hash = await bcrypt.hash(req.body.c, saltRounds);
  console.log(hash);
  res.status(201).send('User registered successfully');
})

app.post('/compare', async (req, res) => {
  try {
    if( await bcrypt.compare(req.body.c, "$2b$10$pc/EyY9lbkR.8LcBCPLI4eVbVXJjcYMnK69ozV/eWm0GNoPRaGlt2"))
  {
    console.log('match');
    res.status(201).send('User registered successfully');
  }
  else
  {
    console.log('not match');
    res.status(401).send('User not registered successfully');
  }
  }
  catch(err) {
    console.log('not match' + err);
    res.status(401).send('User registered successfully');
  }
  
})




// API Endpoints
app.get('/', function (req, res) {
  // testing if there is a connection or not
  res.send('Hello')
  console.log("there is a connection from " + req.ip);
})

app.post('/test', function (req, res) {
  // req.body contains the parsed body of the request
     r = req.body.nom
     res.status(301).json({message: "Data Received", data: r , date : new Date()})
  })


  app.get('/entreprise', function (req, res) {
    connection.query('SELECT * FROM entreprise', (err, rows) => {
        if (err) throw err
        console.log('Data received from Db:')
        console.log(rows)
        res.send(rows)
    }
    )
  })
*/



//   Launch Server
// ng serve --host 0.0.0.0 --port 4200
app.listen(port , ()=>{
  console.log(`Server Start with URL : http://localhost:${port}/`);

})
////-----------------------------------------------



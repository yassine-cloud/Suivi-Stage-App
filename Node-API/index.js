const express = require('express')
const app = express()

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
const depot=require('./src/Data/depotOffre')
const livret=require('./src/Data/livretStage')
const stage=require("./src/Data/stage")
const profilEtudiant = require('./src/Data/pofilEtudiant')
////-----------------------------------------------


// API request
app.post('/login', auth.login)
app.post('/register' , sign.signup)
app.post('/controle', controle.verifyToken)




app.get('/offres',offre.getOffres)

app.post('/signup', sign.signup)


//MOD Stage
app.get('/stages',stage.getStages);
app.get('/NAstages',stage.getNAStages);
app.post('/stage',stage.getStage);
app.post('/affecteEncadrant',stage.updateStage);
app.post('/addStage',stage.addStage);


// MOD Entreprise
app.get('/entreprises', entreprise.getEntreprises)
app.post('/addEntreprise', entreprise.addEntreprise)
app.post('/editEntreprise',entreprise.updateEntreprise);
app.delete('/deleteEntreprise',entreprise.deleteEntreprise);
app.post('/entreprise', entreprise.getEntreprise)


//mod Etudiant
app.post('/etudiant', etudiant.getEtudiant)
app.get('/etudiants', etudiant.getEtudiants)
app.post('/addEtudiant', etudiant.addEtudiant)
app.post('/editEtudiant',etudiant.updateEtudiant);
app.delete('/deleteEtudiant',etudiant.deleteEtudiant);


//mod Encadrant 
app.get ('/encadrants', encadrant.getEncadrants)
app.post('/encadrant', encadrant.getEncadrant)
app.post('/addEncadrant',encadrant.addEncadrant);
app.post('/editEncadrant',encadrant.updateEncadrant);
app.delete('/deleteEncadrant',encadrant.deleteEncadrant);


// Entreprise Ajout Offre
app.post('/addOffre', offre.addOffre)

// get les stagiaires d'une entreprise 
app.get('/entreprise/:id/stagiaires', depot.getStagiaires)
app.get('/depots', depot.getDepots);
app.delete('/deleteDepot',depot.deleteDepot);


// Mettre a jour le status du stagiaire
app.post('/updatestagiaire', depot.Status)

// deposer sur une offre
app.post('/postuler', depot.postuler)

///----------------------------------------
/// livre de stage
app.post('/livret', livret.getLivretStage)
app.post('/addlivret', livret.addLivretStage)
app.post('/editlivret', livret.updateLivretStage)
app.post('/dellivret', livret.deleteEntreprise)

///----------------------------------------
////-----------------------------------------
app.post('/upload-cv', profilEtudiant.handleFile)
app.post('/download-cv', profilEtudiant.downloadFile)

////-----------------------------------------------
/// Offres 
app.post('/offresentreprise', offre.getOffresEntreprise)

// get offres for etudiant
app.post('/offreetudiant', depot.getOffreEtudiant)
/////-------------------------------------------

//   Launch Server
// ng serve --host 0.0.0.0 --port 4200
app.listen(port , ()=>{
  console.log(`Server Start with URL : http://localhost:${port}/`);

})
////-----------------------------------------------



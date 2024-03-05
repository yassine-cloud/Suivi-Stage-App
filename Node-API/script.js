const express = require('express')
const mysql = require('mysql')
const app = express()

// Node JS API initialising
app.use(express.json())
const port = 3000

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'suivi_stage_bd'
})
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db')
        return
    }
    console.log('Connection established')
});




// API Endpoints
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/test', function (req, res) {
     r = req.body
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




//   Launch Server
app.listen(port , ()=>{
    console.log(`Server Start with URL : http://localhost:${port}/`);

})


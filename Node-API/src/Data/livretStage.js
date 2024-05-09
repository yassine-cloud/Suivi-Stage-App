const connection = require('../Data/Connection');

exports.getLivretStage = async (req, res) => {
    connection.query('SELECT * FROM livret_stage where id_stg = ? order by date', [req.body.id_etu] , (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.addLivretStage  = async (req, res) => {
    let data = req.body;
    connection.query('INSERT INTO livret_stage SET ?', data, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.updateLivretStage = async (req, res) => {
    connection.query('UPDATE livret_stage SET ? WHERE id_ls = ? ', [req.body , req.body.id_ls] , (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.deleteEntreprise = async (req, res) => {
    connection.query('DELETE FROM livret_stage WHERE id_ls = ?', [req.body.id_ls], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}
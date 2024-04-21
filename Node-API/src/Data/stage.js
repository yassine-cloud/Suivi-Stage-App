const connection = require('../Data/Connection');

exports.getStages = async (req, res) => {
    connection.query('SELECT s.*,e.*,et.* FROM entreprise e join stage s on e.id_ent=s.id_ent join etudiant et on s.id_etu=et.id_etu where id_enc is not null', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getNAStages = async (req, res) => {
    connection.query('SELECT s.*,e.*,et.* FROM entreprise e join stage s on e.id_ent=s.id_ent join etudiant et on s.id_etu=et.id_etu where id_enc is  null', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}


exports.getStage = async (req, res) => {
    connection.query('SELECT * FROM stage WHERE id_stg = ?', [req.body.id_stg], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    }); 
}

exports.updateStage = async (req, res) => {
    connection.query('UPDATE stage SET ? WHERE id_stg = ?', [req.body, req.body.id_stg], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}



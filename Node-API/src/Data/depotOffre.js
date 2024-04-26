const connection = require('./Connection');
exports.postuler = async (req,res) => {
    connection.query('INSERT INTO depot_stage SET ?', req.body,(err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}


exports.getStagiaires = async (req, res) => {
    const entrepriseId = req.params.id;
    connection.query('SELECT * FROM depot_stage WHERE id_os = ?', [entrepriseId], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}

exports.Status = async (req, res) => {
    const data = req.body;

    connection.query('UPDATE depot_stage SET ? WHERE id_ds = ?', [data, data.id_ds], (err, result) => {
        if (err) throw err;
            console.log('Statut mis à jour avec succès');
            res.status(200).json({ message: 'Statut mis à jour avec succès' });
        
    });
};

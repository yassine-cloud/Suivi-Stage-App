const connection = require('../Data/Connection');
const bcrypt = require('bcrypt');

exports.getEncadrants = async (req, res) => {
    connection.query('SELECT * FROM encadrant', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getEncadrant = async (req, res) => {
    connection.query('SELECT * FROM encadrant WHERE id_enc = ?', [req.body.id_enc], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}

exports.addEncadrant = async (req, res) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    connection.query('INSERT INTO encadrant SET ?', data, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.updateEncadrant = async (req, res) => {
    let data = req.body;
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    connection.query('UPDATE encadrant SET ? WHERE id_enc = ?', [data, req.body.id_enc], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.deleteEncadrant = async (req, res) => {
    const id_enc = req.query.id_enc; 
    if (!id_enc) {
        return res.status(400).json({ error: 'ID de l\'encadrant est requis' });
    }

    connection.query('DELETE FROM encadrant WHERE id_enc = ?', [id_enc], (err, rows) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'encadrant:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else if (rows.affectedRows === 0) {
            // Aucun étudiant n'a été supprimé, ID non trouvé
            res.status(404).json({ message: 'Encadrant non trouvé' });
        } else {
            console.log('Encadrant supprimé avec succès');
            res.json({ message: 'Encadrant supprimé avec succès' });
        }
    });









}



const connection = require('../Data/Connection');
const bcrypt = require('bcrypt');

exports.getEtudiants = async (req, res) => {
    connection.query('SELECT * FROM etudiant', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getEtudiant = async (req, res) => {
    connection.query('SELECT * FROM etudiant WHERE id_etu = ?', [req.body.id_etu], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}

exports.addEtudiant = async (req, res) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    connection.query('INSERT INTO etudiant SET ?',data, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.updateEtudiant = async (req, res) => {
    let data = req.body;
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    connection.query('UPDATE etudiant SET ? WHERE id_etu = ?', [data,req.body.id_etu], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}


exports.deleteEtudiant = async (req, res) => {
    const id_etu = req.query.id_etu; // Récupérer l'ID de l'étudiant depuis les paramètres de la requête
    if (!id_etu) {
        return res.status(400).json({ error: 'ID de l\'étudiant est requis' });
    }

    connection.query('DELETE FROM etudiant WHERE id_etu = ?', [id_etu], (err, rows) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'étudiant:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else if (rows.affectedRows === 0) {
            // Aucun étudiant n'a été supprimé, ID non trouvé
            res.status(404).json({ message: 'Étudiant non trouvé' });
        } else {
            console.log('Étudiant supprimé avec succès');
            res.json({ message: 'Étudiant supprimé avec succès' });
        }
    });
}



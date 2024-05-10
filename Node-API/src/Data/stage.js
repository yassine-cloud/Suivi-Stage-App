const connection = require('../Data/Connection');

exports.getStages = async (req, res) => {
    connection.query('SELECT s.*,e.*,e.nom as nom_ent,et.* FROM entreprise e join stage s on e.id_ent=s.id_ent join etudiant et on s.id_etu=et.id_etu where id_enc is not null', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getNAStages = async (req, res) => {
    connection.query('SELECT s.*,e.*,e.nom as nom_ent,et.* FROM entreprise e join stage s on e.id_ent=s.id_ent join etudiant et on s.id_etu=et.id_etu where id_enc is  null', (err, rows) => {
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

    exports.getStagiaire = async (req, res) => {
        const encadreurId = req.params.id;
        connection.query(' SELECT e.nom, e.prenom FROM etudiant e JOIN stage st ON e.id_etu = st.id_etu WHERE st.id_enc = ? AND st.valide IS NULL', [encadreurId], (err, rows) => {
            console.log(encadreurId)
            if (err) throw err;
            console.log('Data received from Db:');
            console.log(rows);
            res.send(rows);
        });
        
    }

    exports.getStagiaireJur = async (req, res) => {
        const encadreurId = req.params.id;
        connection.query(' SELECT e.nom, e.prenom FROM etudiant e JOIN stage st ON e.id_etu = st.id_etu join jurie j on j.id_stg = st.id_stg WHERE st.id_enc = ? AND st.valide IS NULL', [encadreurId], (err, rows) => {
            console.log(encadreurId)
            if (err) throw err;
            console.log('Data received from Db:');
            console.log(rows);
            res.send(rows);
        });
        
    }




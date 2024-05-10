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
    connection.query('SELECT o.*, d.* , e.* FROM offre_stage o join depot_stage d on o.id_os=d.id_os join etudiant e on d.id_etu=e.id_etu WHERE id_ent = ?', [entrepriseId], (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
    
}


exports.getDepots = async (req, res) => {
    connection.query('SELECT * FROM depot_stage', (err, rows) => {
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

// get offre with status to determine if the etudiant can apply or not
exports.getOffreEtudiant = async (req, res) => {
    const id_etu = req.body.id_etu;
    // connection.query('SELECT * FROM depot_stage WHERE id_etu = ?', [id_etu], (err, rows) => {
    connection.query('SELECT o.*,e.* FROM offre_stage o join entreprise e on e.id_ent=o.id_ent', (err, rows1) => {
        if (err) throw err;
        connection.query('select id_os , status from depot_stage where id_etu = ?', [id_etu], (err, rows2) => {
            if (err) throw err;
            // console.log('Data received from Db:');
            // console.log(rows1);
            // console.log(rows2);
            if(rows2.length > 0){
                rows1.forEach( offre => {
                    offre.canDepos = true;
                    rows2.forEach( dep => {
                        if(offre.id_os == dep.id_os){
                            offre.canDepos = false;
                            offre.depotStatus = dep.status;
                            
                        }
                    })
                })
            }
            else{
                rows1.forEach( offre => {
                    offre.canDepos = true;
                })
            }
            console.log('Data received from Db:');
            console.log(rows1);
            res.send(rows1);
        })

        
    });

    exports.deleteDepot = async (req, res) => {
        const id_ds = req.query.id_ds; // Récupérer l'ID de l'étudiant depuis les paramètres de la requête
        if (!id_ds) {
            return res.status(400).json({ error: 'ID de depot est requis' });
        }
    }
}
    


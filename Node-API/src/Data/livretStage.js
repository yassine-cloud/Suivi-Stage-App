const connection = require('../Data/Connection');

exports.getLivretStage = async (req, res) => {
    try {
        let data = req.body;
        let rows = await new Promise((resolve, reject) => {
            connection.query('SELECT s.*, ent.* FROM stage s JOIN entreprise ent ON s.id_ent = ent.id_ent WHERE s.id_etu = ?', [data.id_etu], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });

        for (let i = 0; i < rows.length; i++) {
            let [juries, livret_stage] = await Promise.all([
                new Promise((resolve, reject) => {
                    connection.query("SELECT id_enc FROM jurie WHERE id_stg = ?", [rows[i].id_stg], (err, result) => {
                        if (err) reject(err);
                        resolve(result.map(jury => jury.id_enc));
                    });
                }),
                new Promise((resolve, reject) => {
                    connection.query("SELECT * FROM livret_stage WHERE id_stg = ? ORDER BY date", [rows[i].id_stg], (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                })
            ]);

            rows[i].juries = juries;
            rows[i].livret_stage = livret_stage;
        }

        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
};


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
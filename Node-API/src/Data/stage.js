const connection = require('../Data/Connection');


exports.affecterJurie = async(req,res) => {
    // les valeurs de data sont : id_stg, date_sout,  juries : tableau des id_enc
    let data = req.body;
    if(data.date_sout && data.id_stg && data.juries && data.juries.length > 0 && data.juries.length < 4){

        if(data.juries.length > 1  ){
            for (let i = 0; i < data.juries.length; i++) {
                for (let j = i+1; j < data.juries.length; j++) {
                    if(data.juries[i] === data.juries[j]){
                        res.status(400).send('il faut choisir des juries differents');
                        console.log('il faut choisir des juries differents');
                    }
                }
            }
        }
        connection.query('update stage set date_sout = ? where id_stg = ?', [data.date_sout, data.id_stg], (err, rows) => {
            if (err) throw err;
            connection.query('select * from jurie where id_stg = ?', [data.id_stg], (err, rows) => {
                if (err) throw err;
                if(rows.length > 0){
                    connection.query('delete from jurie where id_stg = ?', [data.id_stg], (err, rows) => {
                        if (err) throw err;
                        for (let i = 0; i < data.juries.length; i++) {
                            connection.query('insert into jurie(id_enc, id_stg) values(?,?)', [data.juries[i], data.id_stg], (err, rows) => {
                                if (err) throw err;
                            });
                        }
                        res.status(200).json({ message : 'affected'});
                        console.log('affected');
                    });
                }
                else{
                    for (let i = 0; i < data.juries.length; i++) {
                        connection.query('insert into jurie(id_enc, id_stg) values(?,?)', [data.juries[i], data.id_stg], (err, rows) => {
                            if (err) throw err;
                        });
                    }
                    res.status(200).json({ message : 'affected'});
                }
            });

        });
    }
    else{
        res.status(400).send('Invalid data');
    }
}

exports.affecterNoteSout = async(req,res) => {
    let data = req.body;
    if(data.note && data.id_stg && data.note >= 0 && data.note <= 20){
        if(data.note >= 10 ){
            data.valide = true;
        }
        else{
            data.valide = false;
        }
        connection.query('update stage set note = ? , valide = ? where id_stg = ?', [data.note,data.valide , data.id_stg], (err, rows) => {
            if (err) throw err;
            res.status(200).json({ message : 'affected'});
        });
    }
    else{
        res.status(400).send('Invalid data');
    }
}

exports.getStages = async (req, res) => {
    connection.query('SELECT s.*,e.*,e.nom as nom_ent,et.* FROM entreprise e join stage s on e.id_ent=s.id_ent join etudiant et on s.id_etu=et.id_etu', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:');
        console.log(rows);
        res.send(rows);
    });
}

exports.getStagesNonNote = async (req, res) => {
    connection.query('SELECT s.*,e.*,e.nom as nom_ent,et.* FROM entreprise e join stage s on e.id_ent=s.id_ent join etudiant et on s.id_etu=et.id_etu where note is null', (err, rows) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {

            connection.query("select id_enc from jurie where id_stg = ?", [rows[i].id_stg], (err, result) => {
                if (err) throw err;
                rows[i].juries = result.map(jury => jury.id_enc);            
                console.log('Data received from Db:');
                console.log(rows);
                if (i === rows.length - 1) {
                    res.send(rows);
                }
            });
        }
    });
}

exports.getStagesNote = async (req, res) => {
    connection.query('SELECT s.*,e.*,e.nom as nom_ent,et.* FROM entreprise e join stage s on e.id_ent=s.id_ent join etudiant et on s.id_etu=et.id_etu where note is not null', (err, rows) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {

            connection.query("select id_enc from jurie where id_stg = ?", [rows[i].id_stg], (err, result) => {
                if (err) throw err;
                rows[i].juries = result.map(jury => jury.id_enc);            
                console.log('Data received from Db:');
                console.log(rows);
                if (i === rows.length - 1) {
                    res.send(rows);
                }
            });
        }
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



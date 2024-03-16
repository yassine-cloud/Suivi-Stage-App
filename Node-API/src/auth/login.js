const bcrypt = require('bcrypt');
const jwt = require('./JWTconf');
const connection = require('../Data/Connection');
const { log } = require('console');



exports.login = async (req, res) => {
    // req contains the email and password
    console.log("Login request");
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).send('Invalid email or password');
    }

    if (email === 'admin@isetr.tn' && password === 'admin') {
        try {
            const token = jwt.createToken({ name: 'admin', email });
            console.log("Admin Connected");
            // return res.status(200).send(token);
            return res.header('auth-token', token).json({ token, user: {nom : 'admin' , role: 'admin' , email} });
        } catch (err) {
            console.error(err);
            return res.status(400).send('Invalid email or password');
        }
    }

    try {
        const user = await searchUser(email);

        if (user !== null) {
            const hashedPassword = user.data.password;
            if (await bcrypt.compare(password, hashedPassword)) {
                const token = jwt.createToken({ name: user.data.nom, email });
                console.log("User Connected");
                return res.header('auth-token', token).json({ token, user: user.data });
            } else {
                console.log("Invalid password");
                return res.status(400).send('Invalid password');
            }
        } else {
            return res.status(400).send('Invalid email or password');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

 async function searchUser(email) {
    try {
        let dt = ['etudiant', 'entreprise', 'encadrant'];
        let returned = null;

        await Promise.all(dt.map(async (role) => {
            try {
                const rows = await new Promise((resolve, reject) => {
                    connection.query('SELECT * FROM ' + role ,  (err, rows) => {
                        if (err) {
                            console.log("There is an error in select: " + err);
                            reject(err);
                        } else {
                            resolve(rows);
                        }
                    });
                });
                if (rows.length > 0) {
                    for (let j = 0; j < rows.length; j++) {
                        if(rows[j].email === email){
                            console.log( "request to connect to "+email);
                            returned = { data: rows[j], role: role };
                        }
                        // console.log(JSON.stringify(rows[j]) + " " + role + " " + email);
                    }
                }
            } catch (error) {
                console.log("Error in query:", error);
            }
        }));
        
        return returned; // Return null if no matching user found in any table


    } catch (error) {
        console.log(error);
        return null;
    }
}

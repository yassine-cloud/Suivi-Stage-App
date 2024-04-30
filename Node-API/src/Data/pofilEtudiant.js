const connection = require('../Data/Connection');
const multer = require('multer');
const fs = require('fs');

// Path where the PDF files will be stored
const PDFLocation = "assets/PDF"; // it starts from the index file

// Parameters for storing the PDF files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PDFLocation)
    },
    filename: (req, file, cb) => {
        cb(null,'Etudiant'+ Date.now() + '--' + file.originalname)
    }
  })

  const upload = multer({storage: fileStorageEngine});


// Handle file upload
  exports.handleFile = async (req, res) => {
    upload.single('cv')(req, res, (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(400).send('Error uploading file');
        }

        const cvFile = req.file;

        // Check if a file was uploaded
        if (!cvFile) {
            return res.status(400).send('No CV file uploaded');
        }
        if ( cvFile.mimetype !== 'application/pdf') {
            return res.status(400).send('File is not a PDF');
        }

        const id_etu = req.body.id_etu;
        console.log( "Updating cv Etudiant " +id_etu);

        // Check if cv column is null in the database
        const selectSql = 'SELECT cv FROM etudiant WHERE id_etu = ?';
        connection.query(selectSql, [id_etu], (err, result) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).send('Error querying database');
            }

            // If cv column is not null, delete the corresponding file
            if (result[0].cv) {
                const filePath = PDFLocation + "/" + result[0].cv;
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return res.status(500).send('Error deleting file');
                    }
                    console.log('Etudiant old cv Deleted Successfully');
                });
            }

            // Update cv column in the database
            const updateSql = 'UPDATE etudiant SET cv = ? WHERE id_etu = ?';
            connection.query(updateSql, [cvFile.filename, id_etu], (err, result) => {
                if (err) {
                    console.error('Error updating database:', err);
                    return res.status(500).send('Error updating database');
                }
                console.log('Etudiant cv Updated Successfully');
                res.status(200).json({ message: 'CV uploaded and stored successfully' , cv : cvFile.filename});
            });
        });
    });
};



// Download file 
exports.downloadFile = async (req, res) => {
    const id_etu = req.body.id_etu;
    
    // Get cv column from the database
    const selectSql = 'SELECT cv FROM etudiant WHERE id_etu = ?';
    connection.query(selectSql, [id_etu], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error querying database');
        }
        
        // If cv column is null or no result found, return 404
        if (!result || result.length === 0 || !result[0].cv) {
            return res.status(404).send('CV not found');
        }
        
        // Download the file
        const cvFile = result[0].cv;
        const filePath = PDFLocation + "/" + cvFile;
        
        // Send the file as an attachment
        res.download(filePath, cvFile, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).send('Error downloading file');
            }
            console.log("Download PDF Etudiant Completed");
        });
    });
};
                
                // Download file
                // exports.downloadFile = async (req, res) => {
                //     const id_etu = req.body.id_etu;
                
                //     // Get cv column from the database
                //     const selectSql = 'SELECT cv FROM etudiant WHERE id_etu = ?';
                //     connection.query(selectSql, [id_etu], (err, result) => {
                //         if (err) {
                //             console.error('Error querying database:', err);
                //             return res.status(500).send('Error querying database');
                //         }
                
                //         // If cv column is null, return 404
                //         if (!result[0].cv) {
                //             return res.status(404).send('CV not found');
                //         }
                
                //         // Download the file
                //         const cvFile = result[0].cv;
                //         const filePath = PDFLocation + "/" + cvFile;
                //         fs.readFile(filePath, (err, data) => {
                //             if (err) {
                //                 console.error('Error reading file:', err);
                //                 return res.status(500).send('Error reading CV file');
                //             }
                            
                //             res.download(filePath, cvFile);
                //         });
                //     });
                // };
                
                
                
                // exports.downloadFile = async (req, res) => {
                //     const id_etu = req.body.id_etu;
                
                
                    
                
                
                
                //     // Get cv column from the database
                //     const selectSql = 'SELECT cv FROM etudiant WHERE id_etu = ?';
                //     connection.query(selectSql, [id_etu], (err, result) => {
                //         if (err) {
                //             console.error('Error querying database:', err);
                //             return res.status(500).send('Error querying database');
                //         }
                
                //         // If cv column is null, return 404
                //         if (!result[0].cv) {
                //             return res.status(404).send('CV not found');
                //         }
                
                //         // Download the file
                //         const cvFile = result[0].cv;
                //         const filePath = PDFLocation + "/" + cvFile;
                
                //         const file = fs.createWriteStream(filePath);
                //         res.pipe(file);
                
                //         // after download completed close filestream
                //         file.on("finish", () => {
                //             file.close();
                //             console.log("Download Completed");
                //         });
                
                        
                //     });
                // };

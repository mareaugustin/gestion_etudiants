
const EtudiantController = {
    ajouterEtudiant : (req, res) => {

        const {nom, prenom, age, telephone, sexe, email} = req.body

        const userQuery = 'SELECT id FROM users WHERE email = ?';
        req.db.query(userQuery, [email], (error, user)=>{
            if(error){
                return res.status(500).json({ error: error.message});
            }

            if(user.length === 0){
                return res.json({
                    success: false,
                    message: 'Utilisateur inexistant'
                })
            }

            const userFind = user[0]
        
            const telphoneQuery = 'SELECT id FROM etudiants WHERE telephone = ?';
            req.db.query(telphoneQuery, [telephone], (error, resultTel)=>{
                if(error){
                    return res.status(500).json({ error: error.message});
                }

                if(resultTel.length > 0){
                    return res.status(409).json({
                        success: false,
                        message: 'Telephone déjà associé à un etudiant'
                    })
                }

                const ajoutQuery = 'INSERT INTO etudiants (nom, prenom, age, telephone, sexe, userId) VALUES (?, ?, ?, ?, ?, ?)';
                req.db.query(ajoutQuery, [nom, prenom, age, telephone, sexe, userFind.id], (error, result) =>{
                    if(error){
                        return res.status(500).json({ error: error.message});
                    }

                    const reponse = 'SELECT nom, prenom, age, telephone, sexe, created_at FROM etudiants WHERE id = ?';
                    req.db.query(reponse, [result.insertId], (error, etudiants)=>{
                        if(error){
                            return res.status(500).json({ error: error.message});
                        }

                        return res.status(201).json({
                            success: true,
                            message: 'Etudiant ajouté avec succès',
                            data: etudiants[0]
                        })
                    })
                })
            })
            
        })
    },

    listEtudiant : (req, res) => {

        const email = req.params.email

        const userQuery = 'SELECT id FROM users WHERE email = ?';
        req.db.query(userQuery, [email], (error, user)=>{
            if(error){
                return res.status(500).json({ error: error.message});
            }

            if(user.length === 0){
                return res.json({
                    success: false,
                    message: 'Utilisateur non authentifié'
                })
            }

            const userId = user[0]

            const listQuery = 'SELECT * FROM etudiants e WHERE e.userId = ?';
            req.db.query(listQuery, [userId.id], (error, listes) =>{
                if(error){
                    return res.status(500).json({ error: error.message})
                }

                return res.status(200).json({
                    success: true,
                    data: listes,
                    total: listes.length
                })
            })
        })
    },

    supprimerEtudiant: (req, res) => {

        const {id} = req.params

        const etudiantDelete = 'DELETE FROM etudiants WHERE id = ?';
        req.db.query(etudiantDelete, [id], (error, result)=>{
            if(error){
                return res.status(500).json({error: error.message})
            }

            return res.status(200).json({
                success: true,
                message: 'Etudiant supprimé avec succès',
            })
        })
    },

    modifierEtudiant: (req, res) => {
        const {nom, prenom, age, telephone, sexe} = req.body
        const {id} = req.params

        const modifQuery = 'UPDATE etudiants SET nom = ? , prenom = ? , age = ? , telephone = ? , sexe = ? WHERE id = ?';
        req.db.query(modifQuery, [nom, prenom, age, telephone, sexe, id], (error, result)=> {
            if(error){
                return res.status(500).json({error: error.message})
            }

            if(result.affectedRows === 0){
                return res.status(404).json({
                    success: false,
                    message: 'Aucun etudiant trouvé'
                })
            }

            const query = 'SELECT nom, prenom, age, telephone, sexe FROM etudiants WHERE id = ?';
            req.db.query(query, [id], (error, results)=>{
                if(error){
                    return res.status(500).json({error: error.message})
                }

                return res.status(200).json({
                    success: true,
                    message: 'Etudiant modifié avec succes',
                    data: results[0]
                })
            })
            
        })
         
    }
}


module.exports = EtudiantController
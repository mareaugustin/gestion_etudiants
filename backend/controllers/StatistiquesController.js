

const StatistiquesController = {

    totalEtudiantByUser : (req, res)=>{

        const {email} = req.params

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

            const totalQuery = 'SELECT COUNT(id) AS total FROM etudiants e WHERE e.userId = ?';
            req.db.query(totalQuery, [userId.id], (error, results)=>{

                if(error){
                    return res.status(500).json({error: error.message})
                }

                const total = results[0].total

                const totalQuery = `SELECT COUNT(*) AS totalHomme FROM etudiants e WHERE e.userId = ? AND sexe = 'M'`;
                req.db.query(totalQuery, [userId.id], (error, results)=>{

                    if(error){
                        return res.status(500).json({error: error.message})
                    }

                    const totalHomme = results[0].totalHomme

                    const totalQuery = `SELECT COUNT(*) AS totalFemme FROM etudiants e WHERE e.userId = ? AND sexe = 'F'`;
                    req.db.query(totalQuery, [userId.id], (error, results)=>{

                        if(error){
                            return res.status(500).json({error: error.message})
                        }
                

                        return res.status(200).json({
                            success: true,
                            data : {
                                total,
                                totalHomme,
                                totalFemme: results[0].totalFemme
                            }
                        })
                    })
                })

            })

            
        })
    },

    // totalHomme : (req, res)=>{

    //     const {email} = req.params

    //     const userQuery = 'SELECT id FROM users WHERE email = ?';
    //     req.db.query(userQuery, [email], (error, user)=>{
    //         if(error){
    //             return res.status(500).json({ error: error.message});
    //         }

    //         if(user.length === 0){
    //             return res.json({
    //                 success: false,
    //                 message: 'Utilisateur non authentifié'
    //             })
    //         }

    //         const userId = user[0]

    //         const totalQuery = `SELECT COUNT(*) AS totalHomme FROM etudiants e WHERE e.userId = ? AND sexe = 'M'`;
    //         req.db.query(totalQuery, [userId.id], (error, results)=>{

    //             if(error){
    //                 return res.status(500).json({error: error.message})
    //             }



    //             return res.status(200).json({
    //                 success: true,
    //                 data : results[0]
    //             })
    //         })

            
    //     })
    // },

    // totalFemme : (req, res)=>{

    //     const {email} = req.params

    //     const userQuery = 'SELECT id FROM users WHERE email = ?';
    //     req.db.query(userQuery, [email], (error, user)=>{
    //         if(error){
    //             return res.status(500).json({ error: error.message});
    //         }

    //         if(user.length === 0){
    //             return res.json({
    //                 success: false,
    //                 message: 'Utilisateur non authentifié'
    //             })
    //         }

    //         const userId = user[0]

    //         const totalQuery = `SELECT COUNT(*) AS totalFemme FROM etudiants e WHERE e.userId = ? AND sexe = 'F'`;
    //         req.db.query(totalQuery, [userId.id], (error, results)=>{

    //             if(error){
    //                 return res.status(500).json({error: error.message})
    //             }

    //             return res.status(200).json({
    //                 success: true,
    //                 data : results[0]
    //             })
    //         })

            
    //     })
    // },
}

module.exports = StatistiquesController;
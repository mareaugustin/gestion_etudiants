
const bcrypt = require('bcryptjs')

const UserController = {

    register : (req, res)=>{
        const {email, password} = req.body;

        const emailExistant = 'SELECT id FROM users WHERE email = ?';
        req.db.query(emailExistant, [email], async (error, results)=>{
            if(error){
                return res.status(500).json({error: error.message})
            }
            if(results.length > 0){
                return res.status(409).json({
                    success: false,
                    message: 'Cet email est déjà utilisé'
                })
            }
        

            const hashPassword = await bcrypt.hash(password, 10)

            const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
            
            req.db.query(query, [email, hashPassword], (error, result) =>{
                if(error){
                    return res.status(500).json({error: error.message});
                }

                req.db.query('SELECT email, created_at FROM users WHERE id = ?', [result.insertId], (error, users) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                
                    res.status(201).json({
                        success : true,
                        message: 'Inscription réussie',
                        data: users[0]
                    });
                });
            });
        });
    },

    login: (req, res) =>{

        const {email, password} = req.body

        const veriferInfo = 'SELECT id, email, password FROM users WHERE email = ?'

        req.db.query(veriferInfo, [email], async(error, results)=>{
            
            if(error){
                return res.status(500).json({error: error.message})
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Informations incorrectes'
                });
            }

            const result = results[0]

            const passwordValid = await bcrypt.compare(password, result.password)

            if (!passwordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Mot de passe incorrect'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Connexion réussie',
                data: {
                    id: result.id,
                    email: result.email
                }
            });
        })
    }
};


module.exports = UserController;
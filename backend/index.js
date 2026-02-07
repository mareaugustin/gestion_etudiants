const express = require('express');
const mysql = require('mysql2')
const cors = require('cors')
const app = express();
const config = require('./config/db')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(config.db)

db.connect((error)=> {
    if (error) {
        console.error('❌ Erreur de connexion à la base de données:', error.message);
        process.exit(1);
    }
    console.log('✅ Connecté à la base de données MySQL');
});


app.use((req, res, next)=>{
    req.db = db
    next()
})

app.use('/api', require('./routes/api'))

app.get('/test',(req, res)=>{
    res.json({
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
})

app.use((err, req, res, next) => {
    console.error('❌ Erreur:', err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Erreur interne du serveur',
        message: err.message 
    });
});

// Gestion des routes 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

const PORT = config.server.port
app.listen(PORT, ()=>{
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 API disponible sur http://localhost:${PORT}/api`);
})

module.exports = app;
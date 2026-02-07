const express = require('express')
const router = express.Router()
const EtudiantController = require('../controllers/EtudiantController')
const UserController = require('../controllers/UserController')
const {Inscription} = require('../middleware/Inscription')
const {AjoutValidation} = require('../middleware/AjoutValidation')

//Authentification
router.post('/register', Inscription, UserController.register);
router.post('/login', Inscription, UserController.login);

// Route Etudiants CRUD
router.get('/liste/:email', EtudiantController.listEtudiant);
router.post('/ajouter', AjoutValidation, EtudiantController.ajouterEtudiant);
router.put('/modifier/:id', EtudiantController.modifierEtudiant);
router.delete('/supprimer/:id', EtudiantController.supprimerEtudiant);



module.exports = router;
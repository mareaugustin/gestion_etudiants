
function AjoutValidation(req, res, next){
    const {nom, prenom, age, telephone, sexe} = req.body
    const errors = []

    if(!nom || nom.length <= 1){
        errors.push('Entrez un nom valide, 2 caractères minimum')
    }

    if(!prenom || prenom.length <= 1){
        errors.push('Entrez un prenom valide, 2 caractères minimum')
    }

    if(!age || age <= 0  || age > 100 ){
        errors.push('Entrez un age valide')
    }

    if(!telephone){
        errors.push('Entrez un numero de telephone')
    }

    if(!sexe){
        errors.push('Entrez un genre')
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = {AjoutValidation}
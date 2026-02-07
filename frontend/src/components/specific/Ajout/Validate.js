import React from "react";

export function Validate(nom,prenom, age,tel, sexe){
    if(!nom.trim() || nom.length <= 1) return false
    if(!prenom.trim() || prenom.length <= 1) return false
    if(!age || age <= 0 || age > 100) return false
    if(!tel) return false
    if(!sexe || sexe.length !== 1) return false

    return true
}
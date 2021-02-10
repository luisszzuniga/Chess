class Pion {
    constructor(nom, couleur) {
        this.nom = nom;
        this.couleur = couleur;
        this.tourJouer = 1;
    }

    roiSafe(depart, arrive) {
        var tempGrille = [];
        for(var i = 0; i <= 63; i++) {
            tempGrille[i] = echecs.grille[i];
        }

        if(tempGrille[arrive].nom) {
            tempGrille[arrive] = tempGrille[depart];
            tempGrille[depart] = new Pion();
        }
        else {
            var temp = tempGrille[arrive];
            tempGrille[arrive] = tempGrille[depart];
            tempGrille[depart] = temp;  
        }

        var posRoi;
        for(var i = 0; i <= 63; i++) {
            if(tempGrille[i] && tempGrille[i].nom && tempGrille[i].couleur && tempGrille[i].nom == "ROI" && tempGrille[i].couleur == echecs.tour) {
                posRoi = i;
            }
        }

        for(i = 0; i <= 63; i++) {
            if(tempGrille[i] && tempGrille[i].couleur && tempGrille[i].couleur != echecs.tour) {
                if (tempGrille[i].check(i, posRoi, tempGrille)) {
                    alert('Roi ' + echecs.tour + ' en échec !');
                    return false;
                }
            }
        }

        return true;
    }
}

class Tour extends Pion {
    constructor(nom, couleur) {
        super(nom, couleur);
        this.deplacements = [-10, 10, -1, 1];
        if(this.couleur == "blanc") {
            this.url = 'img/tourblanc.png';
        }
        else {
            this.url = 'img/tournoir.png';
        }
    }

    check(depart, arrive, grille) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            for(var n = 1; n <= 8; n++) {
                var test = echecs.tab120[echecs.tab64[depart] + i * n];
                if (test != -1) {
                    this.deplacementsPossibles.push(test);
                    if(grille[echecs.tab120[echecs.tab64[depart] + i *n]]) {
                        if(grille[echecs.tab120[echecs.tab64[depart] + i *n]].nom) {
                            break;
                        }
                    }
                }
            }
        }
        var valable = this.deplacementsPossibles.find(element => element == arrive);

        if (valable != undefined) {
            return true;
        }
    }

    getDeplacements(depart) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            for(var n = 1; n <= 8; n++) {
                var test = echecs.tab120[echecs.tab64[depart] + i * n];
                if (test != -1) {
                    this.deplacementsPossibles.push(test);
                    if(echecs.grille[echecs.tab120[echecs.tab64[depart] + i *n]]) {
                        if(echecs.grille[echecs.tab120[echecs.tab64[depart] + i *n]].nom) {
                            break;
                        }
                    }
                }
            }
        }

        if(this.deplacementsPossibles) {
            return this.deplacementsPossibles;
        }
    }
}

class Fou extends Pion {
    constructor(nom, couleur) {
        super(nom, couleur);
        this.deplacements = [-11, 11, -9, 9];
        if(this.couleur == "blanc") {
            this.url = 'img/foublanc.png';
        }
        else {
            this.url = 'img/founoir.png';
        }
    }

    check(depart, arrive, grille) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            for(var n = 1; n <= 8; n++) {
                var test = echecs.tab120[echecs.tab64[depart] + i * n];
                if (test != -1) {
                    this.deplacementsPossibles.push(test);
                    if(grille[echecs.tab120[echecs.tab64[depart] + i *n]]) {
                        if(grille[echecs.tab120[echecs.tab64[depart] + i *n]].nom) {
                            break;
                        }
                    }
                }
            }
        }
        var valable = this.deplacementsPossibles.find(element => element == arrive);

        if (valable != undefined) {
            return true;
        }
    }

    getDeplacements(depart) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            for(var n = 1; n <= 8; n++) {
                var test = echecs.tab120[echecs.tab64[depart] + i * n];
                if (test != -1) {
                    this.deplacementsPossibles.push(test);
                    if(echecs.grille[echecs.tab120[echecs.tab64[depart] + i *n]]) {
                        if(echecs.grille[echecs.tab120[echecs.tab64[depart] + i *n]].nom) {
                            break;
                        }
                    }
                }
            }
        }

        if(this.deplacementsPossibles) {
            return this.deplacementsPossibles;
        }
    }
}

class Cavalier extends Pion {
    constructor(nom, couleur) {
        super(nom, couleur);
        this.deplacements = [-12, -21, -19, -8, 12, 21, 19, 8];
        if(this.couleur == "blanc") {
            this.url = 'img/chevalblanc.png';
        }
        else {
            this.url = 'img/chevalnoir.png';
        }
    }

    check(depart, arrive, grille) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            var test = echecs.tab120[echecs.tab64[depart] + i];
            if (test != -1) {
                this.deplacementsPossibles.push(test);
            }
            
        }
        var valable = this.deplacementsPossibles.find(element => element == arrive);

        if (valable != undefined) {
            return true;
        }
    }

    getDeplacements(depart) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            var test = echecs.tab120[echecs.tab64[depart] + i];
            if (test != -1) {
                this.deplacementsPossibles.push(test);
            }
            
        }

        if(this.deplacementsPossibles) {
            return this.deplacementsPossibles;
        }
    }
}

class Roi extends Pion {
    constructor(nom, couleur) {
        super(nom, couleur);
        this.deplacements = [-11, 11, -9, 9, -1, 1, 10, -10];
        if(this.couleur == "blanc") {
            this.url = 'img/roiblanc.png';
        }
        else {
            this.url = 'img/roinoir.png';
        }
    }

    check(depart, arrive, grille) {
        
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            var test = echecs.tab120[echecs.tab64[depart] + i];
            if (test != -1) {
                this.deplacementsPossibles.push(test);
            }
        }
        var valable = this.deplacementsPossibles.find(element => element == arrive);

        if (valable) {
            return true;
        }
    }

    getDeplacements(depart) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            var test = echecs.tab120[echecs.tab64[depart] + i];
            if (test != -1) {
                this.deplacementsPossibles.push(test);
            }
        }

        if(this.deplacementsPossibles) {
            return this.deplacementsPossibles;
        }
    }
}

class Reine extends Pion {
    constructor(nom, couleur) {
        super(nom, couleur);
        this.deplacements = [-11, 11, -9, 9, -1, 1, 10, -10];
        if(this.couleur == "blanc") {
            this.url = 'img/reineblanc.png';
        }
        else {
            this.url = 'img/reinenoir.png';
        }
    }

    check(depart, arrive, grille) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            for(var n = 1; n <= 8; n++) {
                var test = echecs.tab120[echecs.tab64[depart] + i * n];
                if (test != -1) {
                    this.deplacementsPossibles.push(test);
                    if(grille[echecs.tab120[echecs.tab64[depart] + i *n]]) {
                        if(grille[echecs.tab120[echecs.tab64[depart] + i *n]].nom) {
                            break;
                        }
                    }
                }
            }
        }
        var valable = this.deplacementsPossibles.find(element => element == arrive);

        if (valable != undefined) {
            return true;
        }
    }

    getDeplacements(depart) {
        this.deplacementsPossibles = [];
        for(var i of this.deplacements) {
            for(var n = 1; n <= 8; n++) {
                var test = echecs.tab120[echecs.tab64[depart] + i * n];
                if (test != -1) {
                    this.deplacementsPossibles.push(test);
                    if(echecs.grille[echecs.tab120[echecs.tab64[depart] + i *n]]) {
                        if(echecs.grille[echecs.tab120[echecs.tab64[depart] + i *n]].nom) {
                            break;
                        }
                    }
                }
            }
        }
        if(this.deplacementsPossibles) {
            return this.deplacementsPossibles;
        }
    }
}

class Soldat extends Pion {
    constructor(nom, couleur) {
        super(nom, couleur);
        if(this.couleur == "blanc") {
            this.url = 'img/petitblanc.png';
            this.deplacements = [-10];
            this.kills = [-9, -11];
        }
        else {
            this.url = 'img/petitnoir.png';
            this.deplacements = [10];
            this.kills = [9, 11];
        }
    }

    check(depart, arrive, grille) {
        this.deplacementsPossibles = [];
        this.longueurDeplacement = 2;
        if(this.tourJouer > 1) {
            this.longueurDeplacement = 1;
        }
        for(var i of this.deplacements) {
            for(var n = 1; n <= this.longueurDeplacement; n++) {
                var test = echecs.tab120[echecs.tab64[depart] + i * n];
                if (test != -1) {
                    
                    if(grille[echecs.tab120[echecs.tab64[depart] + i *n]]) {
                        if(grille[echecs.tab120[echecs.tab64[depart] + i *n]].nom) {
                            break;
                        }
                    }
                    this.deplacementsPossibles.push(test);
                }
            }
        }
        
        for(var i of this.kills) {
            var test = echecs.tab120[echecs.tab64[depart] + i];
            if (test != -1) {
                if(grille[echecs.tab120[echecs.tab64[depart] + i]] && grille[echecs.tab120[echecs.tab64[depart] + i]].nom) {
                    this.deplacementsPossibles.push(test);
                }
            }
        }

        

        var valable = this.deplacementsPossibles.find(element => element == arrive);

        if (valable != undefined) {
            return true;
        }
    }

    getDeplacements(depart) {
        this.killsPossibles = [];

        for(var i of this.kills) {
            var test = echecs.tab120[echecs.tab64[depart] + i];
            if (test != -1) {
                if(echecs.grille[echecs.tab120[echecs.tab64[depart] + i]] && echecs.grille[echecs.tab120[echecs.tab64[depart] + i]].nom) {
                    this.killsPossibles.push(test);
                }
            }
        }

        if(this.killsPossibles) {
            return this.killsPossibles;
        }
    }
}



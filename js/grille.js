class Echiquier {
    constructor() {
        this.tour = "blanc";
        this.grille = [];
        for(var i = 16; i<= 47; i++) {
        this.grille[i] = new Pion();
        }

        //Noirs
        this.grille[0] = new Tour("TOUR", "noir");
        this.grille[1] = new Cavalier("CAVALIER", "noir");
        this.grille[2] = new Fou("FOU", "noir");
        this.grille[3] = new Reine("REINE", "noir");
        this.grille[4] = new Roi("ROI", "noir");
        this.grille[5] = new Fou("FOU", "noir");
        this.grille[6] = new Cavalier("CAVALIER", "noir");
        this.grille[7] = new Tour("TOUR", "noir");
        this.grille[8] = new Soldat("SOLDAT", "noir");
        this.grille[9] = new Soldat("SOLDAT", "noir");
        this.grille[10] = new Soldat("SOLDAT", "noir");
        this.grille[11] = new Soldat("SOLDAT", "noir");
        this.grille[12] = new Soldat("SOLDAT", "noir");
        this.grille[13] = new Soldat("SOLDAT", "noir");
        this.grille[14] = new Soldat("SOLDAT", "noir");
        this.grille[15] = new Soldat("SOLDAT", "noir");

        //Blancs
        this.grille[48] = new Soldat("SOLDAT", "blanc");
        this.grille[49] = new Soldat("SOLDAT", "blanc");
        this.grille[50] = new Soldat("SOLDAT", "blanc");
        this.grille[51] = new Soldat("SOLDAT", "blanc");
        this.grille[52] = new Soldat("SOLDAT", "blanc");
        this.grille[53] = new Soldat("SOLDAT", "blanc");
        this.grille[54] = new Soldat("SOLDAT", "blanc");
        this.grille[55] = new Soldat("SOLDAT", "blanc");
        this.grille[56] = new Tour("TOUR", "blanc");
        this.grille[57] = new Cavalier("CAVALIER", "blanc");
        this.grille[58] = new Fou("FOU", "blanc");
        this.grille[59] = new Reine("REINE", "blanc");
        this.grille[60] = new Roi("ROI", "blanc");
        this.grille[61] = new Fou("FOU", "blanc");
        this.grille[62] = new Cavalier("CAVALIER", "blanc");
        this.grille[63] = new Tour("TOUR", "blanc");


        this.tab120 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                       -1,  0,  1,  2,  3,  4,  5,  6,  7, -1,
                       -1,  8,  9, 10, 11, 12, 13, 14, 15, -1,
                       -1, 16, 17, 18, 19, 20, 21, 22, 23, -1,
                       -1, 24, 25, 26, 27, 28, 29, 30, 31, -1,
                       -1, 32, 33, 34, 35, 36, 37, 38, 39, -1,
                       -1, 40, 41, 42, 43, 44, 45, 46, 47, -1,
                       -1, 48, 49, 50, 51, 52, 53, 54, 55, -1,
                       -1, 56, 57, 58, 59, 60, 61, 62, 63, -1,
                       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

        this.tab64 = [21, 22, 23, 24, 25, 26, 27, 28,
                      31, 32, 33, 34, 35, 36, 37, 38,
                      41, 42, 43, 44, 45, 46, 47, 48,
                      51, 52, 53, 54, 55, 56, 57, 58,
                      61, 62, 63, 64, 65, 66, 67, 68,
                      71, 72, 73, 74, 75, 76, 77, 78, 
                      81, 82, 83, 84, 85, 86, 87, 88,
                      91, 92, 93, 94, 95, 96, 97, 98];  
        var blanc = true;
        var num = 0;
        for(var i = 0; i < 8; i++) {
            for(var n = 0; n < 8; n++) {
                var spot = document.createElement('div');
                spot.id = num;
                spot.setAttribute("onclick", "echecs.select(this)");
                num++;
                if(blanc == true) {
                    spot.classList += 'caseblanc';
                    blanc = false;
                }
                else {
                    spot.classList += 'casenoir';
                    blanc = true;
                }
                document.getElementById('grille').appendChild(spot);
            }
            if(blanc == true) {
                blanc = false;
            }
            else {
                blanc = true;
            }
        }
        this.selected = "";
    }


    tourSuivant() {
        if(this.tour == "blanc") {
            this.tour = "noir";
            
        }
        else {
            this.tour = "blanc";
        }
        document.getElementById('tour').innerHTML = "C'est le tour des: " + this.tour;
    }

    update() {
        for(var i = 0; i < this.grille.length; i++) {
            if(this.grille[i].nom !== undefined) {
                if(document.getElementById(i).innerHTML == "") {
                    var img = document.createElement('img');
                    img.src = this.grille[i].url;
                    document.getElementById(i).appendChild(img);
                }
                else {
                    document.getElementById(i).innerHTML = "";
                    var img = document.createElement('img');
                    img.src = this.grille[i].url;
                    document.getElementById(i).appendChild(img);
                }
               
            }
            else {
                document.getElementById(i).innerHTML = "";
            }
        }
    }


    select(elem) {
        if(this.selected == "") {
            if(this.grille[elem.id].nom !== undefined) {
                elem.classList.add("greenBg");
                this.selected = elem;
            }
        }
        else {
            this.selected.classList.remove("greenBg");
            this.move(this.selected.id, elem.id);
            this.selected = "";
        }
    }



    move(depart, arrive) {
        if(this.grille[depart].couleur == this.tour) {

            if(this.grille[depart].check(depart, arrive, this.grille) && this.grille[depart].roiSafe(depart, arrive)) {
                if(this.grille[arrive].nom !== "") {
                    if(this.grille[arrive].couleur !== this.grille[depart].couleur){
                        this.grille[arrive] = new Pion();
                        var temp = this.grille[arrive];
                        this.grille[arrive] = this.grille[depart];
                        this.grille[depart] = temp;
                        this.tourSuivant();
                    }
                }
                else {
                    var temp = this.grille[arrive];
                    this.grille[arrive] = this.grille[depart];
                    this.grille[depart] = temp;
                    this.tourSuivant();
                }
                this.update();
                this.grille[arrive].tourJouer++;
            }

            
        }
        
    }


}

var echecs = new Echiquier();
echecs.update();

var Engine = function () {
    "use strict";
    var NbBille = 0;
    var plateau;
    var joueuractuel = "Blanc";
    var i , j, x, y;


    var initPlateau = function () {

        for (i = 0; i < 6; i += 1) {
            for (j = 0; j < 6; j += 1) {
                plateau[i][j] = 0;
            }
        }

    };


    var init = function () {
        plateau = new Array(6);
        for (i = 0; i < 6; i += 1) {
            plateau[i] = new Array(6);
        }
        initPlateau();

    };


    this.getCase = function (i, j) {

        return plateau[i][j];
    };


    this.getNbBille = function () {

        return NbBille;
    };


    var getJoueur = function (joueur) {

        return (joueur === "Blanc") ? "Blanc" : "Noir";
    };

    this.getJoueuractuel = function () {

        return getJoueur(joueuractuel);
    };

    var getCoup = function (coup) {

        var ligne = coup.charCodeAt(1) - "1".charCodeAt(0);
        var colonne = coup.charCodeAt(0) - "a".charCodeAt(0);

        return {"l": ligne, "c": colonne};
    };

    var rotatehoraire = function (arrayf, arrayi) {

        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {
                arrayf[i][j] = arrayi[2 - j][i];
            }
        }
    };

    var rotateantihoraire = function (arrayf, arrayi) {

        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {
                arrayf[i][j] = arrayi[j][2 - i];
            }
        }
    };

    var rotatePlateau = function (sens, array) {
        var array2D = new Array(3);
        for (i = 0; i < 6; i += 1) {
            array2D[i] = new Array(3);
        }
        if (sens) {
            rotatehoraire(array2D, array);
        } else {
            rotateantihoraire(array2D, array);
        }
        return array2D;
    };

    function Myexception() {
        this.name = "Coup Invalide";
    }

    var transformeCodecoup = function(lcoup){

        var qplauteau = { "tl" : 1, "bl" : 2, "tr": 3 , "br": 4};
        var sensRotation = (lcoup[0]=="c") ? "h" : "i";
        var position = qplauteau[lcoup.slice(1)];
        return position + sensRotation;
    };

    this.jouerCoupCode = function(lcoup) {

        var coup = lcoup.split(";");
        var i;
        var tmpCoup;
        for (i =0; i < coup.length; i++){
            tmpCoup = coup[i][0]+coup[i][1];
            this.jouerCoup(tmpCoup);
            if(coup[i].length == 5) {
                tmpCoup = transformeCodecoup(coup[i].slice(-3));
                this.jouerCoup(tmpCoup);
            }
        }
    };


    this.jouerCoup = function (coup) {
        if (coup.charCodeAt(0) >= 'a'.charCodeAt(0)) {
            var moove = getCoup(coup);
            NbBille += 1;
            if (plateau[moove.l][moove.c] === 0) {
                plateau[moove.l][moove.c] = joueuractuel;
            } else {    throw new Myexception();    }
        } else {

            var quartPlateau = coup.charCodeAt(0) - '1'.charCodeAt(0) + 1;

            if (quartPlateau === 1) {x = 0; y = 0; } //HautGauche
            if (quartPlateau === 2) {x = 3; y = 0; } //HautDroite
            if (quartPlateau === 3) {x = 0; y = 3; } //BasGauche
            if (quartPlateau === 4) {x = 3; y = 3; } //BasDroite
            var array = new Array(3);
            for (i = 0; i < 6; i += 1) {
                array[i] = new Array(3);
            }

            for (i = 0; i < 3; i += 1) {
                for (j = 0; j < 3; j += 1) {
                    array[i][j] = plateau[i + x][j + y];
                }
            }
            var arrayRotate = rotatePlateau((coup.charCodeAt(1) === 'h'.charCodeAt(0)), array);
            for (i = 0; i < 3; i += 1) {
                for (j = 0; j < 3; j += 1) {
                    plateau[i + x][j + y] = arrayRotate[i][j];
                }
            }
            this.joueurSuivant();
        }
    };


    this.getCaseValue = function (coup) {

        var moove = getCoup(coup);

        return (plateau[moove.l][moove.c] === "Blanc") ? "Blanc" : "Noir";
    };


    this.joueurSuivant = function () {

        joueuractuel = (joueuractuel === "Blanc") ? "Noir" : "Blanc";
    };

    var CheckHorizontal = function(){

        var cptb, cptn;

        for (i = 0; i < 6; i += 1) {
            cptb = 0;
            cptn = 0;
            for (j = 0; j < 6; j += 1) {
                if (plateau[i][j] === "Blanc") {
                    cptb += 1;
                }
                if (plateau[i][j] === "Noir") {
                    cptn += 1;
                }

                if (cptb === 5) {
                    return "Blanc";
                }
                if (cptn === 5) {
                    return "Noir";
                }

            }
        }
    };

    var CheckDiagonal = function(){

        var cptb = 0, cptn = 0;

        for (i = 0; i < 6; i += 1) {

                if (plateau[i][i] === "Blanc") {
                    cptb += 1;
                }
                if (plateau[i][i] === "Noir") {
                    cptn += 1;
                }

                if (cptb === 5) {
                    return "Blanc";
                }
                if (cptn === 5) {
                    return "Noir";
                }
        }

    };

    this.winnerGame = function () {

        var resh = CheckHorizontal();
        var resd = CheckDiagonal();
        if (resh === "Blanc" || resd === "Blanc") return "Blanc";
        else if(resh === "Noir" || resd === "Noir") return "Noir";


    };

    this.setBeginPlayer = function(player){

        joueuractuel = (player === "Noir") ? "Noir" : "Blanc";
    };



    init();
};
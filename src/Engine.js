var Engine = function(){
    var NbBille =0;
    var plateau;
    var joueuractuel = 1;


    // constructeur
    var init = function() {
        plateau = new Array(6);
        for (var i=0; i < 6; i++){
            plateau[i] = new Array(6);
        }
        initPlateau();

    };


    //Initialiser le plateau
    var initPlateau = function(){

        for(var i=0; i< 6; i++){
            for(var j=0; j<6; j++){
                plateau[i][j] = 0;
            }
        }

    };


    this.getCase= function(i,j){

        return plateau[i][j];
    };


    this.getNbBille = function (){

        return NbBille;
    };


    this.getJoueuractuel = function(){

        return getJoueur(joueuractuel);
    };


    var getJoueur =function(joueur){

        return (joueur == 1)? "Blanc":"Noir";
    };


    var getCoup = function(coup) {

        var ligne = coup.charCodeAt(1) - "1".charCodeAt(0) ;
        var colonne = coup.charCodeAt(0) - "a".charCodeAt(0);

        return {"l":ligne,"c": colonne};
    };


    var rotatePlateau = function(sens, array){

        //Cr�ation tableau 2D
        var array2D = new Array(3);
        for(i=0; i < 6 ; i++){
            array2D[i] = new Array(3);
        }
        if(sens == 1) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    array2D[i][j] = array[2 - j][i];
                }
            }
        }
        else {
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        array2D[i][j] = array[j][2 - i];
                    }
                }
        }
        return array2D;

    };


    this.jouerCoup = function(coup){

        if(coup.charCodeAt(0)>= 'a'.charCodeAt(0)) {
            var moove = getCoup(coup);
            NbBille++;
            plateau[moove.l][moove.c] = joueuractuel;
        }
        else{
            var x;
            var y;
            var quartPlateau = coup.charCodeAt(0) - '1'.charCodeAt(0) + 1;

            if(quartPlateau == 1){x = 0; y=0;} //HautGauche
            if(quartPlateau == 2){x = 3; y=0;} //HautDroite
            if(quartPlateau == 3){x = 0; y=3;} //BasGauche
            if(quartPlateau == 4){x = 3; y=3;} //BasDroite

            var i = 0;
            var j = 0;
            var array = new Array(3);
            for(i=0; i < 6 ; i++){
                array[i] = new Array(3);
            }

            for(i=0; i < 3 ; i++){
                for(j=0; j < 3 ; j++){
                    array[i][j] = plateau[i+x][j+y];
                }
            }

            var arrayRotate = rotatePlateau((coup.charCodeAt(1) == 'h'.charCodeAt(0)),array);

            for(i=0; i < 3 ; i++) {
                for (j = 0; j < 3; j++) {
                    plateau[i+x][j+y] = arrayRotate[i][j];
                }
            }

        }

    };


    this.getCaseValue = function(coup){

        var moove = getCoup(coup);

        return (plateau[moove.l][moove.c] == 1)? "Blanc" : "Noir" ;
    };


    this.joueurSuivant = function(){

        joueuractuel = (joueuractuel == "Blanc" )? "Noir": "Blanc";
    };

    init();
};
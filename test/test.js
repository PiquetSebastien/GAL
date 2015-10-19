EngineTest = TestCase("Test");

EngineTest.prototype.test1 = function(){

    var engine = new Engine();
    for(var i=0; i<6;i++){
        for(var j=0; j<6; j++){
            assertTrue(engine.getCase(i,j) == 0);
        }
    }
};

EngineTest.prototype.testPremierJoueur = function(){

    var e = new Engine();
    assertTrue(e.getJoueuractuel() == "Blanc");
};

EngineTest.prototype.testCoupJouer = function(){

  var e = new Engine();
    e.jouerCoup("a1");
  assertTrue(e.getCaseValue("a1") == "Blanc" );
};


EngineTest.prototype.testVerifNombreBille = function() {

    var e = new Engine();
    e.jouerCoup("a1");
    assertTrue(e.getNbBille() == 1);
};

EngineTest.prototype.testRotationPlateau = function(){

    var e = new Engine();
    e.jouerCoup('a3');
    //Rotation sur le plateau HautGauche
    e.jouerCoup('1');
    assertTrue(e.getCaseValue('c3')=="Blanc");
};

EngineTest.prototype.testJoueurSuivant= function(){

    var e = new Engine();
    e.joueurSuivant();
    assertTrue(e.getJoueuractuel()=="Noir");
};
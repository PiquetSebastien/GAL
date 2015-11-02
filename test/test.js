EngineTest = TestCase("Test");


EngineTest.prototype.test1 = function () {

    var engine = new Engine();
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            assertTrue(engine.getCase(i, j) === 0);
        }
    }
};

EngineTest.prototype.testPremierJoueur = function () {

    var e = new Engine();
    assertTrue(e.getJoueuractuel() == "Blanc");
};

EngineTest.prototype.testCoupJouer = function () {

    var e = new Engine();
    e.jouerCoup("a1");
    assertTrue(e.getCaseValue("a1") == "Blanc");
};


EngineTest.prototype.testVerifNombreBille = function () {

    var e = new Engine();
    e.jouerCoup("a1");
    assertTrue(e.getNbBille() === 1);
};

EngineTest.prototype.testRotationPlateau = function () {

    var e = new Engine();
    e.jouerCoup('a1');
    //Rotation sur le plateau HautGauche
    e.jouerCoup('1h');
    assertTrue(e.getCaseValue("c1") == "Blanc");
};

EngineTest.prototype.testJoueurSuivant = function () {

    var e = new Engine();
    e.joueurSuivant();
    assertTrue(e.getJoueuractuel() == "Noir");
};


EngineTest.prototype.testTourJoueurNoir = function () {

    var e = new Engine();
    e.jouerCoup("a1");
    e.jouerCoup("1h");
    e.joueurSuivant();
    e.jouerCoup("a1");
    assertTrue(e.getNbBille() == 2);
    assertTrue(e.getCaseValue("c1") == "Blanc");
    assertTrue(e.getCaseValue("a1") == "Noir");
};

EngineTest.prototype.testRotationInverse = function () {

    var e = new Engine();
    e.jouerCoup("a1");
    e.jouerCoup("1h");
    e.joueurSuivant();
    e.jouerCoup("a1");
    e.jouerCoup("1i");
    assertTrue(e.getCaseValue("a1") == "Blanc");
    assertTrue(e.getCaseValue("a3") == "Noir");
};

EngineTest.prototype.testErreurCoup = function () {

    var e = new Engine();
    e.jouerCoup("a1");
    e.jouerCoup("1h");
    e.joueurSuivant();
    e.jouerCoup("a1");
    e.jouerCoup("1i");

    assertException(function () {
        e.jouerCoup("a3");
    }, "Coup Invalide");

};

EngineTest.prototype.testDixiemeHistoire = function() {

    var e = new Engine();

    e.jouerCoup("a1");
    e.jouerCoup("1h");
    e.joueurSuivant();

    e.jouerCoup("a1");
    e.jouerCoup("1i");
    e.joueurSuivant();

    e.jouerCoup("b1");
    e.jouerCoup("1h");
    e.joueurSuivant();

    e.jouerCoup("a2");
    e.jouerCoup("1i");
    e.joueurSuivant();

    e.jouerCoup("c1");
    e.jouerCoup("1h");
    e.joueurSuivant();

    e.jouerCoup("a3");
    e.jouerCoup("1i");
    e.joueurSuivant();

    e.jouerCoup("d1");
    e.jouerCoup("2i");
    e.joueurSuivant();

    e.jouerCoup("f3");
    e.jouerCoup("2h");
    e.joueurSuivant();

    assertTrue(e.getNbBille() === 8);

    assertTrue(e.getCaseValue("a1") == "Blanc");
    assertTrue(e.getCaseValue("b1") == "Blanc");
    assertTrue(e.getCaseValue("c1") == "Blanc");
    assertTrue(e.getCaseValue("d1") == "Blanc");

    assertTrue(e.getCaseValue("a3") == "Noir");
    assertTrue(e.getCaseValue("b3") == "Noir");
    assertTrue(e.getCaseValue("c3") == "Noir");
    assertTrue(e.getCaseValue("d3") == "Noir");

};

EngineTest.prototype.testOnziemeHistoire = function(){

    var e = new Engine();
    e.jouerCoup("a1");
    e.jouerCoup("1h");
    e.joueurSuivant();

    e.jouerCoup("a1");
    e.jouerCoup("1i");
    e.joueurSuivant();

    e.jouerCoup("b1");
    e.jouerCoup("1h");
    e.joueurSuivant();

    e.jouerCoup("a2");
    e.jouerCoup("1i");
    e.joueurSuivant();

    e.jouerCoup("c1");
    e.jouerCoup("1h");
    e.joueurSuivant();

    e.jouerCoup("a3");
    e.jouerCoup("1i");
    e.joueurSuivant();

    e.jouerCoup("d1");
    e.jouerCoup("2i");
    e.joueurSuivant();

    e.jouerCoup("f3");
    e.jouerCoup("2h");
    e.joueurSuivant();

    e.jouerCoup("e2");

    assertTrue(e.finGame() === "Blanc");
};
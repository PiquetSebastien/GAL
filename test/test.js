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

}
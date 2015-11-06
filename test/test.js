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

    e.jouerCoup("a1");
    assertTrue(e.getNbBille() == 2);
    assertTrue(e.getCaseValue("c1") == "Blanc");
    assertTrue(e.getCaseValue("a1") == "Noir");
};

EngineTest.prototype.testRotationInverse = function () {

    var e = new Engine();
    e.jouerCoup("a1");
    e.jouerCoup("1h");

    e.jouerCoup("a1");
    e.jouerCoup("1i");
    assertTrue(e.getCaseValue("a1") == "Blanc");
    assertTrue(e.getCaseValue("a3") == "Noir");
};

EngineTest.prototype.testErreurCoup = function () {

    var e = new Engine();
    e.jouerCoup("a1");
    e.jouerCoup("1h");

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

    e.jouerCoup("a1");
    e.jouerCoup("1i");

    e.jouerCoup("b1");
    e.jouerCoup("1h");

    e.jouerCoup("a2");
    e.jouerCoup("1i");

    e.jouerCoup("c1");
    e.jouerCoup("1h");

    e.jouerCoup("a3");
    e.jouerCoup("1i");

    e.jouerCoup("d1");
    e.jouerCoup("3i");

    e.jouerCoup("f3");
    e.jouerCoup("3h");

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

    e.jouerCoup("a1");
    e.jouerCoup("1i");

    e.jouerCoup("b1");
    e.jouerCoup("1h");

    e.jouerCoup("a2");
    e.jouerCoup("1i");

    e.jouerCoup("c1");
    e.jouerCoup("1h");

    e.jouerCoup("a3");
    e.jouerCoup("1i");

    e.jouerCoup("d1");
    e.jouerCoup("3i");

    e.jouerCoup("f3");
    e.jouerCoup("3h");

    e.jouerCoup("e1");
    assertTrue(e.winnerGame() === "Blanc");
};

EngineTest.prototype.testDeuziemeHistoire = function(){

    var e = new Engine();
    e.jouerCoupCode("c4cbl;d4abr;c3ctl;c3ctl;c4cbl;e5cbr;b1ctl;b2ctr;c4cbl;c3");
    assertTrue(e.winnerGame() === "Noir");
};

EngineTest.prototype.testTreiziemeHistoire = function(){

    var e = new Engine();
    e.setBeginPlayer("Noir");
    assertTrue(e.getJoueuractuel() === "Noir");
};

EngineTest.prototype.test14Histoire = function(){

    var e = new Engine();
    e.jouerCoupCode("a1cbl ;d1cbr ;b1cbl ;e1cbr ;c1cbl ;f1cbr");
    e.jouerCoupCode("a2cbl ;d2cbr ;b2cbl ;e2cbr ;c2cbl ;f2cbr");
    e.jouerCoupCode("a3cbl ;d3cbr ;b3cbl ;e3cbr ;c3cbl ;f3cbr");
    e.jouerCoupCode("b5ctl ;a4ctr ;e4ctl ;b4ctr ;f4ctl ;d4ctr");
    e.jouerCoupCode("d5ctl ;a5ctr ;f5ctl ;c4ctr ;a6ctl ;c5ctr");
    e.jouerCoupCode("b6ctl ;e5ctr ;d6ctl ;c6ctr ;f6ctl ;e6ctr");
    assertTrue(e.getNbBille() === 36);
};
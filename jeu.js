var comptage = 0; //variable qui indique la position de l'obstacle dans le tableau 'coordonnes_obstacle' lors du premier démarrage

const multiplicateur = 1; //redimensionnement des objets en fonction de la taille de l'écran

var position_carte = 25; // position X et Y du coin supérieur gauche de la carte

var xapparitionjoueur = [2*30*multiplicateur, position_carte + (24*30+0.75)*multiplicateur];
var yapparitionjoueur = [30*multiplicateur, position_carte + (17*30+0.75)*multiplicateur];

var x_joueur = position_carte + multiplicateur; //coordonnées des 2 joueurs
var y_joueur = position_carte + multiplicateur;
var x_joueur2 = position_carte + (24*30+0.75)*multiplicateur;
var y_joueur2 = position_carte + (17*30+0.75)*multiplicateur;



var angle = (Math.PI/4); // A COMPLETER
var angleJ2 = (-3*Math.PI/4); // A COMPLETER
var vittesse_joueur = multiplicateur; // vitesse des joueurs --> x pixels/tick
var tirer = [false,false]; //si la balle doit être tirée ou non
var x_balle = []; // position X de la balle
var y_balle = []; // position Y de la balle
var x_balle2 = []; // position X de la balle
var y_balle2 = []; // position Y de la balle
var angle_balle = []; 
var temps_balle = [0,0]; // durée de l'apparition de la balle
var X=6; // TIMOTHÉE ELLE VEUT RIEN DIRE CETTE VARIABLE
var X2=8; // TIMOTHÉE ELLE VEUT RIEN DIRE CETTE VARIABLE
var distance_balle_joueur = []; //distance entre la balle et le joueur
var vie_personnage = [5,5]; //vie des personnages


//var deplacementGauche=1; 
//var deplacementDroite=1;
//var deplacementHaut=1;
//var deplacementBas=1;

//var deplacementX = 0; // 0 : rien ; 1 : aller à droite ; 2 : aller à gauche
//var deplacementY = 2; // 0 : rien ; 1 : aller en haut ; 2 : aller en bas

//var rect1 = {x: 300, y: 910, width: 19, height: 9}

var coordonnes_obstacle = []; //tableau contenant les coordonnées X et Y des obstacles
coordonnes_obstacle[0] = [];
coordonnes_obstacle[1] = [];

var carte = []; // initialise la carte vide
for (var i=0; i < 20; i++)
{
	carte[i] = [];
}
var initialisationCarteAZero = true; 




//création de l'objet objetRobots
function objetRobots(equipe, positionXRobotTableau, positionYRobotTableau, positionXRobot, positionYRobot, caseHautRobot, caseDroiteRobot, caseBasRobot, caseGaucheRobot, deplacementRobotHaut,
					 deplacementRobotDroite, deplacementRobotBas, deplacementRobotGauche, cible, timer, timerCible, joueur1estTouche, joueur2estTouche, robot1estTouche, robot2estTouche, robot3estTouche, robot4estTouche, timerTirCible, timerTirCible2, timerTirCible3) {
    this.equipe = equipe; //numero equipe du robot : 1 ou 2 (bleu ou rouge)
    this.positionXRobotTableau = positionXRobotTableau; //position X et Y du robot dans le tableau
    this.positionYRobotTableau = positionYRobotTableau;
    this.positionXRobot = positionXRobot; //position X et Y du robot
    this.positionYRobot = positionYRobot;
    this.caseHautRobot = caseHautRobot; //si la case au-dessus du robot est vide = true / si il y a un obstacle au-dessus du robot = false
    this.caseDroiteRobot = caseDroiteRobot; //de-même
    this.caseBasRobot = caseBasRobot; //de-même
    this.caseGaucheRobot = caseGaucheRobot; //de-même
    this.deplacementRobotHaut = deplacementRobotHaut; //si cette variable = true alors le robot se déplacera au prochain mouvement vers le haut
    this.deplacementRobotDroite = deplacementRobotDroite; //si cette variable = true alors le robot se déplacera au prochain mouvement vers la droite
    this.deplacementRobotBas = deplacementRobotBas; //etc
    this.deplacementRobotGauche = deplacementRobotGauche;
	this.cible = cible; //variable contenant le numero de la cible du robot (entre 0 et 2 : robot ou joueur / entre 3 et 6 : cible les coins de la carte)
	this.timer = timer; //simple 'timer' qui sera pour déplacer le robot à chaque 'tick'
	this.timerCible = timerCible; //timer qui permet de changer de cible lorsque cette variable atteind un certain nombre
	this.joueur1estTouche = joueur1estTouche;
	this.joueur2estTouche = joueur2estTouche;
	this.robot1estTouche = robot1estTouche;
	this.robot2estTouche = robot2estTouche;
	this.robot3estTouche = robot3estTouche;
	this.robot4estTouche = robot4estTouche;
	this.timerTirCible = timerTirCible;
	this.timerTirCible2 = timerTirCible2;
	this.timerTirCible3 = timerTirCible3;
}

// On crée des variables qui vont contenir une instance de l'objet Person :
var robot1 = new objetRobots(1, 0, 8, 0*30*multiplicateur+25, 8*30*multiplicateur+25, true, true, true, true, false, false, false, false, Math.floor(Math.random()*7), 0, 0, false, false, false, false, false, false, 0, 0, 0,[]); //création du robot 1 à partir de l'objet 'objetRobots'
var robot2 = new objetRobots(1, 0, 17, 0*30*multiplicateur+25, 17*30*multiplicateur+25, true, true, true, true, false, false, false, false, Math.floor(Math.random()*7), 0, 0, false, false, false, false, false, false, 0, 0, 0,[]); //etc
var robot3 = new objetRobots(2, 24, 9, 24*30*multiplicateur+25, 9*30*multiplicateur+25, true, true, true, true, false, false, false, false, Math.floor(Math.random()*7), 0, 0, false, false, false, false, false, false, 0, 0, 0,[]);
var robot4 = new objetRobots(2, 24, 0, 24*30*multiplicateur+25, 0*30*multiplicateur+25, true, true, true, true, false, false, false, false, Math.floor(Math.random()*7), 0, 0, false, false, false, false, false, false, 0, 0, 0,[]);

var nombreDeplacementsRobot = 4; //nombre de deplacements du robot vers sa cible avant de changer de cible pour le robot n°1
var nombreDeplacementsRobot2 = 4; //etc
var nombreDeplacementsRobot3 = 4;
var nombreDeplacementsRobot4 = 4;


var nbPossibilites = 0; //nombre de possibilités au robot 1 à se déplacer (haut, droite, bas, gauche)
var nbPossibilites2 = 0; //etc
var nbPossibilites3 = 0;
var nbPossibilites4 = 0;

var distance = [];
distance[0] = []; // distance [numero Robot] [distance1/2/3/4] --> distance entre les différents robots pour savoir quel est le chemin qui rapproche le plus lerobot de sa cible
distance[1] = [];
distance[2] = [];
distance[3] = [];

var distanceMissilesRobotsEquipe1 = [];
distanceMissilesRobotsEquipe1[0] = [];
distanceMissilesRobotsEquipe1[1] = [];
distanceMissilesRobotsEquipe1[2] = [];

var coefficientDirecteurEntreRobots = [];
coefficientDirecteurEntreRobots[0] = [];

var positionBalleRobot = [];
positionBalleRobot[0] = []; // abscisse
positionBalleRobot[1] = []; // ordonné

var tirRobotTest = true;
var timerTirRobot1 = 0;
var positionGaucheDroiteRobots = [];
positionGaucheDroiteRobots[0] = [];

var angleRobot = [];
angleRobot[0] = [];
angleRobot[1] = [];
angleRobot[2] = [];
angleRobot[3] = [];
	 

function preload() {
	
	//chargement de toutes les images
	
	imageFaceD = loadImage("images/faceD.png");
	snip1 = loadImage("images/snip1.png");
	snip2 = loadImage("images/snip2.png");
	snip3 = loadImage("images/snip3.png");
	snip4 = loadImage("images/snip4.png");
	snip5 = loadImage("images/snip5.png");
	snip6 = loadImage("images/snip6.png");
	snip7 = loadImage("images/snip7.png");
	snip8 = loadImage("images/snip8.png");
	
	snip1_equipe1 = loadImage("images/snip1-equipe1.png");
	snip2_equipe1 = loadImage("images/snip2-equipe1.png");
	snip3_equipe1 = loadImage("images/snip3-equipe1.png");
	snip4_equipe1 = loadImage("images/snip4-equipe1.png");
	snip5_equipe1 = loadImage("images/snip5-equipe1.png");
	snip6_equipe1 = loadImage("images/snip6-equipe1.png");
	snip7_equipe1 = loadImage("images/snip7-equipe1.png");
	snip8_equipe1 = loadImage("images/snip8-equipe1.png");
	
	snip1_equipe2 = loadImage("images/snip1-equipe2.png");
	snip2_equipe2 = loadImage("images/snip2-equipe2.png");
	snip3_equipe2 = loadImage("images/snip3-equipe2.png");
	snip4_equipe2 = loadImage("images/snip4-equipe2.png");
	snip5_equipe2 = loadImage("images/snip5-equipe2.png");
	snip6_equipe2 = loadImage("images/snip6-equipe2.png");
	snip7_equipe2 = loadImage("images/snip7-equipe2.png");
	snip8_equipe2 = loadImage("images/snip8-equipe2.png");
	
	k1_equipe1 = loadImage("images/k1-equipe1.png");
	k2_equipe1 = loadImage("images/k2-equipe1.png");
	k3_equipe1 = loadImage("images/k3-equipe1.png");
	k4_equipe1 = loadImage("images/k4-equipe1.png");
	k5_equipe1 = loadImage("images/k5-equipe1.png");
	k6_equipe1 = loadImage("images/k6-equipe1.png");
	k7_equipe1 = loadImage("images/k7-equipe1.png");
	k8_equipe1 = loadImage("images/k8-equipe1.png");
	
	k1_equipe2 = loadImage("images/k1-equipe2.png");
	k2_equipe2 = loadImage("images/k2-equipe2.png");
	k3_equipe2 = loadImage("images/k3-equipe2.png");
	k4_equipe2 = loadImage("images/k4-equipe2.png");
	k5_equipe2 = loadImage("images/k5-equipe2.png");
	k6_equipe2 = loadImage("images/k6-equipe2.png");
	k7_equipe2 = loadImage("images/k7-equipe2.png");
	k8_equipe2 = loadImage("images/k8-equipe2.png");
	
	
	mur_haut = loadImage("images/mur-haut.png");
	mur_bas = loadImage("images/mur-bas.png");
	
}

function setup() {
	createCanvas(800*multiplicateur, 800*multiplicateur*3/4); //création du cadre de jeu en fonction de la résolution (multiplicateur)
	background(100);
	carte_collision(true); //Tristan : à compléter
	
	
}

function draw() {
	fill(242,215,200);
	background(100);
	carte_collision(false); //Tristan : à compléter
	
	affichageObstaclesEtJoueur();
	
	detectionCollisionJoueur1();
	detectionCollisionJoueur2();
	fill(256,0,0);
	
	
	
	tirJoueur1();
	tirJoueur2();
	deplacementJoueur();
	
	positionRobotTableau();
	deplacementRobot();
	tirRobot1Faux();
	tirRobot1();
	
	positionRobotTableau2();
	deplacementRobot2();
	
	positionRobotTableau3();
	deplacementRobot3();
	
	positionRobotTableau4();
	deplacementRobot4();
	
	
	detectionCollisionProjectile();
	detectionCollisionProjectileSurObstacles();
	affichage_vie(x_joueur+15*multiplicateur,y_joueur+23*multiplicateur,0);
	affichage_vie(x_joueur2+15*multiplicateur,y_joueur2+23*multiplicateur,1);
	mort();
	
}


function tirRobot1Faux()
{
	robot1.timerTirCible+=1;
	robot1.timerTirCible2+=1;
	robot1.timerTirCible3+=1;
	
	if (robot1.joueur2estTouche == false)
	{
		if (robot1.timerTirCible < 60)
		{
			ellipse(positionBalleRobot[0][0]+15*multiplicateur,positionBalleRobot[1][0]+15*multiplicateur,0,0);
			positionBalleRobot[0][0] += multiplicateur*4*cos(angleRobot[0][0]);
			positionBalleRobot[1][0] += multiplicateur*4*sin(angleRobot[0][0]);
			
			distanceMissilesRobotsEquipe1[0][0]=dist(x_joueur2+10*multiplicateur,y_joueur2+15*multiplicateur,positionBalleRobot[0][0]+15*multiplicateur,positionBalleRobot[1][0]+15*multiplicateur); //distance entre le missile du joueur 2 et la position du joueur 1
			
			if (distanceMissilesRobotsEquipe1[0][0] <= 30*multiplicateur)
			{
				robot1.joueur2estTouche = true;
				positionBalleRobot[0][0] = 12345;
				robot1.timerTirCible = 0;
			}
		}
		else
		{
			angleRobot[0][0] = (Math.atan2(y_joueur2-robot1.positionYRobot,x_joueur2-robot1.positionXRobot));
			positionBalleRobot[0][0] = robot1.positionXRobot;
			positionBalleRobot[1][0] = robot1.positionYRobot;
			robot1.timerTirCible = 0;

		}
	}
	else
	{
		if (robot1.timerTirCible < 60)
		{
			ellipse(positionBalleRobot[0][0]+15*multiplicateur,positionBalleRobot[1][0]+15*multiplicateur,2.5*multiplicateur,2.5*multiplicateur);
			positionBalleRobot[0][0] += multiplicateur*4*cos(angleRobot[0][0]);
			positionBalleRobot[1][0] += multiplicateur*4*sin(angleRobot[0][0]);
			
		}
		else
		{
			angleRobot[0][0] = (Math.atan2(y_joueur2-robot1.positionYRobot,x_joueur2-robot1.positionXRobot));
			positionBalleRobot[0][0] = robot1.positionXRobot;
			positionBalleRobot[1][0] = robot1.positionYRobot;
			robot1.timerTirCible = 0;
			robot1.joueur2estTouche = false;
			

		}
	}
	
	
	
	//COLLISION OBSTACLES
	for (var l=0; l<3; l++)
	{
		for (var k = 0; k < comptage; k++)  //collision par droite, gauche, haut, bas
		{
		
			if (positionBalleRobot[0][l]+15*multiplicateur < coordonnes_obstacle[0][k] + 30*multiplicateur && positionBalleRobot[0][l]+15*multiplicateur > coordonnes_obstacle[0][k] && positionBalleRobot[1][l]+23*multiplicateur> coordonnes_obstacle[1][k] && positionBalleRobot[1][l]+15*multiplicateur < coordonnes_obstacle[1][k] + 30*multiplicateur)
			{	
				positionBalleRobot[0][l] = 12345;
			}
		
		}
	}
	
			
}


function detectionFausseCollisionProjectileEntreRobots()
{
	distanceMissilesRobotsEquipe1[0][0]=dist(x_joueur2+10*multiplicateur,y_joueur2+15*multiplicateur,positionBalleRobot[0][0]+15*multiplicateur,positionBalleRobot[1][0]+15*multiplicateur); //distance entre le missile du joueur 2 et la position du joueur 1
	distanceMissilesRobotsEquipe1[0][1]=dist(robot3.positionXRobot+10*multiplicateur,robot3.positionYRobot+15*multiplicateur,positionBalleRobot[0][1]+15*multiplicateur,positionBalleRobot[1][1]+15*multiplicateur); //distance entre le missile du joueur 1 et la position du joueur 2
	distanceMissilesRobotsEquipe1[0][2]=dist(robot4.positionXRobot+10*multiplicateur,robot4.positionYRobot+15*multiplicateur,positionBalleRobot[0][2]+15*multiplicateur,positionBalleRobot[1][2]+15*multiplicateur);
	
	if (robot1.joueur2estTouche == false)
	{
		if (distanceMissilesRobotsEquipe1[0][0] <= 30*multiplicateur)
		{
			robot1.joueur2estTouche = true;
			positionBalleRobot[0][0] = 12345;
		}
	}
	
	if (robot1.robot3estTouche == false)
	{
		if (distanceMissilesRobotsEquipe1[0][1] <= 30*multiplicateur)
		{
			robot1.robot3estTouche = true;
			positionBalleRobot[0][1] = 12345;
		}
	}
		
	if (robot1.robot4estTouche == false)
	{
		if (distanceMissilesRobotsEquipe1[0][2] <= 30*multiplicateur)
		{
			robot1.robot4estTouche = true;
			positionBalleRobot[0][2] = 12345;
		}
	}
	
}


function tirRobot1()
{
}


// ROBOT NUMERO 1

function positionRobotTableau()
{
	
	robot1.timer+=1;
	robot1.timerCible+=1;
	
	
	//changement de cible lorsque timerCible atteint un certain nombre 
	
	if (robot1.timerCible >= nombreDeplacementsRobot*30) //nombre de deplacement * taille d'une case
	{
		robot1.cible = Math.floor(Math.random()*7);
		robot1.timerCible = 0;
	}
	
	
	// vérification pour chaque cible la distance la plus courte afin d'effectuer le déplacement le plus optimal
	
	if (robot1.cible == 0)
	{
		nombreDeplacementsRobot = 4;
		distance[0][0] = int(dist(x_joueur2, y_joueur2, robot1.positionXRobot, robot1.positionYRobot-3)); //ex : distance entre le joueur 2 et le robot1
		distance[0][1] = int(dist(x_joueur2, y_joueur2, robot1.positionXRobot+3, robot1.positionYRobot));
		distance[0][2] = int(dist(x_joueur2, y_joueur2, robot1.positionXRobot, robot1.positionYRobot+3));
		distance[0][3] = int(dist(x_joueur2, y_joueur2, robot1.positionXRobot-3, robot1.positionYRobot));
	}
	if (robot1.cible == 1)
	{
		nombreDeplacementsRobot = 4;
		distance[0][0] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot1.positionXRobot, robot1.positionYRobot-3));
		distance[0][1] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot1.positionXRobot+3, robot1.positionYRobot));
		distance[0][2] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot1.positionXRobot, robot1.positionYRobot+3));
		distance[0][3] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot1.positionXRobot-3, robot1.positionYRobot));
	}
	if (robot1.cible == 2)
	{
		nombreDeplacementsRobot = 4;
		distance[0][0] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot1.positionXRobot, robot1.positionYRobot-3));
		distance[0][1] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot1.positionXRobot+3, robot1.positionYRobot));
		distance[0][2] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot1.positionXRobot, robot1.positionYRobot+3));
		distance[0][3] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot1.positionXRobot-3, robot1.positionYRobot));
	}
	if (robot1.cible == 3) //coin supérieur gauche
	{
		nombreDeplacementsRobot = 8;
		distance[0][0] = int(dist(25, 25, robot1.positionXRobot, robot1.positionYRobot-3));
		distance[0][1] = int(dist(25, 25, robot1.positionXRobot+3, robot1.positionYRobot));
		distance[0][2] = int(dist(25, 25, robot1.positionXRobot, robot1.positionYRobot+3));
		distance[0][3] = int(dist(25, 25, robot1.positionXRobot-3, robot1.positionYRobot));
	}
	if (robot1.cible == 4) //coin supérieur droite
	{
		nombreDeplacementsRobot = 8;
		distance[0][0] = int(dist(24*30*multiplicateur, 25, robot1.positionXRobot, robot1.positionYRobot-3));
		distance[0][1] = int(dist(24*30*multiplicateur, 25, robot1.positionXRobot+3, robot1.positionYRobot));
		distance[0][2] = int(dist(24*30*multiplicateur, 25, robot1.positionXRobot, robot1.positionYRobot+3));
		distance[0][3] = int(dist(24*30*multiplicateur, 25, robot1.positionXRobot-3, robot1.positionYRobot));
	}
	if (robot1.cible == 5) //coin inférieur gauche
	{
		nombreDeplacementsRobot = 8;
		distance[0][0] = int(dist(25, 17*30*multiplicateur, robot1.positionXRobot, robot1.positionYRobot-3));
		distance[0][1] = int(dist(25, 17*30*multiplicateur, robot1.positionXRobot+3, robot1.positionYRobot));
		distance[0][2] = int(dist(25, 17*30*multiplicateur, robot1.positionXRobot, robot1.positionYRobot+3));
		distance[0][3] = int(dist(25, 17*30*multiplicateur, robot1.positionXRobot-3, robot1.positionYRobot));
	}
	if (robot1.cible == 6) //coin inférieur droite
	{
		nombreDeplacementsRobot = 8;
		distance[0][0] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot1.positionXRobot, robot1.positionYRobot-3));
		distance[0][1] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot1.positionXRobot+3, robot1.positionYRobot));
		distance[0][2] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot1.positionXRobot, robot1.positionYRobot+3));
		distance[0][3] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot1.positionXRobot-3, robot1.positionYRobot));
	}
	
	
	
	if (robot1.timer >= 30)
	{
		
		//à chaque déplacement toutes les possibilités de déplacements sont remises à zéro et pourront être réactivés en fonction des prochains obstacles autour du robot
		robot1.deplacementRobotHaut = false;
		robot1.deplacementRobotDroite = false;
		robot1.deplacementRobotBas = false;
		robot1.deplacementRobotGauche = false;
		
		verificationObstacleAutourRobot();
		siNombrePossibilitesRobotEgalUn();
		siNombrePossibilitesRobotEgalDeux();
		siNombrePossibilitesRobotEgalTrois();
		siNombrePossibilitesRobotEgalQuatre();
		
		robot1.timer=0;
	}
	
}

	
// ROBOT NUMERO 1
function verificationObstacleAutourRobot()
{
	
		
		//verification obstacle au dessus
		if (carte[robot1.positionYRobotTableau-1+1][robot1.positionXRobotTableau+1] == 0)
		{
			robot1.caseHautRobot = true;
			nbPossibilites+=1;
		}
		else
		{
			robot1.caseHautRobot = false;
		}

		//verification obstacle à droite
		if (carte[robot1.positionYRobotTableau+1][robot1.positionXRobotTableau+1+1] == 0)
		{
			robot1.caseDroiteRobot = true;
			nbPossibilites+=1;
		}
		else
		{
			robot1.caseDroiteRobot = false;
		}

		//verification obstacle en dessous
		if (carte[robot1.positionYRobotTableau+1+1][robot1.positionXRobotTableau+1] == 0)
		{

			robot1.caseBasRobot = true;
			nbPossibilites+=1;
		}
		else
		{
			robot1.caseBasRobot = false;
		}

		//verification obstacle à gauche
		if (carte[robot1.positionYRobotTableau+1][robot1.positionXRobotTableau-1+1] == 0)
		{
			robot1.caseGaucheRobot = true;
			nbPossibilites+=1;
		}
		else
		{
			robot1.caseGaucheRobot = false;
		}
}

// ROBOT NUMERO 1
function siNombrePossibilitesRobotEgalUn()
{
	
		if (nbPossibilites == 1)
		{
			if (robot1.caseHautRobot == true)
			{
				robot1.deplacementRobotHaut = true;
				robot1.positionYRobotTableau-=1;
				nbPossibilites=0;
			}
			if (robot1.caseDroiteRobot == true)
			{
				robot1.deplacementRobotDroite = true;
				robot1.positionXRobotTableau+=1;
				nbPossibilites=0;
			}
			if (robot1.caseBasRobot == true)
			{
				robot1.deplacementRobotBas = true;
				robot1.positionYRobotTableau+=1;
				nbPossibilites=0;
			}
			if (robot1.caseGaucheRobot == true)
			{
				robot1.deplacementRobotGauche = true;
				robot1.positionXRobotTableau-=1;
				nbPossibilites=0;
			}
		}

}

// ROBOT NUMERO 1
function siNombrePossibilitesRobotEgalDeux()
{
	if (nbPossibilites == 2)
		{

			if (robot1.caseHautRobot == true && robot1.caseDroiteRobot == true)
			{
				if (distance[0][0] <= distance[0][1])
				{
					robot1.deplacementRobotHaut = true;
					robot1.positionYRobotTableau-=1;
					nbPossibilites=0;
				}
				else
				{
					robot1.deplacementRobotDroite = true;
					robot1.positionXRobotTableau+=1;
					nbPossibilites=0;
				}
			}
			if (robot1.caseHautRobot == true && robot1.caseBasRobot == true)
			{
				if (distance[0][0] <= distance[0][2])
				{
					robot1.deplacementRobotHaut = true;
					robot1.positionYRobotTableau-=1;
					nbPossibilites=0;
				}
				else
				{
					robot1.deplacementRobotBas = true;
					robot1.positionYRobotTableau+=1;
					nbPossibilites=0;
				}
			}
			if (robot1.caseHautRobot == true && robot1.caseGaucheRobot == true)
			{
				if (distance[0][0] <= distance[0][3])
				{
					robot1.deplacementRobotHaut = true;
					robot1.positionYRobotTableau-=1;
					nbPossibilites=0;
				}
				else
				{
					robot1.deplacementRobotGauche = true;
					robot1.positionXRobotTableau-=1;
					nbPossibilites=0;
				}
			}
			if (robot1.caseDroiteRobot == true && robot1.caseBasRobot == true)
			{
				if (distance[0][1] <= distance[0][2])
				{
					robot1.deplacementRobotDroite = true;
					robot1.positionXRobotTableau+=1;
					nbPossibilites=0;
				}
				else
				{
					robot1.deplacementRobotBas = true;
					robot1.positionYRobotTableau+=1;
					nbPossibilites=0;
				}
			}
			if (robot1.caseDroiteRobot == true && robot1.caseGaucheRobot == true)
			{
				if (distance[0][1] <= distance[0][3])
				{
					robot1.deplacementRobotDroite = true;
					robot1.positionXRobotTableau+=1;
					nbPossibilites=0;
				}
				else
				{
					robot1.deplacementRobotGauche = true;
					robot1.positionXRobotTableau-=1;
					nbPossibilites=0;
				}
			}
			if (robot1.caseBasRobot == true && robot1.caseGaucheRobot == true)
			{
				if (distance[0][2] <= distance[0][3])
				{
					robot1.deplacementRobotBas = true;
					robot1.positionYRobotTableau+=1;
					nbPossibilites=0;
				}
				else
				{
					robot1.deplacementRobotGauche = true;
					robot1.positionXRobotTableau-=1;
					nbPossibilites=0;
				}
			}
		}

}

// ROBOT NUMERO 1
function siNombrePossibilitesRobotEgalTrois()
{
	
		if (nbPossibilites == 3)
		{
			if (robot1.caseHautRobot == true && robot1.caseDroiteRobot == true && robot1.caseBasRobot == true)
			{
				if (distance[0][0] <= distance[0][1] && distance[0][0] < distance[0][2])
				{
					robot1.deplacementRobotHaut = true;
					robot1.positionYRobotTableau-=1;
					nbPossibilites=0;
				}
				if (distance[0][1] < distance[0][0] && distance[0][1] <= distance[0][2])
				{
					robot1.deplacementRobotDroite = true;
					robot1.positionXRobotTableau+=1;
					nbPossibilites=0;
				}
				if (distance[0][2] <= distance[0][0] && distance[0][2] < distance[0][1])
				{
					robot1.deplacementRobotBas = true;
					robot1.positionYRobotTableau+=1;
					nbPossibilites=0;
				}
			}

			if (robot1.caseDroiteRobot == true && robot1.caseBasRobot == true && robot1.caseGaucheRobot == true)
			{
				if (distance[0][1] <= distance[0][2] && distance[0][1] < distance[0][3])
				{
					robot1.deplacementRobotDroite = true;
					robot1.positionXRobotTableau+=1;
					nbPossibilites=0;
				}
				if (distance[0][2] < distance[0][1] && distance[0][2] <= distance[0][3])
				{
					robot1.deplacementRobotBas = true;
					robot1.positionYRobotTableau+=1;
					nbPossibilites=0;
				}
				if (distance[0][3] <= distance[0][1] && distance[0][3] < distance[0][2])
				{
					robot1.deplacementRobotGauche = true;
					robot1.positionXRobotTableau-=1;
					nbPossibilites=0;
				}
			}

			if (robot1.caseBasRobot == true && robot1.caseGaucheRobot == true && robot1.caseHautRobot == true)
			{
				if (distance[0][2] <= distance[0][3] && distance[0][2] < distance[0][0])
				{
					robot1.deplacementRobotBas = true;
					robot1.positionYRobotTableau+=1;
					nbPossibilites=0;
				}
				if (distance[0][3] < distance[0][2] && distance[0][3] <= distance[0][0])
				{
					robot1.deplacementRobotGauche = true;
					robot1.positionXRobotTableau-=1;
					nbPossibilites=0;
				}
				if (distance[0][0] <= distance[0][2] && distance[0][0] < distance[0][3])
				{
					robot1.deplacementRobotHaut = true;
					robot1.positionYRobotTableau-=1;
					nbPossibilites=0;
				}
			}

			if (robot1.caseGaucheRobot == true && robot1.caseHautRobot == true && robot1.caseDroiteRobot == true)
			{
				if (distance[0][3] <= distance[0][0] && distance[0][3] < distance[0][1])
				{
					robot1.deplacementRobotGauche = true;
					robot1.positionXRobotTableau-=1;
					nbPossibilites=0;
				}
				if (distance[0][0] < distance[0][3] && distance[0][0] <= distance[0][1])
				{
					robot1.deplacementRobotHaut = true;
					robot1.positionYRobotTableau-=1;
					nbPossibilites=0;
				}
				if (distance[0][1] <= distance[0][3] && distance[0][1] < distance[0][0])
				{
					robot1.deplacementRobotDroite = true;
					robot1.positionXRobotTableau+=1;
					nbPossibilites=0;
				}
			}

		}
}

// ROBOT NUMERO 1
function siNombrePossibilitesRobotEgalQuatre()
{
	
		if (nbPossibilites >= 4)
		{

			if (distance[0][0] <= distance[0][1] && distance[0][0] < distance[0][2] && distance[0][0] < distance[0][3])
			{
				robot1.deplacementRobotHaut = true;
				robot1.positionYRobotTableau-=1;
				nbPossibilites=0;
			}
			if (distance[0][1] < distance[0][0] && distance[0][1] <= distance[0][2] && distance[0][1] < distance[0][3])
			{
				robot1.deplacementRobotDroite = true;
				robot1.positionXRobotTableau+=1;
				nbPossibilites=0;
			}
			if (distance[0][2] < distance[0][0] && distance[0][2] < distance[0][1] && distance[0][2] <= distance[0][3])
			{
				robot1.deplacementRobotBas = true;
				robot1.positionYRobotTableau+=1;
				nbPossibilites=0;
			}
			if (distance[0][3] <= distance[0][0] && distance[0][3] < distance[0][1] && distance[0][3] < distance[0][2])
			{
				robot1.deplacementRobotGauche = true;
				robot1.positionXRobotTableau-=1;
				nbPossibilites=0;
			}
		}
}


// ROBOT NUMERO 1
function deplacementRobot()
{
	
				
		
		if (robot1.deplacementRobotHaut == true)
		{
			robot1.positionYRobot-=1*multiplicateur;
			image(snip3_equipe1, robot1.positionXRobot, robot1.positionYRobot);
		}
		if (robot1.deplacementRobotDroite == true)
		{
			robot1.positionXRobot+=1*multiplicateur;
			image(snip2_equipe1, robot1.positionXRobot, robot1.positionYRobot);
		}
		if (robot1.deplacementRobotBas == true)
		{
			robot1.positionYRobot+=1*multiplicateur;
			image(snip1_equipe1, robot1.positionXRobot, robot1.positionYRobot);
		}
		if (robot1.deplacementRobotGauche == true)
		{
			robot1.positionXRobot-=1*multiplicateur;
			image(snip4_equipe1, robot1.positionXRobot, robot1.positionYRobot);
		}
		
	
}



// ROBOT NUMERO 2
function positionRobotTableau2()
{
	
	robot2.timer+=1;
	robot2.timerCible+=1;
	if (robot2.timerCible >= nombreDeplacementsRobot2*30) //nombre de deplacement * taille d'une case * multiplicateur
	{
		robot2.cible = Math.floor(Math.random()*7);
		robot2.timerCible = 0;
	}
	
	if (robot2.cible == 0)
	{
		nombreDeplacementsRobot2 = 4;
		distance[1][0] = int(dist(x_joueur2, y_joueur2, robot2.positionXRobot, robot2.positionYRobot-3));
		distance[1][1] = int(dist(x_joueur2, y_joueur2, robot2.positionXRobot+3, robot2.positionYRobot));
		distance[1][2] = int(dist(x_joueur2, y_joueur2, robot2.positionXRobot, robot2.positionYRobot+3));
		distance[1][3] = int(dist(x_joueur2, y_joueur2, robot2.positionXRobot-3, robot2.positionYRobot));
	}
	if (robot2.cible == 1)
	{
		nombreDeplacementsRobot2 = 4;
		distance[1][0] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot2.positionXRobot, robot2.positionYRobot-3));
		distance[1][1] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot2.positionXRobot+3, robot2.positionYRobot));
		distance[1][2] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot2.positionXRobot, robot2.positionYRobot+3));
		distance[1][3] = int(dist(robot3.positionXRobot, robot3.positionYRobot, robot2.positionXRobot-3, robot2.positionYRobot));
	}
	if (robot2.cible == 2)
	{
		nombreDeplacementsRobot2 = 4;
		distance[1][0] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot2.positionXRobot, robot2.positionYRobot-3));
		distance[1][1] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot2.positionXRobot+3, robot2.positionYRobot));
		distance[1][2] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot2.positionXRobot, robot2.positionYRobot+3));
		distance[1][3] = int(dist(robot4.positionXRobot, robot4.positionYRobot, robot2.positionXRobot-3, robot2.positionYRobot));
	}
	if (robot2.cible == 3) //coin supérieur gauche
	{
		nombreDeplacementsRobot2 = 8;
		distance[1][0] = int(dist(25, 25, robot2.positionXRobot, robot2.positionYRobot-3));
		distance[1][1] = int(dist(25, 25, robot2.positionXRobot+3, robot2.positionYRobot));
		distance[1][2] = int(dist(25, 25, robot2.positionXRobot, robot2.positionYRobot+3));
		distance[1][3] = int(dist(25, 25, robot2.positionXRobot-3, robot2.positionYRobot));
	}
	if (robot2.cible == 4) //coin supérieur droite
	{
		nombreDeplacementsRobot2 = 8;
		distance[1][0] = int(dist(24*30*multiplicateur, 25, robot2.positionXRobot, robot2.positionYRobot-3));
		distance[1][1] = int(dist(24*30*multiplicateur, 25, robot2.positionXRobot+3, robot2.positionYRobot));
		distance[1][2] = int(dist(24*30*multiplicateur, 25, robot2.positionXRobot, robot2.positionYRobot+3));
		distance[1][3] = int(dist(24*30*multiplicateur, 25, robot2.positionXRobot-3, robot2.positionYRobot));
	}
	if (robot2.cible == 5) //coin inférieur gauche
	{
		nombreDeplacementsRobot2 = 8;
		distance[1][0] = int(dist(25, 17*30*multiplicateur, robot2.positionXRobot, robot2.positionYRobot-3));
		distance[1][1] = int(dist(25, 17*30*multiplicateur, robot2.positionXRobot+3, robot2.positionYRobot));
		distance[1][2] = int(dist(25, 17*30*multiplicateur, robot2.positionXRobot, robot2.positionYRobot+3));
		distance[1][3] = int(dist(25, 17*30*multiplicateur, robot2.positionXRobot-3, robot2.positionYRobot));
	}
	if (robot2.cible == 6) //coin inférieur droite
	{
		nombreDeplacementsRobot2 = 8;
		distance[1][0] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot2.positionXRobot, robot2.positionYRobot-3));
		distance[1][1] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot2.positionXRobot+3, robot2.positionYRobot));
		distance[1][2] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot2.positionXRobot, robot2.positionYRobot+3));
		distance[1][3] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot2.positionXRobot-3, robot2.positionYRobot));
	}
	
	
	
	if (robot2.timer >= 30)
	{
		
		robot2.deplacementRobotHaut = false;
		robot2.deplacementRobotDroite = false;
		robot2.deplacementRobotBas = false;
		robot2.deplacementRobotGauche = false;
		
		verificationObstacleAutourRobot2();
		siNombrePossibilitesRobotEgalUn2();
		siNombrePossibilitesRobotEgalDeux2();
		siNombrePossibilitesRobotEgalTrois2();
		siNombrePossibilitesRobotEgalQuatre2();
		robot2.timer=0;
	}
	
}

	// ROBOT NUMERO 2
function verificationObstacleAutourRobot2()
{
	
		
		//verification obstacle au dessus
		if (carte[robot2.positionYRobotTableau-1+1][robot2.positionXRobotTableau+1] == 0)
		{
			robot2.caseHautRobot = true;
			nbPossibilites2+=1;
		}
		else
		{
			robot2.caseHautRobot = false;
		}

		//verification obstacle à droite
		if (carte[robot2.positionYRobotTableau+1][robot2.positionXRobotTableau+1+1] == 0)
		{
			robot2.caseDroiteRobot = true;
			nbPossibilites2+=1;
		}
		else
		{
			robot2.caseDroiteRobot = false;
		}

		//verification obstacle en dessous
		if (carte[robot2.positionYRobotTableau+1+1][robot2.positionXRobotTableau+1] == 0)
		{

			robot2.caseBasRobot = true;
			nbPossibilites2+=1;
		}
		else
		{
			robot2.caseBasRobot = false;
		}

		//verification obstacle à gauche
		if (carte[robot2.positionYRobotTableau+1][robot2.positionXRobotTableau-1+1] == 0)
		{
			robot2.caseGaucheRobot = true;
			nbPossibilites2+=1;
		}
		else
		{
			robot2.caseGaucheRobot = false;
		}
}
// ROBOT NUMERO 2
function siNombrePossibilitesRobotEgalUn2()
{
	
		if (nbPossibilites2 == 1)
		{
			if (robot2.caseHautRobot == true)
			{
				robot2.deplacementRobotHaut = true;
				robot2.positionYRobotTableau-=1;
				nbPossibilites2=0;
			}
			if (robot2.caseDroiteRobot == true)
			{
				robot2.deplacementRobotDroite = true;
				robot2.positionXRobotTableau+=1;
				nbPossibilites2=0;
			}
			if (robot2.caseBasRobot == true)
			{
				robot2.deplacementRobotBas = true;
				robot2.positionYRobotTableau+=1;
				nbPossibilites2=0;
			}
			if (robot2.caseGaucheRobot == true)
			{
				robot2.deplacementRobotGauche = true;
				robot2.positionXRobotTableau-=1;
				nbPossibilites2=0;
			}
		}

}
// ROBOT NUMERO 2
function siNombrePossibilitesRobotEgalDeux2()
{
	if (nbPossibilites2 == 2)
		{

			if (robot2.caseHautRobot == true && robot2.caseDroiteRobot == true)
			{
				if (distance[1][0] <= distance[1][1])
				{
					robot2.deplacementRobotHaut = true;
					robot2.positionYRobotTableau-=1;
					nbPossibilites2=0;
				}
				else
				{
					robot2.deplacementRobotDroite = true;
					robot2.positionXRobotTableau+=1;
					nbPossibilites2=0;
				}
			}
			if (robot2.caseHautRobot == true && robot2.caseBasRobot == true)
			{
				if (distance[1][0] <= distance[1][2])
				{
					robot2.deplacementRobotHaut = true;
					robot2.positionYRobotTableau-=1;
					nbPossibilites2=0;
				}
				else
				{
					robot2.deplacementRobotBas = true;
					robot2.positionYRobotTableau+=1;
					nbPossibilites2=0;
				}
			}
			if (robot2.caseHautRobot == true && robot2.caseGaucheRobot == true)
			{
				if (distance[1][0] <= distance[1][3])
				{
					robot2.deplacementRobotHaut = true;
					robot2.positionYRobotTableau-=1;
					nbPossibilites2=0;
				}
				else
				{
					robot2.deplacementRobotGauche = true;
					robot2.positionXRobotTableau-=1;
					nbPossibilites2=0;
				}
			}
			if (robot2.caseDroiteRobot == true && robot2.caseBasRobot == true)
			{
				if (distance[1][1] <= distance[1][2])
				{
					robot2.deplacementRobotDroite = true;
					robot2.positionXRobotTableau+=1;
					nbPossibilites2=0;
				}
				else
				{
					robot2.deplacementRobotBas = true;
					robot2.positionYRobotTableau+=1;
					nbPossibilites2=0;
				}
			}
			if (robot2.caseDroiteRobot == true && robot2.caseGaucheRobot == true)
			{
				if (distance[1][1] <= distance[1][3])
				{
					robot2.deplacementRobotDroite = true;
					robot2.positionXRobotTableau+=1;
					nbPossibilites2=0;
				}
				else
				{
					robot2.deplacementRobotGauche = true;
					robot2.positionXRobotTableau-=1;
					nbPossibilites2=0;
				}
			}
			if (robot2.caseBasRobot == true && robot2.caseGaucheRobot == true)
			{
				if (distance[1][2] <= distance[1][3])
				{
					robot2.deplacementRobotBas = true;
					robot2.positionYRobotTableau+=1;
					nbPossibilites2=0;
				}
				else
				{
					robot2.deplacementRobotGauche = true;
					robot2.positionXRobotTableau-=1;
					nbPossibilites2=0;
				}
			}
		}

}
// ROBOT NUMERO 2
function siNombrePossibilitesRobotEgalTrois2()
{
	
		if (nbPossibilites2 == 3)
		{

			if (robot2.caseHautRobot == true && robot2.caseDroiteRobot == true && robot2.caseBasRobot == true)
			{
				if (distance[1][0] <= distance[1][1] && distance[1][0] < distance[1][2])
				{
					robot2.deplacementRobotHaut = true;
					robot2.positionYRobotTableau-=1;
					nbPossibilites2=0;
				}
				if (distance[1][1] < distance[1][0] && distance[1][1] <= distance[1][2])
				{
					robot2.deplacementRobotDroite = true;
					robot2.positionXRobotTableau+=1;
					nbPossibilites2=0;
				}
				if (distance[1][2] <= distance[1][0] && distance[1][2] < distance[1][1])
				{
					robot2.deplacementRobotBas = true;
					robot2.positionYRobotTableau+=1;
					nbPossibilites2=0;
				}
			}

			if (robot2.caseDroiteRobot == true && robot2.caseBasRobot == true && robot2.caseGaucheRobot == true)
			{
				if (distance[1][1] <= distance[1][2] && distance[1][1] < distance[1][3])
				{
					robot2.deplacementRobotDroite = true;
					robot2.positionXRobotTableau+=1;
					nbPossibilites2=0;
				}
				if (distance[1][2] < distance[1][1] && distance[1][2] <= distance[1][3])
				{
					robot2.deplacementRobotBas = true;
					robot2.positionYRobotTableau+=1;
					nbPossibilites2=0;
				}
				if (distance[1][3] <= distance[1][1] && distance[1][3] < distance[1][2])
				{
					robot2.deplacementRobotGauche = true;
					robot2.positionXRobotTableau-=1;
					nbPossibilites2=0;
				}
			}

			if (robot2.caseBasRobot == true && robot2.caseGaucheRobot == true && robot2.caseHautRobot == true)
			{
				if (distance[1][2] <= distance[1][3] && distance[1][2] < distance[1][0])
				{
					robot2.deplacementRobotBas = true;
					robot2.positionYRobotTableau+=1;
					nbPossibilites2=0;
				}
				if (distance[1][3] < distance[1][2] && distance[1][3] <= distance[1][0])
				{
					robot2.deplacementRobotGauche = true;
					robot2.positionXRobotTableau-=1;
					nbPossibilites2=0;
				}
				if (distance[1][0] <= distance[1][2] && distance[1][0] < distance[1][3])
				{
					robot2.deplacementRobotHaut = true;
					robot2.positionYRobotTableau-=1;
					nbPossibilites2=0;
				}
			}

			if (robot2.caseGaucheRobot == true && robot2.caseHautRobot == true && robot2.caseDroiteRobot == true)
			{
				if (distance[1][3] <= distance[1][0] && distance[1][3] < distance[1][1])
				{
					robot2.deplacementRobotGauche = true;
					robot2.positionXRobotTableau-=1;
					nbPossibilites2=0;
				}
				if (distance[1][0] < distance[1][3] && distance[1][0] <= distance[1][1])
				{
					robot2.deplacementRobotHaut = true;
					robot2.positionYRobotTableau-=1;
					nbPossibilites2=0;
				}
				if (distance[1][1] <= distance[1][3] && distance[1][1] < distance[1][0])
				{
					robot2.deplacementRobotDroite = true;
					robot2.positionXRobotTableau+=1;
					nbPossibilites2=0;
				}
			}

		}
}
// ROBOT NUMERO 2
function siNombrePossibilitesRobotEgalQuatre2()
{
	
		if (nbPossibilites2 >= 4)
		{

			if (distance[1][0] <= distance[1][1] && distance[1][0] < distance[1][2] && distance[1][0] < distance[1][3])
			{
				robot2.deplacementRobotHaut = true;
				robot2.positionYRobotTableau-=1;
				nbPossibilites2=0;
			}
			if (distance[1][1] < distance[1][0] && distance[1][1] <= distance[1][2] && distance[1][1] < distance[1][3])
			{
				robot2.deplacementRobotDroite = true;
				robot2.positionXRobotTableau+=1;
				nbPossibilites2=0;
			}
			if (distance[1][2] < distance[1][0] && distance[1][2] < distance[1][1] && distance[1][2] <= distance[1][3])
			{
				robot2.deplacementRobotBas = true;
				robot2.positionYRobotTableau+=1;
				nbPossibilites2=0;
			}
			if (distance[1][3] <= distance[1][0] && distance[1][3] < distance[1][1] && distance[1][3] < distance[1][2])
			{
				robot2.deplacementRobotGauche = true;
				robot2.positionXRobotTableau-=1;
				nbPossibilites2=0;
			}
		}
}

// ROBOT NUMERO 2
function deplacementRobot2()
{
		
		

		if (robot2.deplacementRobotHaut == true)
		{
			robot2.positionYRobot-=1*multiplicateur;
			image(snip3_equipe1, robot2.positionXRobot, robot2.positionYRobot);
		}
		if (robot2.deplacementRobotDroite == true)
		{
			robot2.positionXRobot+=1*multiplicateur;
			image(snip2_equipe1, robot2.positionXRobot, robot2.positionYRobot);
		}
		if (robot2.deplacementRobotBas == true)
		{
			robot2.positionYRobot+=1*multiplicateur;
			image(snip1_equipe1, robot2.positionXRobot, robot2.positionYRobot);
		}
		if (robot2.deplacementRobotGauche == true)
		{
			robot2.positionXRobot-=1*multiplicateur;
			image(snip4_equipe1, robot2.positionXRobot, robot2.positionYRobot);
		}
		
	
}


// ROBOT NUMERO 3
function positionRobotTableau3()
{
	
	robot3.timer+=1;
	robot3.timerCible+=1;
	if (robot3.timerCible >= nombreDeplacementsRobot3*30) //nombre de deplacement * taille d'une case * multiplicateur
	{
		robot3.cible = Math.floor(Math.random()*7);
		robot3.timerCible = 0;
	}
	
	if (robot3.cible == 0)
	{
		nombreDeplacementsRobot3 = 4;
		distance[2][0] = int(dist(x_joueur, y_joueur, robot3.positionXRobot, robot3.positionYRobot-3));
		distance[2][1] = int(dist(x_joueur, y_joueur, robot3.positionXRobot+3, robot3.positionYRobot));
		distance[2][2] = int(dist(x_joueur, y_joueur, robot3.positionXRobot, robot3.positionYRobot+3));
		distance[2][3] = int(dist(x_joueur, y_joueur, robot3.positionXRobot-3, robot3.positionYRobot));
	}
	if (robot3.cible == 1)
	{
		nombreDeplacementsRobot3 = 4;
		distance[2][0] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot3.positionXRobot, robot3.positionYRobot-3));
		distance[2][1] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot3.positionXRobot+3, robot3.positionYRobot));
		distance[2][2] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot3.positionXRobot, robot3.positionYRobot+3));
		distance[2][3] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot3.positionXRobot-3, robot3.positionYRobot));
	}
	if (robot3.cible == 2)
	{
		nombreDeplacementsRobot3 = 4;
		distance[2][0] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot3.positionXRobot, robot3.positionYRobot-3));
		distance[2][1] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot3.positionXRobot+3, robot3.positionYRobot));
		distance[2][2] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot3.positionXRobot, robot3.positionYRobot+3));
		distance[2][3] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot3.positionXRobot-3, robot3.positionYRobot));
	}
	if (robot3.cible == 3) //coin supérieur gauche
	{
		nombreDeplacementsRobot3 = 8;
		distance[2][0] = int(dist(25, 25, robot3.positionXRobot, robot3.positionYRobot-3));
		distance[2][1] = int(dist(25, 25, robot3.positionXRobot+3, robot3.positionYRobot));
		distance[2][2] = int(dist(25, 25, robot3.positionXRobot, robot3.positionYRobot+3));
		distance[2][3] = int(dist(25, 25, robot3.positionXRobot-3, robot3.positionYRobot));
	}
	if (robot3.cible == 4) //coin supérieur droite
	{
		nombreDeplacementsRobot3 = 8;
		distance[2][0] = int(dist(24*30*multiplicateur, 25, robot3.positionXRobot, robot3.positionYRobot-3));
		distance[2][1] = int(dist(24*30*multiplicateur, 25, robot3.positionXRobot+3, robot3.positionYRobot));
		distance[2][2] = int(dist(24*30*multiplicateur, 25, robot3.positionXRobot, robot3.positionYRobot+3));
		distance[2][3] = int(dist(24*30*multiplicateur, 25, robot3.positionXRobot-3, robot3.positionYRobot));
	}
	if (robot3.cible == 5) //coin inférieur gauche
	{
		nombreDeplacementsRobot3 = 8;
		distance[2][0] = int(dist(25, 17*30*multiplicateur, robot3.positionXRobot, robot3.positionYRobot-3));
		distance[2][1] = int(dist(25, 17*30*multiplicateur, robot3.positionXRobot+3, robot3.positionYRobot));
		distance[2][2] = int(dist(25, 17*30*multiplicateur, robot3.positionXRobot, robot3.positionYRobot+3));
		distance[2][3] = int(dist(25, 17*30*multiplicateur, robot3.positionXRobot-3, robot3.positionYRobot));
	}
	if (robot3.cible == 6) //coin inférieur droite
	{
		nombreDeplacementsRobot3 = 8;
		distance[2][0] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot3.positionXRobot, robot3.positionYRobot-3));
		distance[2][1] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot3.positionXRobot+3, robot3.positionYRobot));
		distance[2][2] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot3.positionXRobot, robot3.positionYRobot+3));
		distance[2][3] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot3.positionXRobot-3, robot3.positionYRobot));
	}
	
	
	
	if (robot3.timer >= 30)
	{
		
		robot3.deplacementRobotHaut = false;
		robot3.deplacementRobotDroite = false;
		robot3.deplacementRobotBas = false;
		robot3.deplacementRobotGauche = false;
		
		verificationObstacleAutourRobot3();
		siNombrePossibilitesRobotEgalUn3();
		siNombrePossibilitesRobotEgalDeux3();
		siNombrePossibilitesRobotEgalTrois3();
		siNombrePossibilitesRobotEgalQuatre3();
		
		robot3.timer=0;
	}
	
}

	// ROBOT NUMERO 3
function verificationObstacleAutourRobot3()
{
	
		
		//verification obstacle au dessus
		if (carte[robot3.positionYRobotTableau-1+1][robot3.positionXRobotTableau+1] == 0)
		{
			robot3.caseHautRobot = true;
			nbPossibilites3+=1;
		}
		else
		{
			robot3.caseHautRobot = false;
		}

		//verification obstacle à droite
		if (carte[robot3.positionYRobotTableau+1][robot3.positionXRobotTableau+1+1] == 0)
		{
			robot3.caseDroiteRobot = true;
			nbPossibilites3+=1;
		}
		else
		{
			robot3.caseDroiteRobot = false;
		}

		//verification obstacle en dessous
		if (carte[robot3.positionYRobotTableau+1+1][robot3.positionXRobotTableau+1] == 0)
		{

			robot3.caseBasRobot = true;
			nbPossibilites3+=1;
		}
		else
		{
			robot3.caseBasRobot = false;
		}

		//verification obstacle à gauche
		if (carte[robot3.positionYRobotTableau+1][robot3.positionXRobotTableau-1+1] == 0)
		{
			robot3.caseGaucheRobot = true;
			nbPossibilites3+=1;
		}
		else
		{
			robot3.caseGaucheRobot = false;
		}
		
}

// ROBOT NUMERO 3
function siNombrePossibilitesRobotEgalUn3()
{
	
		if (nbPossibilites3 == 1)
		{
			if (robot3.caseHautRobot == true)
			{
				robot3.deplacementRobotHaut = true;
				robot3.positionYRobotTableau-=1;
				nbPossibilites3=0;
			}
			if (robot3.caseDroiteRobot == true)
			{
				robot3.deplacementRobotDroite = true;
				robot3.positionXRobotTableau+=1;
				nbPossibilites3=0;
			}
			if (robot3.caseBasRobot == true)
			{
				robot3.deplacementRobotBas = true;
				robot3.positionYRobotTableau+=1;
				nbPossibilites3=0;
			}
			if (robot3.caseGaucheRobot == true)
			{
				robot3.deplacementRobotGauche = true;
				robot3.positionXRobotTableau-=1;
				nbPossibilites3=0;
			}
		}

}
// ROBOT NUMERO 3
function siNombrePossibilitesRobotEgalDeux3()
{
	if (nbPossibilites3 == 2)
		{

			if (robot3.caseHautRobot == true && robot3.caseDroiteRobot == true)
			{
				if (distance[2][0] <= distance[2][1])
				{
					robot3.deplacementRobotHaut = true;
					robot3.positionYRobotTableau-=1;
					nbPossibilites3=0;
				}
				else
				{
					robot3.deplacementRobotDroite = true;
					robot3.positionXRobotTableau+=1;
					nbPossibilites3=0;
				}
			}
			if (robot3.caseHautRobot == true && robot3.caseBasRobot == true)
			{
				if (distance[2][0] <= distance[2][2])
				{
					robot3.deplacementRobotHaut = true;
					robot3.positionYRobotTableau-=1;
					nbPossibilites3=0;
				}
				else
				{
					robot3.deplacementRobotBas = true;
					robot3.positionYRobotTableau+=1;
					nbPossibilites3=0;
				}
			}
			if (robot3.caseHautRobot == true && robot3.caseGaucheRobot == true)
			{
				if (distance[2][0] <= distance[2][3])
				{
					robot3.deplacementRobotHaut = true;
					robot3.positionYRobotTableau-=1;
					nbPossibilites3=0;
				}
				else
				{
					robot3.deplacementRobotGauche = true;
					robot3.positionXRobotTableau-=1;
					nbPossibilites3=0;
				}
			}
			if (robot3.caseDroiteRobot == true && robot3.caseBasRobot == true)
			{
				if (distance[2][1] <= distance[2][2])
				{
					robot3.deplacementRobotDroite = true;
					robot3.positionXRobotTableau+=1;
					nbPossibilites3=0;
				}
				else
				{
					robot3.deplacementRobotBas = true;
					robot3.positionYRobotTableau+=1;
					nbPossibilites3=0;
				}
			}
			if (robot3.caseDroiteRobot == true && robot3.caseGaucheRobot == true)
			{
				if (distance[2][1] <= distance[2][3])
				{
					robot3.deplacementRobotDroite = true;
					robot3.positionXRobotTableau+=1;
					nbPossibilites3=0;
				}
				else
				{
					robot3.deplacementRobotGauche = true;
					robot3.positionXRobotTableau-=1;
					nbPossibilites3=0;
				}
			}
			if (robot3.caseBasRobot == true && robot3.caseGaucheRobot == true)
			{
				if (distance[2][2] <= distance[2][3])
				{
					robot3.deplacementRobotBas = true;
					robot3.positionYRobotTableau+=1;
					nbPossibilites3=0;
				}
				else
				{
					robot3.deplacementRobotGauche = true;
					robot3.positionXRobotTableau-=1;
					nbPossibilites3=0;
				}
			}
		}

}
// ROBOT NUMERO 3
function siNombrePossibilitesRobotEgalTrois3()
{
	
		if (nbPossibilites3 == 3)
		{

			if (robot3.caseHautRobot == true && robot3.caseDroiteRobot == true && robot3.caseBasRobot == true)
			{
				if (distance[2][0] <= distance[2][1] && distance[2][0] < distance[2][2])
				{
					robot3.deplacementRobotHaut = true;
					robot3.positionYRobotTableau-=1;
					nbPossibilites3=0;
				}
				if (distance[2][1] < distance[2][0] && distance[2][1] <= distance[2][2])
				{
					robot3.deplacementRobotDroite = true;
					robot3.positionXRobotTableau+=1;
					nbPossibilites3=0;
				}
				if (distance[2][2] <= distance[2][0] && distance[2][2] < distance[2][1])
				{
					robot3.deplacementRobotBas = true;
					robot3.positionYRobotTableau+=1;
					nbPossibilites3=0;
				}
			}

			if (robot3.caseDroiteRobot == true && robot3.caseBasRobot == true && robot3.caseGaucheRobot == true)
			{
				if (distance[2][1] <= distance[2][2] && distance[2][1] < distance[2][3])
				{
					robot3.deplacementRobotDroite = true;
					robot3.positionXRobotTableau+=1;
					nbPossibilites3=0;
				}
				if (distance[2][2] < distance[2][1] && distance[2][2] <= distance[2][3])
				{
					robot3.deplacementRobotBas = true;
					robot3.positionYRobotTableau+=1;
					nbPossibilites3=0;
				}
				if (distance[2][3] <= distance[2][1] && distance[2][3] < distance[2][2])
				{
					robot3.deplacementRobotGauche = true;
					robot3.positionXRobotTableau-=1;
					nbPossibilites3=0;
				}
			}

			if (robot3.caseBasRobot == true && robot3.caseGaucheRobot == true && robot3.caseHautRobot == true)
			{
				if (distance[2][2] <= distance[2][3] && distance[2][2] < distance[2][0])
				{
					robot3.deplacementRobotBas = true;
					robot3.positionYRobotTableau+=1;
					nbPossibilites3=0;
				}
				if (distance[2][3] < distance[2][2] && distance[2][3] <= distance[2][0])
				{
					robot3.deplacementRobotGauche = true;
					robot3.positionXRobotTableau-=1;
					nbPossibilites3=0;
				}
				if (distance[2][0] <= distance[2][2] && distance[2][0] < distance[2][3])
				{
					robot3.deplacementRobotHaut = true;
					robot3.positionYRobotTableau-=1;
					nbPossibilites3=0;
				}
			}

			if (robot3.caseGaucheRobot == true && robot3.caseHautRobot == true && robot3.caseDroiteRobot == true)
			{
				if (distance[2][3] <= distance[2][0] && distance[2][3] < distance[2][1])
				{
					robot3.deplacementRobotGauche = true;
					robot3.positionXRobotTableau-=1;
					nbPossibilites3=0;
				}
				if (distance[2][0] < distance[2][3] && distance[2][0] <= distance[2][1])
				{
					robot3.deplacementRobotHaut = true;
					robot3.positionYRobotTableau-=1;
					nbPossibilites3=0;
				}
				if (distance[2][1] <= distance[2][3] && distance[2][1] < distance[2][0])
				{
					robot3.deplacementRobotDroite = true;
					robot3.positionXRobotTableau+=1;
					nbPossibilites3=0;
				}
			}

		}
}
// ROBOT NUMERO 3
function siNombrePossibilitesRobotEgalQuatre3()
{
	
		if (nbPossibilites3 >= 4)
		{

			if (distance[2][0] <= distance[2][1] && distance[2][0] < distance[2][2] && distance[2][0] < distance[2][3])
			{
				robot3.deplacementRobotHaut = true;
				robot3.positionYRobotTableau-=1;
				nbPossibilites3=0;
			}
			if (distance[2][1] < distance[2][0] && distance[2][1] <= distance[2][2] && distance[2][1] < distance[2][3])
			{
				robot3.deplacementRobotDroite = true;
				robot3.positionXRobotTableau+=1;
				nbPossibilites3=0;
			}
			if (distance[2][2] < distance[2][0] && distance[2][2] < distance[2][1] && distance[2][2] <= distance[2][3])
			{
				robot3.deplacementRobotBas = true;
				robot3.positionYRobotTableau+=1;
				nbPossibilites3=0;
			}
			if (distance[2][3] <= distance[2][0] && distance[2][3] < distance[2][1] && distance[2][3] < distance[2][2])
			{
				robot3.deplacementRobotGauche = true;
				robot3.positionXRobotTableau-=1;
				nbPossibilites3=0;
			}
		}
}

// ROBOT NUMERO 3
function deplacementRobot3()
{
		
		

		if (robot3.deplacementRobotHaut == true)
		{
			robot3.positionYRobot-=1*multiplicateur;
			image(snip3_equipe2, robot3.positionXRobot, robot3.positionYRobot);
		}
		if (robot3.deplacementRobotDroite == true)
		{
			robot3.positionXRobot+=1*multiplicateur;
			image(snip2_equipe2, robot3.positionXRobot, robot3.positionYRobot);
		}
		if (robot3.deplacementRobotBas == true)
		{
			robot3.positionYRobot+=1*multiplicateur;
			image(snip1_equipe2, robot3.positionXRobot, robot3.positionYRobot);
		}
		if (robot3.deplacementRobotGauche == true)
		{
			robot3.positionXRobot-=1*multiplicateur;
			image(snip4_equipe2, robot3.positionXRobot, robot3.positionYRobot);
		}
		
	
}






// ROBOT NUMERO 4
function positionRobotTableau4()
{
	
	robot4.timer+=1;
	robot4.timerCible+=1;
	if (robot4.timerCible >= nombreDeplacementsRobot4*30) //nombre de deplacement * taille d'une case * multiplicateur
	{
		robot4.cible = Math.floor(Math.random()*7);
		robot4.timerCible = 0;
	}
	
	if (robot4.cible == 0)
	{
		nombreDeplacementsRobot4 = 4;
		distance[3][0] = int(dist(x_joueur, y_joueur, robot4.positionXRobot, robot4.positionYRobot-3));
		distance[3][1] = int(dist(x_joueur, y_joueur, robot4.positionXRobot+3, robot4.positionYRobot));
		distance[3][2] = int(dist(x_joueur, y_joueur, robot4.positionXRobot, robot4.positionYRobot+3));
		distance[3][3] = int(dist(x_joueur, y_joueur, robot4.positionXRobot-3, robot4.positionYRobot));
	}
	if (robot4.cible == 1)
	{
		nombreDeplacementsRobot4 = 4;
		distance[3][0] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot4.positionXRobot, robot4.positionYRobot-3));
		distance[3][1] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot4.positionXRobot+3, robot4.positionYRobot));
		distance[3][2] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot4.positionXRobot, robot4.positionYRobot+3));
		distance[3][3] = int(dist(robot1.positionXRobot, robot1.positionYRobot, robot4.positionXRobot-3, robot4.positionYRobot));
	}
	if (robot4.cible == 2)
	{
		nombreDeplacementsRobot4 = 4;
		distance[3][0] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot4.positionXRobot, robot4.positionYRobot-3));
		distance[3][1] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot4.positionXRobot+3, robot4.positionYRobot));
		distance[3][2] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot4.positionXRobot, robot4.positionYRobot+3));
		distance[3][3] = int(dist(robot2.positionXRobot, robot2.positionYRobot, robot4.positionXRobot-3, robot4.positionYRobot));
	}
	if (robot4.cible == 3) //coin supérieur gauche
	{
		nombreDeplacementsRobot4 = 8;
		distance[3][0] = int(dist(25, 25, robot4.positionXRobot, robot4.positionYRobot-3));
		distance[3][1] = int(dist(25, 25, robot4.positionXRobot+3, robot4.positionYRobot));
		distance[3][2] = int(dist(25, 25, robot4.positionXRobot, robot4.positionYRobot+3));
		distance[3][3] = int(dist(25, 25, robot4.positionXRobot-3, robot4.positionYRobot));
	}
	if (robot4.cible == 4) //coin supérieur droite
	{
		nombreDeplacementsRobot4 = 8;
		distance[3][0] = int(dist(24*30*multiplicateur, 25, robot4.positionXRobot, robot4.positionYRobot-3));
		distance[3][1] = int(dist(24*30*multiplicateur, 25, robot4.positionXRobot+3, robot4.positionYRobot));
		distance[3][2] = int(dist(24*30*multiplicateur, 25, robot4.positionXRobot, robot4.positionYRobot+3));
		distance[3][3] = int(dist(24*30*multiplicateur, 25, robot4.positionXRobot-3, robot4.positionYRobot));
	}
	if (robot4.cible == 5) //coin inférieur gauche
	{
		nombreDeplacementsRobot4 = 8;
		distance[3][0] = int(dist(25, 17*30*multiplicateur, robot4.positionXRobot, robot4.positionYRobot-3));
		distance[3][1] = int(dist(25, 17*30*multiplicateur, robot4.positionXRobot+3, robot4.positionYRobot));
		distance[3][2] = int(dist(25, 17*30*multiplicateur, robot4.positionXRobot, robot4.positionYRobot+3));
		distance[3][3] = int(dist(25, 17*30*multiplicateur, robot4.positionXRobot-3, robot4.positionYRobot));
	}
	if (robot4.cible == 6) //coin inférieur droite
	{
		nombreDeplacementsRobot4 = 8;
		distance[3][0] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot4.positionXRobot, robot4.positionYRobot-3));
		distance[3][1] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot4.positionXRobot+3, robot4.positionYRobot));
		distance[3][2] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot4.positionXRobot, robot4.positionYRobot+3));
		distance[3][3] = int(dist(24*30*multiplicateur, 17*30*multiplicateur, robot4.positionXRobot-3, robot4.positionYRobot));
	}
	
	
	
	
	if (robot4.timer >= 30)
	{
		
		robot4.deplacementRobotHaut = false;
		robot4.deplacementRobotDroite = false;
		robot4.deplacementRobotBas = false;
		robot4.deplacementRobotGauche = false;
		
		verificationObstacleAutourRobot4();
		siNombrePossibilitesRobotEgalUn4();
		siNombrePossibilitesRobotEgalDeux4();
		siNombrePossibilitesRobotEgalTrois4();
		siNombrePossibilitesRobotEgalQuatre4();
		
		robot4.timer=0;
	}
	
}

	// ROBOT NUMERO 4
function verificationObstacleAutourRobot4()
{
	
		
		//verification obstacle au dessus
		if (carte[robot4.positionYRobotTableau-1+1][robot4.positionXRobotTableau+1] == 0)
		{
			robot4.caseHautRobot = true;
			nbPossibilites4+=1;
		}
		else
		{
			robot4.caseHautRobot = false;
		}

		//verification obstacle à droite
		if (carte[robot4.positionYRobotTableau+1][robot4.positionXRobotTableau+1+1] == 0)
		{
			robot4.caseDroiteRobot = true;
			nbPossibilites4+=1;
		}
		else
		{
			robot4.caseDroiteRobot = false;
		}

		//verification obstacle en dessous
		if (carte[robot4.positionYRobotTableau+1+1][robot4.positionXRobotTableau+1] == 0)
		{

			robot4.caseBasRobot = true;
			nbPossibilites4+=1;
		}
		else
		{
			robot4.caseBasRobot = false;
		}

		//verification obstacle à gauche
		if (carte[robot4.positionYRobotTableau+1][robot4.positionXRobotTableau-1+1] == 0)
		{
			robot4.caseGaucheRobot = true;
			nbPossibilites4+=1;
		}
		else
		{
			robot4.caseGaucheRobot = false;
		}
		
}

// ROBOT NUMERO 4
function siNombrePossibilitesRobotEgalUn4()
{
	
		if (nbPossibilites4 == 1)
		{
			if (robot4.caseHautRobot == true)
			{
				robot4.deplacementRobotHaut = true;
				robot4.positionYRobotTableau-=1;
				nbPossibilites4=0;
			}
			if (robot4.caseDroiteRobot == true)
			{
				robot4.deplacementRobotDroite = true;
				robot4.positionXRobotTableau+=1;
				nbPossibilites4=0;
			}
			if (robot4.caseBasRobot == true)
			{
				robot4.deplacementRobotBas = true;
				robot4.positionYRobotTableau+=1;
				nbPossibilites4=0;
			}
			if (robot4.caseGaucheRobot == true)
			{
				robot4.deplacementRobotGauche = true;
				robot4.positionXRobotTableau-=1;
				nbPossibilites4=0;
			}
		}

}
// ROBOT NUMERO 4
function siNombrePossibilitesRobotEgalDeux4()
{
	if (nbPossibilites4 == 2)
		{

			if (robot4.caseHautRobot == true && robot4.caseDroiteRobot == true)
			{
				if (distance[3][0] <= distance[3][1])
				{
					robot4.deplacementRobotHaut = true;
					robot4.positionYRobotTableau-=1;
					nbPossibilites4=0;
				}
				else
				{
					robot4.deplacementRobotDroite = true;
					robot4.positionXRobotTableau+=1;
					nbPossibilites4=0;
				}
			}
			if (robot4.caseHautRobot == true && robot4.caseBasRobot == true)
			{
				if (distance[3][0] <= distance[3][2])
				{
					robot4.deplacementRobotHaut = true;
					robot4.positionYRobotTableau-=1;
					nbPossibilites4=0;
				}
				else
				{
					robot4.deplacementRobotBas = true;
					robot4.positionYRobotTableau+=1;
					nbPossibilites4=0;
				}
			}
			if (robot4.caseHautRobot == true && robot4.caseGaucheRobot == true)
			{
				if (distance[3][0] <= distance[3][3])
				{
					robot4.deplacementRobotHaut = true;
					robot4.positionYRobotTableau-=1;
					nbPossibilites4=0;
				}
				else
				{
					robot4.deplacementRobotGauche = true;
					robot4.positionXRobotTableau-=1;
					nbPossibilites4=0;
				}
			}
			if (robot4.caseDroiteRobot == true && robot4.caseBasRobot == true)
			{
				if (distance[3][1] <= distance[3][2])
				{
					robot4.deplacementRobotDroite = true;
					robot4.positionXRobotTableau+=1;
					nbPossibilites4=0;
				}
				else
				{
					robot4.deplacementRobotBas = true;
					robot4.positionYRobotTableau+=1;
					nbPossibilites4=0;
				}
			}
			if (robot4.caseDroiteRobot == true && robot4.caseGaucheRobot == true)
			{
				if (distance[3][1] <= distance[3][3])
				{
					robot4.deplacementRobotDroite = true;
					robot4.positionXRobotTableau+=1;
					nbPossibilites4=0;
				}
				else
				{
					robot4.deplacementRobotGauche = true;
					robot4.positionXRobotTableau-=1;
					nbPossibilites4=0;
				}
			}
			if (robot4.caseBasRobot == true && robot4.caseGaucheRobot == true)
			{
				if (distance[3][2] <= distance[3][3])
				{
					robot4.deplacementRobotBas = true;
					robot4.positionYRobotTableau+=1;
					nbPossibilites4=0;
				}
				else
				{
					robot4.deplacementRobotGauche = true;
					robot4.positionXRobotTableau-=1;
					nbPossibilites4=0;
				}
			}
		}

}
// ROBOT NUMERO 4
function siNombrePossibilitesRobotEgalTrois4()
{
	
		if (nbPossibilites4 == 3)
		{

			if (robot4.caseHautRobot == true && robot4.caseDroiteRobot == true && robot4.caseBasRobot == true)
			{
				if (distance[3][0] <= distance[3][1] && distance[3][0] < distance[3][2])
				{
					robot4.deplacementRobotHaut = true;
					robot4.positionYRobotTableau-=1;
					nbPossibilites4=0;
				}
				if (distance[3][1] < distance[3][0] && distance[3][1] <= distance[3][2])
				{
					robot4.deplacementRobotDroite = true;
					robot4.positionXRobotTableau+=1;
					nbPossibilites4=0;
				}
				if (distance[3][2] <= distance[3][0] && distance[3][2] < distance[3][1])
				{
					robot4.deplacementRobotBas = true;
					robot4.positionYRobotTableau+=1;
					nbPossibilites4=0;
				}
			}

			if (robot4.caseDroiteRobot == true && robot4.caseBasRobot == true && robot4.caseGaucheRobot == true)
			{
				if (distance[3][1] <= distance[3][2] && distance[3][1] < distance[3][3])
				{
					robot4.deplacementRobotDroite = true;
					robot4.positionXRobotTableau+=1;
					nbPossibilites4=0;
				}
				if (distance[3][2] < distance[3][1] && distance[3][2] <= distance[3][3])
				{
					robot4.deplacementRobotBas = true;
					robot4.positionYRobotTableau+=1;
					nbPossibilites4=0;
				}
				if (distance[3][3] <= distance[3][1] && distance[3][3] < distance[3][2])
				{
					robot4.deplacementRobotGauche = true;
					robot4.positionXRobotTableau-=1;
					nbPossibilites4=0;
				}
			}

			if (robot4.caseBasRobot == true && robot4.caseGaucheRobot == true && robot4.caseHautRobot == true)
			{
				if (distance[3][2] <= distance[3][3] && distance[3][2] < distance[3][0])
				{
					robot4.deplacementRobotBas = true;
					robot4.positionYRobotTableau+=1;
					nbPossibilites4=0;
				}
				if (distance[3][3] < distance[3][2] && distance[3][3] <= distance[3][0])
				{
					robot4.deplacementRobotGauche = true;
					robot4.positionXRobotTableau-=1;
					nbPossibilites4=0;
				}
				if (distance[3][0] <= distance[3][2] && distance[3][0] < distance[3][3])
				{
					robot4.deplacementRobotHaut = true;
					robot4.positionYRobotTableau-=1;
					nbPossibilites4=0;
				}
			}

			if (robot4.caseGaucheRobot == true && robot4.caseHautRobot == true && robot4.caseDroiteRobot == true)
			{
				if (distance[3][3] <= distance[3][0] && distance[3][3] < distance[3][1])
				{
					robot4.deplacementRobotGauche = true;
					robot4.positionXRobotTableau-=1;
					nbPossibilites4=0;
				}
				if (distance[3][0] < distance[3][3] && distance[3][0] <= distance[3][1])
				{
					robot4.deplacementRobotHaut = true;
					robot4.positionYRobotTableau-=1;
					nbPossibilites4=0;
				}
				if (distance[3][1] <= distance[3][3] && distance[3][1] < distance[3][0])
				{
					robot4.deplacementRobotDroite = true;
					robot4.positionXRobotTableau+=1;
					nbPossibilites4=0;
				}
			}

		}
}
// ROBOT NUMERO 4
function siNombrePossibilitesRobotEgalQuatre4()
{
	
		if (nbPossibilites4 >= 4)
		{

			if (distance[3][0] <= distance[3][1] && distance[3][0] < distance[3][2] && distance[3][0] < distance[3][3])
			{
				robot4.deplacementRobotHaut = true;
				robot4.positionYRobotTableau-=1;
				nbPossibilites4=0;
			}
			if (distance[3][1] < distance[3][0] && distance[3][1] <= distance[3][2] && distance[3][1] < distance[3][3])
			{
				robot4.deplacementRobotDroite = true;
				robot4.positionXRobotTableau+=1;
				nbPossibilites4=0;
			}
			if (distance[3][2] < distance[3][0] && distance[3][2] < distance[3][1] && distance[3][2] <= distance[3][3])
			{
				robot4.deplacementRobotBas = true;
				robot4.positionYRobotTableau+=1;
				nbPossibilites4=0;
			}
			if (distance[3][3] <= distance[3][0] && distance[3][3] < distance[3][1] && distance[3][3] < distance[3][2])
			{
				robot4.deplacementRobotGauche = true;
				robot4.positionXRobotTableau-=1;
				nbPossibilites4=0;
			}
		}
}

// ROBOT NUMERO 4
function deplacementRobot4()
{
		
		

		if (robot4.deplacementRobotHaut == true)
		{
			robot4.positionYRobot-=1*multiplicateur;
			image(snip3_equipe2, robot4.positionXRobot, robot4.positionYRobot);
		}
		if (robot4.deplacementRobotDroite == true)
		{
			robot4.positionXRobot+=1*multiplicateur;
			image(snip2_equipe2, robot4.positionXRobot, robot4.positionYRobot);
		}
		if (robot4.deplacementRobotBas == true)
		{
			robot4.positionYRobot+=1*multiplicateur;
			image(snip1_equipe2, robot4.positionXRobot, robot4.positionYRobot);
		}
		if (robot4.deplacementRobotGauche == true)
		{
			robot4.positionXRobot-=1*multiplicateur;
			image(snip4_equipe2, robot4.positionXRobot, robot4.positionYRobot);
		}
		
	
}





function imageJoueur()
{
	
	
	snip1.resize(23*multiplicateur,28*multiplicateur);
	snip2.resize(35*multiplicateur,18*multiplicateur);
	snip3.resize(23*multiplicateur,28*multiplicateur);
	snip4.resize(35*multiplicateur,18*multiplicateur);
	snip5.resize(29*multiplicateur,24*multiplicateur);	
	snip6.resize(29*multiplicateur,26*multiplicateur);
	snip7.resize(29*multiplicateur,23*multiplicateur);
	snip8.resize(24*multiplicateur,26*multiplicateur);
	
	snip1_equipe1.resize(23*multiplicateur,28*multiplicateur);
	snip2_equipe1.resize(35*multiplicateur,18*multiplicateur);
	snip3_equipe1.resize(23*multiplicateur,28*multiplicateur);
	snip4_equipe1.resize(35*multiplicateur,18*multiplicateur);
	snip5_equipe1.resize(29*multiplicateur,24*multiplicateur);	
	snip6_equipe1.resize(29*multiplicateur,26*multiplicateur);
	snip7_equipe1.resize(29*multiplicateur,23*multiplicateur);
	snip8_equipe1.resize(24*multiplicateur,26*multiplicateur);
	
	snip1_equipe2.resize(23*multiplicateur,28*multiplicateur);
	snip2_equipe2.resize(35*multiplicateur,18*multiplicateur);
	snip3_equipe2.resize(23*multiplicateur,28*multiplicateur);
	snip4_equipe2.resize(35*multiplicateur,18*multiplicateur);
	snip5_equipe2.resize(29*multiplicateur,24*multiplicateur);	
	snip6_equipe2.resize(29*multiplicateur,26*multiplicateur);
	snip7_equipe2.resize(29*multiplicateur,23*multiplicateur);
	snip8_equipe2.resize(24*multiplicateur,26*multiplicateur);
	
	k1_equipe1.resize(23*multiplicateur,28*multiplicateur);
	k2_equipe1.resize(35*multiplicateur,18*multiplicateur);
	k3_equipe1.resize(23*multiplicateur,28*multiplicateur);
	k4_equipe1.resize(35*multiplicateur,18*multiplicateur);
	k5_equipe1.resize(29*multiplicateur,24*multiplicateur);	
	k6_equipe1.resize(29*multiplicateur,26*multiplicateur);
	k7_equipe1.resize(29*multiplicateur,23*multiplicateur);
	k8_equipe1.resize(24*multiplicateur,26*multiplicateur);
	
	k1_equipe2.resize(23*multiplicateur,28*multiplicateur);
	k2_equipe2.resize(35*multiplicateur,18*multiplicateur);
	k3_equipe2.resize(23*multiplicateur,28*multiplicateur);
	k4_equipe2.resize(35*multiplicateur,18*multiplicateur);
	k5_equipe2.resize(29*multiplicateur,24*multiplicateur);	
	k6_equipe2.resize(29*multiplicateur,26*multiplicateur);
	k7_equipe2.resize(29*multiplicateur,23*multiplicateur);
	k8_equipe2.resize(24*multiplicateur,26*multiplicateur);
	
	mur_haut.resize(33*multiplicateur, 21.6*multiplicateur*1.4);
	mur_bas.resize(33*multiplicateur, 13.9*multiplicateur);
	
	
  if (keyIsDown(83)) {
	X = 1;
  }
  if (keyIsDown(68)) {
	X = 2;
  }

  if (keyIsDown(90)) {
	X = 3;
  }
	if (keyIsDown(81)) {
	X = 4;
  }
	if (keyIsDown(83)&& keyIsDown(68)) {
	X = 6;
	}
	if (keyIsDown(83)&& keyIsDown(81)) {
	X = 5;
	}
	if (keyIsDown(90)&& keyIsDown(68)) {
	X = 7;
	}
	if (keyIsDown(90)&& keyIsDown(81)) {
	X = 8;
	}
	if (X==1) {
	image(snip1_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X==2) {
	image(snip2_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X==3) {
	image(snip3_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X==4) {
	image(snip4_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X==5) {
	image(snip5_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X==6) {
	image(snip6_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X==7) {
	image(snip7_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X==8) {
	image(snip8_equipe1, x_joueur, y_joueur);
	//(20*multiplicateur,27*multiplicateur);
	}
	
	
	
	
	
	
	
	
  if (keyIsDown(40)) {
	X2 = 1;
  }
  if (keyIsDown(39)) {
	X2 = 2;
  }

  if (keyIsDown(38)) {
	X2 = 3;
  }
	if (keyIsDown(37)) {
	X2 = 4;
  }
	if (keyIsDown(37)&& keyIsDown(40)) {
	X2 = 5;
	}
	if (keyIsDown(39)&& keyIsDown(40)) {
	X2 = 6;
	}
	if (keyIsDown(38)&& keyIsDown(39)) {
	X2 = 7;
	}
	if (keyIsDown(37)&& keyIsDown(38)) {
	X2 = 8;
	}
	if (X2==1) {
	image(snip1_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X2==2) {
	image(snip2_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X2==3) {
	image(snip3_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X2==4) {
	image(snip4_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X2==5) {
	image(snip5_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X2==6) {
	image(snip6_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X2==7) {
	image(snip7_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}
	if (X2==8) {
	image(snip8_equipe2, x_joueur2, y_joueur2);
	//(20*multiplicateur,27*multiplicateur);
	}	
}

function detectionCollisionJoueur1()
{
	
	for (var i = 0; i < comptage; i++) { //collision par droite, gauche, haut, bas
	if (x_joueur <= coordonnes_obstacle[0][i] + 25*multiplicateur && x_joueur + 20*multiplicateur >= coordonnes_obstacle[0][i] && y_joueur + 24*multiplicateur >= coordonnes_obstacle[1][i] && y_joueur <= coordonnes_obstacle[1][i] + 20*multiplicateur)
	{
	if (x_joueur <= coordonnes_obstacle[0][i] + 25*multiplicateur && x_joueur >=  coordonnes_obstacle[0][i] + 25*multiplicateur - vittesse_joueur)
	{
	//collision par la droite
	x_joueur += multiplicateur;
	}
	if (x_joueur + 20*multiplicateur >= coordonnes_obstacle[0][i] && x_joueur + 20*multiplicateur - vittesse_joueur <= coordonnes_obstacle[0][i])
	{
	//collision par la gauche
	x_joueur -= multiplicateur;
	}
	if (y_joueur + 24*multiplicateur >= coordonnes_obstacle[1][i] && y_joueur + 24*multiplicateur - vittesse_joueur <= coordonnes_obstacle[1][i])
	{
	//collision par le haut    
	y_joueur -= multiplicateur;
	}
	if (y_joueur <= coordonnes_obstacle[1][i] + 20*multiplicateur && y_joueur >= coordonnes_obstacle[1][i] + 20*multiplicateur - vittesse_joueur )
	{
	//collision par le bas
	y_joueur += multiplicateur;
	}
	}
	}
	
	
}



function detectionCollisionJoueur2()
{
	for (var i = 0; i < comptage; i++) { //collision par droite, gauche, haut, bas
	if (x_joueur2 <= coordonnes_obstacle[0][i] + 25*multiplicateur && x_joueur2 + 20*multiplicateur >= coordonnes_obstacle[0][i] && y_joueur2 + 24*multiplicateur >= coordonnes_obstacle[1][i] && y_joueur2 <= coordonnes_obstacle[1][i] + 20*multiplicateur)
	{
	if (x_joueur2 <= coordonnes_obstacle[0][i] + 25*multiplicateur && x_joueur2 >=  coordonnes_obstacle[0][i] + 25*multiplicateur - vittesse_joueur)
	{
	//collision par la droite
	x_joueur2 += multiplicateur;
	}
	if (x_joueur2 + 20*multiplicateur >= coordonnes_obstacle[0][i] && x_joueur2 + 20*multiplicateur - vittesse_joueur <= coordonnes_obstacle[0][i])
	{
	//collision par la gauche
	x_joueur2 -= multiplicateur;
	}
	if (y_joueur2 + 24*multiplicateur >= coordonnes_obstacle[1][i] && y_joueur2 + 24*multiplicateur - vittesse_joueur <= coordonnes_obstacle[1][i])
	{
	//collision par le haut    
	y_joueur2 -= multiplicateur;
	}
	if (y_joueur2 <= coordonnes_obstacle[1][i] + 20*multiplicateur && y_joueur2 >= coordonnes_obstacle[1][i] + 20*multiplicateur - vittesse_joueur )
	{
	//collision par le bas
	y_joueur2 += multiplicateur;
	}
	}
	}
	
}

function deplacementJoueur()
{
	
	if (x_joueur > 25)
	{
	if (keyIsDown(81)) { //aller à gauche
	x_joueur -= vittesse_joueur;
	}
	}
	
	if (x_joueur < 750*multiplicateur-15*multiplicateur+25)
	{
	if (keyIsDown(68)) { //aller à droite
	x_joueur += vittesse_joueur;
	}
	}
	
	if (y_joueur > 25 - 5*multiplicateur)
	{
	if (keyIsDown(90)) { //aller en haut
	y_joueur -= vittesse_joueur;
	}
	}
	
	if (y_joueur < 540*multiplicateur-23*multiplicateur+25)
	{
	if (keyIsDown(83)) { //aller en bas
	y_joueur += vittesse_joueur;
	}
	}
	
	
	
	if (x_joueur2 > 25)
	{
	if (keyIsDown(37)) { //aller à gauche
	x_joueur2 -= vittesse_joueur;
	}
	}
	
	if (x_joueur2 < 750*multiplicateur-15*multiplicateur+25)
	{
	if (keyIsDown(39)) { //aller à droite
	x_joueur2 += vittesse_joueur;
	}
	}
	
	if (y_joueur2 > 25 - 5*multiplicateur)
	{
	if (keyIsDown(38)) { //aller en haut
	y_joueur2 -= vittesse_joueur;
	}
	}
	
	if (y_joueur2 < 540*multiplicateur-23*multiplicateur+25)
	{
	if (keyIsDown(40)) { //aller en bas
	y_joueur2 += vittesse_joueur;
	}
	}
}




function tirJoueur1()
{
	
	if (keyIsDown(78)) {
		angle += 0.05;
	}

	if (keyIsDown(66)) {
		angle -= 0.05;
	}

	fill(150,0,0);
	arc(x_joueur+15*multiplicateur, y_joueur+15*multiplicateur, 50*multiplicateur, 50*multiplicateur,angle-0.05, angle+0.05);
	

    if(keyIsDown(32)){
		if(tirer[0] == false){
			tirer[0] = true;
			x_balle[0] = x_joueur;
			y_balle[0] = y_joueur;
			angle_balle[0] = angle;
			console.log(angle_balle[0]);
		}
	}
	
	
	if(tirer[0] == true)
	{
		fill(0,0,256);
		ellipse(x_balle[0]+15*multiplicateur,y_balle[0]+15*multiplicateur,2.5*multiplicateur,2.5*multiplicateur);
		x_balle[0] += multiplicateur*5*cos(angle_balle[0]);
		y_balle[0] += multiplicateur*5*sin(angle_balle[0]);
		
		x_balle2[0] = x_balle[0]+15*multiplicateur;
		y_balle2[0] = y_balle[0]+15*multiplicateur;
		temps_balle[0] +=1;
		
		if(temps_balle[0] == 60){
			tirer[0] = false;
			temps_balle[0] = 0;
		}
	}
}
function tirJoueur2()
{
	
	if (keyIsDown(99)) {
		angleJ2 += 0.05;
	}

	if (keyIsDown(97)) {
		angleJ2 -= 0.05;
	}

	fill(150,0,0);
	arc(x_joueur2+15*multiplicateur, y_joueur2+15*multiplicateur, 50*multiplicateur, 50*multiplicateur,angleJ2-0.05, angleJ2+0.05);
	

    if(keyIsDown(98)){
		if(tirer[1] == false){
			tirer[1] = true;
			x_balle[1] = x_joueur2;
			y_balle[1] = y_joueur2;
			angle_balle[1] = angleJ2;
		}
	}

	
	if(tirer[1] == true)
	{
		fill(256,0,0);
		ellipse(x_balle[1]+15*multiplicateur,y_balle[1]+15*multiplicateur,2.5*multiplicateur,2.5*multiplicateur);
		x_balle[1] += multiplicateur*4*cos(angle_balle[1]);
		y_balle[1] += multiplicateur*4*sin(angle_balle[1]);
		x_balle2[1] = x_balle[1]+15*multiplicateur;
		y_balle2[1] = y_balle[1]+15*multiplicateur;
		temps_balle[1] +=1;
		
		if(temps_balle[1] == 60){
			tirer[1] = false;
			temps_balle[1] = 0;
		}
	}
}

function detectionCollisionProjectileSurObstacles()
{
	for (var i = 0; i < comptage; i++)  //collision par droite, gauche, haut, bas
	{
		if(tirer[0] == true)
		{
			if (x_balle2[0] < coordonnes_obstacle[0][i] + 30*multiplicateur && x_balle2[0] > coordonnes_obstacle[0][i] && y_balle2[0]+10*multiplicateur> coordonnes_obstacle[1][i] && y_balle2[0] < coordonnes_obstacle[1][i] + 30*multiplicateur)
			{	
				tirer[0] = false;
				x_balle[0] = x_joueur;
				y_balle[0] = y_joueur;
				x_balle2[0] = 0;
				y_balle2[1] = 0;
				temps_balle[0] = 0;
			}
		}
		
		if(tirer[1] == true)
		{
			if (x_balle2[1] < coordonnes_obstacle[0][i] + 30*multiplicateur && x_balle2[1] > coordonnes_obstacle[0][i] && y_balle2[1]+10*multiplicateur > coordonnes_obstacle[1][i] && y_balle2[1] < coordonnes_obstacle[1][i] + 30*multiplicateur)
			{	
			
				tirer[1] = false;
				x_balle[1] = x_joueur2;
				y_balle[1] = y_joueur2;
				x_balle2[1] = 0;
				y_balle2[1] = 0;
				temps_balle[1] = 0;
			}
		}
	}
	
}


function affichage_vie(x,y,numerojoueur){
	noStroke();
	fill(139,0,0);
	rect(x-15,y+10,30,10);
	
	fill(50,205,50);
	rect(x-15,y+10,vie_personnage[numerojoueur]*6,10);
}

function mort() {
	
	if (vie_personnage[0] <= 0) {
	x_joueur = xapparitionjoueur[0];
	y_joueur = yapparitionjoueur[0];
	vie_personnage[0] = 5;
	}
	
	if (vie_personnage[1] <= 0) {
	x_joueur2 = xapparitionjoueur[1];
	y_joueur2 = yapparitionjoueur[1];
	vie_personnage[1] = 5;
	}
}

function detectionCollisionProjectile(){
	distance_balle_joueur[0]=dist(x_joueur+10*multiplicateur,y_joueur+15*multiplicateur,x_balle2[1],y_balle2[1]); //distance entre le missile du joueur 2 et la position du joueur 1
	distance_balle_joueur[1]=dist(x_joueur2+10*multiplicateur,y_joueur2+15*multiplicateur,x_balle2[0],y_balle2[0]); //distance entre le missile du joueur 1 et la position du joueur 2
	
	if (distance_balle_joueur[0] <= 15*multiplicateur)
	{
		if(vie_personnage[0] != 0)
		{
			vie_personnage[0]-=1;
		}
			tirer[1] = false;
			x_balle[1] = x_joueur2;
			y_balle[1] = y_joueur2;
			x_balle2[1] = 0;
			y_balle2[1] = 0;
			temps_balle[1] = 0;
		}
		if (distance_balle_joueur[1] <= 15*multiplicateur)
		{
				
			if(vie_personnage[1] != 0)
			{
				vie_personnage[1]-=1;
			}
			
			tirer[0] = false;
			x_balle[0] = x_joueur;
			y_balle[0] = y_joueur;
			x_balle2[0] = 0;
			y_balle2[0] = 0;
			temps_balle[0] = 0;
		}
	
}

function carte_collision(debut)
{
	var initialisation = debut;
	noStroke();

	rect(position_carte,position_carte,750*multiplicateur,540*multiplicateur);

	
	fill(244,164,96);
	quadrillage(8,0,initialisation);
	quadrillage(9,0,initialisation);
	quadrillage(8,1,initialisation);
	quadrillage(9,1,initialisation);
	quadrillage(8,2,initialisation);
	quadrillage(9,2,initialisation);
	quadrillage(8,3,initialisation);
	quadrillage(9,3,initialisation);
	quadrillage(15,0,initialisation);
	quadrillage(16,0,initialisation);
	quadrillage(17,0,initialisation);
	quadrillage(18,0,initialisation);
	quadrillage(15,1,initialisation);
	quadrillage(16,1,initialisation);
	quadrillage(17,1,initialisation);
	quadrillage(18,1,initialisation);
	quadrillage(16,2,initialisation);
	quadrillage(17,2,initialisation);
	quadrillage(17,3,initialisation);
	quadrillage(22,2,initialisation);
	quadrillage(23,4,initialisation);
	quadrillage(24,4,initialisation);
	quadrillage(3,3,initialisation);
	quadrillage(3,4,initialisation);
	quadrillage(3,5,initialisation);
	quadrillage(4,3,initialisation);
	quadrillage(5,3,initialisation);
	quadrillage(5,5,initialisation);
	quadrillage(5,6,initialisation);
	quadrillage(1,7,initialisation);
	quadrillage(2,7,initialisation);
	quadrillage(12,4,initialisation);
	quadrillage(13,4,initialisation);
	quadrillage(13,6,initialisation);
	quadrillage(14,6,initialisation);
	quadrillage(15,6,initialisation);
	quadrillage(16,6,initialisation);
	quadrillage(17,6,initialisation);
	quadrillage(13,7,initialisation);
	quadrillage(14,7,initialisation);
	quadrillage(17,7,initialisation);
	quadrillage(17,8,initialisation);
	quadrillage(23,6,initialisation);
	quadrillage(23,7,initialisation);
	quadrillage(23,8,initialisation);
	
	fill(85,107,47);

}

function affichageObstaclesEtJoueur()
{
	for (var i=0; i<comptage+1; i+=2)
	{
		image(mur_bas, coordonnes_obstacle[0][i]-3*multiplicateur, coordonnes_obstacle[1][i]+18*multiplicateur);
		image(mur_bas, coordonnes_obstacle[0][comptage+1-i]-3*multiplicateur, coordonnes_obstacle[1][comptage+1-i]+18*multiplicateur);
	}
	
	
	imageJoueur();
	
	for (var i=0; i<comptage+1; i+=2)
	{
		image(mur_haut, coordonnes_obstacle[0][i]-3*multiplicateur, coordonnes_obstacle[1][i]-12*multiplicateur);
		image(mur_haut, coordonnes_obstacle[0][comptage+1-i]-3*multiplicateur, coordonnes_obstacle[1][comptage+1-i]-12*multiplicateur);
	}
	
	
	
	
}

function quadrillage(x,y,debut)
{
	if(debut == true){
		if (initialisationCarteAZero == true)
		{
			for (var i=1; i < 19; i++)
		{
			for (var j=1; j < 26; j++)
			{
				carte[i][j]=0;
			}
		}
		initialisationCarteAZero = false;
	}
	coordonnes_obstacle[0][comptage] = position_carte + x*30*multiplicateur;
	coordonnes_obstacle[1][comptage] = position_carte + y*30*multiplicateur;
	coordonnes_obstacle[0][comptage + 1] = position_carte + (24-x)*30*multiplicateur;
	coordonnes_obstacle[1][comptage + 1] = position_carte + (17-y)*30*multiplicateur;
	comptage+=2;
	
	for (var i=0; i < 27; i++)
	{
		carte[0][i]=1;
		carte[19][i]=1;
	}
	for (var i=0; i < 20; i++)
	{
		carte[i][0]=1;
		carte[i][26]=1;
	}
	
		carte[y+1][x+1] = 1;
		carte[17-y+1][24-x+1] = 1;
	
	}
	
	
	

}
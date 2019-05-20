var comptage = 0; //variable qui indique la position de l'obstacle dans le tableau 'coordonnes_obstacle' lors du premier d�marrage

var multiplicateur = 2; //redimensionnement des objets en fonction de la taille de l'�cran

var xapparitionjoueur = [2*30*multiplicateur, 30*24*multiplicateur];
var yapparitionjoueur = [30*multiplicateur, 30*17*multiplicateur];
var xapparitionrobots = [0,0,24,24];
var yapparitionrobots = [8,17,9,0];

var position_carte = 25; // position X et Y du coin sup�rieur gauche de la carte

var x_joueur = position_carte + multiplicateur; //coordonn�es des 2 joueurs
var y_joueur = position_carte + multiplicateur;
var x_joueur2 = position_carte + 24*30*multiplicateur;
var y_joueur2 = position_carte + 17*30*multiplicateur;

var angle = (Math.PI/4); // A COMPLETER
var angleJ2 = (-3*Math.PI/4); // A COMPLETER
var vittesse_joueur = multiplicateur; // vitesse des joueurs --> x pixels/tick
var tirer = [false,false]; 						//si la balle doit �tre tir�e ou non
var x_balle = [];		 // position X de la balle
var y_balle = []; 	 // position Y de la balle
var angle_balle = []; 
var temps_balle = [0,0]; // dur�e de l'apparition de la balle
var directions_joueurs = [1,1]; //Direction de chaque joueur, pour orienter leurs images
var distance_balle_joueur = []; //distance entre la balle et le joueur
var vie_personnage = [5,5]; //vie des personnages
var ciblesEquipe1 = [2, 5, 6, 7, 8, 9, 10]; //Numéro des cibles des robots de l'équipe 1 : joueur2 (2), robot3 (5) et robot4 (6)
var ciblesEquipe2 = [1, 3, 4, 7, 8, 9, 10]; //joueur1, robot1 et robot2   7 : coin supérieur gauche / 8 : coin supérieur droit / 9 : coin inférieur droit / 10 : coin inférieur gauche
var images_snip = [];

var coordonnes_obstacle = []; //tableau contenant les coordonn�es X et Y des obstacles
coordonnes_obstacle[0] = [];
coordonnes_obstacle[1] = [];

var carte = []; // initialise la carte vide
for (var i=0; i < 20; i++) {
	carte[i] = [];
}
var initialisationCarteAZero = true; 

//Définition de l'objet robot
function objetRobots(equipe, positionXRobotTableau, positionYRobotTableau) {
	this.equipe = equipe; 																//Equipe du robot : 1 ou 2 (bleu ou rouge)
	this.positionXRobotTableau = positionXRobotTableau; 	//Position du robot dans la grille des obstacles
	this.positionYRobotTableau = positionYRobotTableau;
	this.positionXRobot = positionXRobotTableau*30*multiplicateur+25;   							//Position X et Y du robot sur l'écran
	this.positionYRobot = positionYRobotTableau*30*multiplicateur+25;
	this.cible = -1; 																			//Numéro de la cible du robot, peut prendre certaines valeurs selon son équipe, défini par positionTableauRobot
	this.timer = 0; 																			//Timer : le robot 
	this.timerCible = 10000000; 													//Timer : le robot choisit un nouvelle cible aléatoire quand il atteint un limite
	this.direction = 1;																		//La direction actuelle du robot pour pouvoir l'afficher
	this.xDeplacement = 0;																//Comment se déplacer à chaque actualisation
	this.yDeplacement = 0;
	this.timerTir = 0;																		//Le robot tire tous les 60 ticks
	this.positionBalle = [0,0];
	this.deplacementBalle = [0,0];
	this.afficherBalle = false;
	this.tempsBalle = 0;																	//Temps depuis que la balle a été tirée
	this.vie = 5;
}

// On cr�e des variables qui vont contenir une instance de l'objet Person :
var robot1 = new objetRobots(1, 0, 8); //cr�ation du robot 1 � partir de l'objet 'objetRobots'
var robot2 = new objetRobots(1, 0, 17); //etc
var robot3 = new objetRobots(2, 24, 9);
var robot4 = new objetRobots(2, 24, 0);
var robots = [robot1, robot2, robot3, robot4];

var nombreDeplacementsRobot = 6; //nombre de deplacements du robot vers sa cible avant de choisir une nouvelle cible aléatoirement

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
	images_snip[0] = [snip3,snip7,snip2,snip6,snip1,snip5,snip4,snip8];

	snip1_equipe1 = loadImage("images/snip1-equipe1.png");
	snip2_equipe1 = loadImage("images/snip2-equipe1.png");
	snip3_equipe1 = loadImage("images/snip3-equipe1.png");
	snip4_equipe1 = loadImage("images/snip4-equipe1.png");
	snip5_equipe1 = loadImage("images/snip5-equipe1.png");
	snip6_equipe1 = loadImage("images/snip6-equipe1.png");
	snip7_equipe1 = loadImage("images/snip7-equipe1.png");
	snip8_equipe1 = loadImage("images/snip8-equipe1.png");
	images_snip[1] = [snip3_equipe1,snip7_equipe1,snip2_equipe1,snip6_equipe1,snip1_equipe1,snip5_equipe1,snip4_equipe1,snip8_equipe1];

	snip1_equipe2 = loadImage("images/snip1-equipe2.png");
	snip2_equipe2 = loadImage("images/snip2-equipe2.png");
	snip3_equipe2 = loadImage("images/snip3-equipe2.png");
	snip4_equipe2 = loadImage("images/snip4-equipe2.png");
	snip5_equipe2 = loadImage("images/snip5-equipe2.png");
	snip6_equipe2 = loadImage("images/snip6-equipe2.png");
	snip7_equipe2 = loadImage("images/snip7-equipe2.png");
	snip8_equipe2 = loadImage("images/snip8-equipe2.png");
	images_snip[2] = [snip3_equipe2,snip7_equipe2,snip2_equipe2,snip6_equipe2,snip1_equipe2,snip5_equipe2,snip4_equipe2,snip8_equipe2];
	
	mur_haut = loadImage("images/mur-haut.png");
	mur_bas = loadImage("images/mur-bas.png");
}

function setup() {
	createCanvas(800*multiplicateur, 800*multiplicateur*3/4); //cr�ation du cadre de jeu en fonction de la r�solution (multiplicateur)
	background(100);
	carte_collision(true); //Tristan : � compl�ter

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

	mur_haut.resize(33*multiplicateur, 21.6*multiplicateur*1.4);
	mur_bas.resize(33*multiplicateur, 13.9*multiplicateur);
}

function draw() {	
	fill(256);
	background(100);
	carte_collision(false); //Tristan : � compl�ter
	affichageObstaclesEtJoueur();
	detectionCollisionJoueur1();
	detectionCollisionJoueur2();
	fill(256,0,0);
	tirJoueur1();
	tirJoueur2();
	deplacementJoueur();

	for (var i = 0; i < 4; i++) { //Pour chaque robot
		var robot = robots[i];
		robot.timer+=1;
		robot.timerCible+=1;
		robot.timerTir+=1;

		//changement de cible lorsque timerCible atteint un certain nombre 
		if (robot.timerCible >= nombreDeplacementsRobot*30)
		{
			var r = Math.floor(Math.random()*7);
			if (robot.equipe == 1) {
				robot.cible = ciblesEquipe1[r];
			} else {
				robot.cible = ciblesEquipe2[r];
			}
			robot.timerCible = 0;
		}

		if (robot.timer >= 30) { //Toutes les 30 actualisations						
			robot.positionXRobotTableau += robot.xDeplacement;
			robot.positionYRobotTableau += robot.yDeplacement;
			
			//Chargement des coordonnées de la cible en fonction de robot.cible	
			robot.timer=0;
			var xyCible = coordonneesCible(robot);
			dirigerRobot(robot, xyCible[0], xyCible[1]);
		}

		if (robot.timerTir >= 60) {
			robot.timerTir = 0;
			tirRobot(robot);
		}
		
		deplacerRobot(robot);
		afficherRobot(robot);
		deplacerBalle(robot);
		if (robot.afficherBalle) {
			robot.tempsBalle += 1;
			if (robot.tempsBalle >= 40) {
				robot.afficherBalle = false;
			} else {
				collisionBalleRobot(robot);
			}
		}

		if (robot.vie <= 0) {
			robots[i] = new objetRobots(robot.equipe, xapparitionrobots[i], yapparitionrobots[i]);
		}
	}
	
	detectionCollisionProjectile();
	detectionCollisionProjectileSurObstacles();
	affichage_vie(x_joueur+15*multiplicateur,y_joueur+23*multiplicateur,0);
	affichage_vie(x_joueur2+15*multiplicateur,y_joueur2+23*multiplicateur,1);
	mort();
}

function tirRobot(robot) {
	if (robot.cible > 6) { //Si il vise un coin, il ne tire pas
		return; 
	}
	var xyCible = coordonneesCible(robot);
	var xCible = xyCible[0];
	var yCible = xyCible[1];

	var distance_cible = int(dist(robot.positionXRobot, robot.positionYRobot, xCible, yCible)) //Distance robot-cible
	if (distance_cible > 160 * multiplicateur) { //Si la cible est trop loin, on annule le tir (durée de vie 40 ticks, vitesse 4 pixels/ticks : 160 pixels de portée)
		return;
	}

	var xTrajectoire = xCible - robot.positionXRobot;
	var yTrajectoire = yCible - robot.positionYRobot; //Coordonnées du "vecteur" de la trajectoire de la balle robot -> cible
	for (var i = 0; i < 10; i++) {
		var xPoint = robot.positionXRobot + xTrajectoire / 10 * i; //On prend 10 points répartis sur la trajectoire pour tester s'il y des obtacles
		var yPoint = robot.positionYRobot + yTrajectoire / 10 * i;

		var xCase = floor(xPoint/30/multiplicateur)+1; //On prend la case sur laquelle le point est
		var yCase = floor(yPoint/30/multiplicateur)+1;
	
		if ( !siCaseLibre(xCase, yCase) ) { //Si un des points est sur un obstacle, on annule le tir
			return;
		}
	}	

	//On arrive ici que si il n'y aucun obstacle
	var vecteurTrajectoire = [xCible - robot.positionXRobot, yCible - robot.positionYRobot]; 											//On prend le vecteur robot -> cible
	var longueurTrajectoire = Math.sqrt(Math.pow(vecteurTrajectoire[0], 2) + Math.pow(vecteurTrajectoire[1], 2)); //On calcule la longueur
	var ratio = longueurTrajectoire / (4 * multiplicateur); 																											//On calcule le ratio de la longueur sur la vitesse de la balle
	vecteurTrajectoire[0] = vecteurTrajectoire[0] / ratio;																												//On divise le vecteur par le ratio : on a gardé la direction mais on ajuste la longueur
	vecteurTrajectoire[1] = vecteurTrajectoire[1] / ratio; 

	robot.positionBalle = [robot.positionXRobot, robot.positionYRobot];
	robot.deplacementBalle = vecteurTrajectoire; 																																	//Le vecteur trajectoire est donc celui du déplacement de la balle à chaque tick
	robot.afficherBalle = true;
	robot.tempsBalle = 0;
}

function deplacerBalle(robot) {
	robot.positionBalle[0] += robot.deplacementBalle[0];
	robot.positionBalle[1] += robot.deplacementBalle[1];
}

function collisionBalleRobot(robot) {
	var xyCible = coordonneesCible(robot);
	var xCible = xyCible[0];
	var yCible = xyCible[1];
	
	var distance = dist(robot.positionBalle[0], robot.positionBalle[1], xCible, yCible);
	if (distance <= 50*multiplicateur) {
		if (robot.cible == 1) { 	        //Joueur 1
			vie_personnage[0] -= 1;
		} else if (robot.cible == 2) {    //Joueur 2
			vie_personnage[1] -= 1;
		} else if (robot.cible == 3) {    //Robot 1
			robots[0].vie -= 1;
		} else if (robot.cible == 4) {    //Robot 2
			robots[1].vie -= 1;
		}  else if (robot.cible == 5) {   //Robot 3
			robots[2].vie -= 1;
		} else if (robot.cible == 6) {    //Robot 4
			robots[3].vie -= 1;
		}

		robot.afficherBalle = false;
	}
}

function dirigerRobot(robot, x_cible, y_cible) {
	var distancemin = 10000000; //Si une distance est inférieur au minimum, c'est le nouveau minimum
	var xDeplacement_final = 0;
	var yDeplacement_final = 0;
	//Deux boucles simulent tous les déplacements possibles
	for (var xDeplacement = -1; xDeplacement <= 1; xDeplacement++)//Déplacement horizontal -1, 0 ou 1
	{ 
		for (var yDeplacement = -1; yDeplacement <= 1; yDeplacement++)//Pareil pour le déplacement vertical
		{ 
			if ( validerCoordonneesCarte(robot.positionXRobotTableau + xDeplacement, robot.positionYRobotTableau + yDeplacement) && 		//Si les coordonnées après déplacements ne sont pas hors de la carte
					 siCaseLibre(robot.positionXRobotTableau + xDeplacement + 1, robot.positionYRobotTableau + yDeplacement + 1) )//et si il y n'y a pas d'obstacle 
			{ 				
				var distance = int(dist(x_cible, y_cible, robot.positionXRobot + xDeplacement*multiplicateur, robot.positionYRobot + yDeplacement*multiplicateur));
				
				if (distance < distancemin)
				{
					distancemin = distance;
					xDeplacement_final = xDeplacement;
					yDeplacement_final = yDeplacement;
				}
			}
		}
	}
	robot.xDeplacement = xDeplacement_final;
	robot.yDeplacement = yDeplacement_final;
	robot.direction = numeroDirection(xDeplacement_final, yDeplacement_final);
}

function deplacerRobot(robot, x_cible, y_cible)
{ //Calcule les distances entre le robot et sa cible après un potentiel déplacement dans chaque direction possible
	robot.positionXRobot += robot.xDeplacement * multiplicateur;
	robot.positionYRobot += robot.yDeplacement * multiplicateur;
}

function siCaseLibre(x, y) {
	return carte[y][x] == 0;
}

function validerCoordonneesCarte(x, y)
{
	return x >= 0 && x < carte[0].length && y >= 0 && y < carte.length;
}

function afficherRobot(robot) { //Affiche un robot en utilisant les coordonnées de son dernier déplacement pour choisir l'image dans la bonne direction
	var imageRobot = images_snip[robot.equipe][robot.direction-1];
	image(imageRobot, robot.positionXRobot, robot.positionYRobot);
	if (robot.afficherBalle) {
		if (robot.equipe == 1) {
			fill(0,0,255);
		} else {
			fill(255,0,0);ssss
		}
		ellipse(robot.positionBalle[0]+15*multiplicateur,robot.positionBalle[1]+15*multiplicateur,2.5*multiplicateur,2.5*multiplicateur);
	}

	noStroke();
	fill(139,0,0);
	rect(robot.positionXRobot+15*multiplicateur-15, robot.positionYRobot+15*multiplicateur+10, 30, 10);
	
	fill(50,205,50);
	rect(robot.positionXRobot+15*multiplicateur-15, robot.positionYRobot+15*multiplicateur+10, robot.vie*6, 10);
}

function numeroDirection(x, y) { //Retourne le numéro de la direction du robot en fonction de ses déplacents horizontaux et verticaux
	//Les directions sont numérotées de 1 à 8 dans le sens des aiguilles d'une montre en commençant par le haut, en incluant les diagonales
	if (x == -1) {
		if (y == -1) return 8;
		if (y == 0) return 7;
		if (y == 1) return 6;
	} else if (x == 0) {
		if (y == -1) return 1;
		if (y == 0) return 1; //Vers le haut par défaut
		if (y == 1) return 5;
	} else if (x == 1) {
		if (y == -1) return 2;
		if (y == 0) return 3;
		if (y == 1) return 4;
	}
}

function coordonneesCible(robot) {
	var x_cible = 0;
	var y_cible = 0;
	if (robot.cible == 1) { 	        //Joueur 1
		x_cible = x_joueur+15*multiplicateur;  //on ajoute 15 * multiplicateur pour viser vers le centre des images
		y_cible = y_joueur+15*multiplicateur;
	} else if (robot.cible == 2) {    //Joueur 2
		x_cible = x_joueur2+15*multiplicateur;
		y_cible = y_joueur2+15*multiplicateur;
	} else if (robot.cible == 3) {    //Robot 1
		x_cible = robots[0].positionXRobot+15*multiplicateur;
		y_cible = robots[0].positionYRobot+15*multiplicateur;
	} else if (robot.cible == 4) {    //Robot 2
		x_cible = robots[1].positionXRobot+15*multiplicateur;
		y_cible = robots[1].positionYRobot+15*multiplicateur;
	}  else if (robot.cible == 5) {   //Robot 3
		x_cible = robots[2].positionXRobot+15*multiplicateur;
		y_cible = robots[2].positionYRobot+15*multiplicateur;
	} else if (robot.cible == 6) {    //Robot 4
		x_cible = robots[3].positionXRobot+15*multiplicateur;
		y_cible = robots[3].positionYRobot+15*multiplicateur;
	} else if (robot.cible == 7) {    //Coin supérieur gauche
		x_cible = 25;
		y_cible = 25;
	} else if (robot.cible == 8) {    //Coin supérieur droit
		x_cible = 25*30*multiplicateur;
		y_cible = 25;
	} else if (robot.cible == 9) {    //Coin inférieur gauche
		x_cible = 25;
		y_cible = 18*30*multiplicateur;
	} else if (robot.cible == 10) { 	//Coin inférieur droit
		x_cible = 25*30*multiplicateur;
		y_cible = 18*30*multiplicateur;
	}
	return [x_cible, y_cible]; 
}

function imageJoueur() //Affiche les deux joueurs, orientés en fonction des dernières touches appuyées 
{	
	//Touches Joueur 1: 
	//90 : Z
	//81 : Q
	//83 : S
	//68 : D
	if (keyIsDown(83)) {
		if (keyIsDown(68)) {					//S + D : direction en bas à droite
			directions_joueurs[0] = 4;
		} else if (keyIsDown(81)) { 	//S + Q : direction en bas à gauche
			directions_joueurs[0] = 6;
		} else { 											//S : direction en bas
			directions_joueurs[0] = 5;
		}
	} else if (keyIsDown(90)) {
		if (keyIsDown(68)) { 					//Z + D : direction en haut à droite
			directions_joueurs[0] = 2;
		} else if (keyIsDown(81)) { 	//Z + Q : direction en haut à gauche
			directions_joueurs[0] = 8;
		} else { 											//Z : direction en haut
			directions_joueurs[0] = 1;
		}
  } else if (keyIsDown(81)) {			//Q : direction gauche
		directions_joueurs[0] = 7;
	} else if (keyIsDown(68)) {			//D : direction droite
		directions_joueurs[0] = 3;
	}
	image(images_snip[1][directions_joueurs[0]-1], x_joueur, y_joueur);

	//Touches Joueur 2 : 
	//40 : Flèche bas
	//38 : Flèche haut
	//37 : Flèche gauche
	//39 : Flèche droite
	if (keyIsDown(40)) {
		if (keyIsDown(39)) {				  //direction en bas à droite
			directions_joueurs[1] = 4;
		} else if (keyIsDown(37)) { 	//direction en bas à gauche
			directions_joueurs[1] = 6;
		} else { 											//direction en bas
			directions_joueurs[1] = 5;
		}
	} else if (keyIsDown(38)) {
		if (keyIsDown(39)) { 					//direction en haut à droite
			directions_joueurs[1] = 2;
		} else if (keyIsDown(37)) { 	//direction en haut à gauche
			directions_joueurs[1] = 8;
		} else { 											//direction en haut
			directions_joueurs[1] = 1;
		}
  } else if (keyIsDown(37)) {			//direction gauche
		directions_joueurs[1] = 7;
	} else if (keyIsDown(39)) {			//direction droite
		directions_joueurs[1] = 3;
	}
	image(images_snip[2][directions_joueurs[1]-1], x_joueur2, y_joueur2);
}

function detectionCollisionJoueur1() {
	for (var i = 0; i < comptage; i++) { //collision par droite, gauche, haut, bas
		if (x_joueur <= coordonnes_obstacle[0][i] + 25*multiplicateur && x_joueur + 20*multiplicateur >= coordonnes_obstacle[0][i] && y_joueur + 24*multiplicateur >= coordonnes_obstacle[1][i] && y_joueur <= coordonnes_obstacle[1][i] + 20*multiplicateur)
		{
			if (x_joueur <= coordonnes_obstacle[0][i] + 25*multiplicateur && x_joueur >=  coordonnes_obstacle[0][i] + 25*multiplicateur - vittesse_joueur) {
				//collision par la droite
				x_joueur += multiplicateur;
			}
			if (x_joueur + 20*multiplicateur >= coordonnes_obstacle[0][i] && x_joueur + 20*multiplicateur - vittesse_joueur <= coordonnes_obstacle[0][i]) {
				//collision par la gauche
				x_joueur -= multiplicateur;
			}
			if (y_joueur + 24*multiplicateur >= coordonnes_obstacle[1][i] && y_joueur + 24*multiplicateur - vittesse_joueur <= coordonnes_obstacle[1][i]) {
				//collision par le haut    
				y_joueur -= multiplicateur;
			}
			if (y_joueur <= coordonnes_obstacle[1][i] + 20*multiplicateur && y_joueur >= coordonnes_obstacle[1][i] + 20*multiplicateur - vittesse_joueur ) {
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
	if (keyIsDown(81)) { //aller � gauche
	x_joueur -= vittesse_joueur;
	}
	}
	
	if (x_joueur < 750*multiplicateur-15*multiplicateur+25)
	{
	if (keyIsDown(68)) { //aller � droite
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
	if (keyIsDown(37)) { //aller � gauche
	x_joueur2 -= vittesse_joueur;
	}
	}
	
	if (x_joueur2 < 750*multiplicateur-15*multiplicateur+25)
	{
	if (keyIsDown(39)) { //aller � droite
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

function tirJoueur1() //Gère : l'angle du tir du joueur, l'évèement "tir du joueur" et le déplacement de la balle du joueur
{	
	if (keyIsDown(78)) {
		angle += 0.05;
	}

	if (keyIsDown(66)) {
		angle -= 0.05;
	}

	fill(150,0,0);
	arc(x_joueur+15*multiplicateur, y_joueur+15*multiplicateur, 50*multiplicateur, 50*multiplicateur,angle-0.05, angle+0.05);
	

  if(keyIsDown(32)) {
		if(tirer[0] == false) {
			tirer[0] = true;
			x_balle[0] = x_joueur + 15*multiplicateur; //x_joueur et y_joueur sont au coin supérieur gauche de l'image, la balle doit partir du centre
			y_balle[0] = y_joueur + 15*multiplicateur;
			angle_balle[0] = angle;
		}
	}
	
	
	if (tirer[0] == true)	{
		fill(0,0,256);
		ellipse(x_balle[0],y_balle[0],2.5*multiplicateur,2.5*multiplicateur);
		x_balle[0] += multiplicateur*4*cos(angle_balle[0]);
		y_balle[0] += multiplicateur*4*sin(angle_balle[0]);
		temps_balle[0] +=1;
		
		if (temps_balle[0] == 30) {
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
				x_balle[1] = x_joueur2+15*multiplicateur;
				y_balle[1] = y_joueur2+15*multiplicateur;
				angle_balle[1] = angleJ2;
			}
		}

	
	if(tirer[1] == true)
	{
		fill(0,0,256);
		ellipse(x_balle[1],y_balle[1],2.5*multiplicateur,2.5*multiplicateur);
		x_balle[1] += multiplicateur*4*cos(angle_balle[1]);
		y_balle[1] += multiplicateur*4*sin(angle_balle[1]);
		temps_balle[1] +=1;
		
		if(temps_balle[1] == 30){
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
			if (x_balle[0] < coordonnes_obstacle[0][i] + 30*multiplicateur && x_balle[0] > coordonnes_obstacle[0][i] && y_balle[0]> coordonnes_obstacle[1][i] && y_balle[0] < coordonnes_obstacle[1][i] + 30*multiplicateur) {	
				tirer[0] = false;
				x_balle[0] = x_joueur;
				y_balle[0] = y_joueur;
				temps_balle[0] = 0;
			}
		}
		if(tirer[1] == true)
		{
			if (x_balle[1] < coordonnes_obstacle[0][i] + 30*multiplicateur && x_balle[1] > coordonnes_obstacle[0][i] && y_balle[1] > coordonnes_obstacle[1][i] && y_balle[1] < coordonnes_obstacle[1][i] + 30*multiplicateur)
				{	
				
				tirer[1] = false;
				x_balle[1] = x_joueur2;
				y_balle[1] = y_joueur2;
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
	distance_balle_joueur[0]=dist(x_joueur+15*multiplicateur,y_joueur+15*multiplicateur,x_balle[1],y_balle[1]);		 //distance entre le missile du joueur 2 et la position du joueur 1
	distance_balle_joueur[1]=dist(x_joueur2+15*multiplicateur,y_joueur2+15*multiplicateur,x_balle[0],y_balle[0]);  //distance entre le missile du joueur 1 et la position du joueur 2
	
	if (distance_balle_joueur[0] <= 15*multiplicateur) //Joueur 1
	{
		if(vie_personnage[0] != 0) {
			vie_personnage[0]-=1;
		}
		tirer[1] = false;
		x_balle[1] = x_joueur2;
		y_balle[1] = y_joueur2;
		temps_balle[1] = 0;
	}

	for (var i = 2; i <= 3; i++) {
		var robotcible = robots[i];
		if (dist(x_balle[0], y_balle[0], robotcible.positionXRobot, robotcible.positionYRobot) <= 15*multiplicateur) {
			robotcible.vie -= 1;
			tirer[0] = false;
			x_balle[0] = x_joueur;
			y_balle[0] = y_joueur;
			temps_balle[0] = 0;
		}
	}

	if (distance_balle_joueur[1] <= 15*multiplicateur) {	//Joueur 2
		if (vie_personnage[1] != 0) {
			vie_personnage[1]-=1;
		}
		tirer[0] = false;
		x_balle[0] = x_joueur2;
		y_balle[0] = y_joueur2;
		temps_balle[0] = 0;
	}

	for (var i = 0; i <= 1; i++) {
		var robotcible = robots[i];
		if (dist(x_balle[1], y_balle[1], robotcible.positionXRobot, robotcible.positionYRobot) <= 15*multiplicateur) {
			robotcible.vie -= 1;
			tirer[1] = false;
			x_balle[1] = x_joueur;
			y_balle[1] = y_joueur;
			temps_balle[1] = 0;
		}
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
	for (var i=0; i<=comptage; i+=2)
	{
		image(mur_bas, coordonnes_obstacle[0][i]-3*multiplicateur, coordonnes_obstacle[1][i]+18*multiplicateur);
		image(mur_bas, coordonnes_obstacle[0][comptage+1-i]-3*multiplicateur, coordonnes_obstacle[1][comptage+1-i]+18*multiplicateur);
	}
	
	imageJoueur();
	
	for (var i=0; i<=comptage; i+=2)
	{
		image(mur_haut, coordonnes_obstacle[0][i]-3*multiplicateur, coordonnes_obstacle[1][i]-12*multiplicateur);
		image(mur_haut, coordonnes_obstacle[0][comptage+1-i]-3*multiplicateur, coordonnes_obstacle[1][comptage+1-i]-12*multiplicateur);
	}

}

function quadrillage(x,y,debut)
{
	if(debut == true) {
		if (initialisationCarteAZero == true) {
			for (var i=1; i < 19; i++) {
				for (var j=1; j < 26; j++) {
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
		for (var i=0; i < 27; i++) {
			carte[0][i]=1;
			carte[19][i]=1;
		}
		for (var i=0; i < 20; i++) {
			carte[i][0]=1;
			carte[i][26]=1;
		}
		carte[y+1][x+1] = 1;
		carte[17-y+1][24-x+1] = 1;
	}
}
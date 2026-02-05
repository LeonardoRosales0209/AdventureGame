const readline = require("readline-sync");

/*
Adventure Game
This game will be a text-based game where the player will be able
to make choices that affect the outcome of the game.
The player will be able to choose their own path and the story will change
based on their decisions.
*/

// Display the game title
console.log("Welcome to the Adventure Game");

// Add a welcome message
console.log("Prepare yourself for an epic journey!");

let playerName = "";

// Obten el nombre del jugador usando readline-sync
while (!playerName) {
  playerName = readline.question("Cuál es tu nombre, aventurero?\n");
}

// Creamos variables
let health = 100;
let playerGold = 20;
let currentLocation = "village";
let gameRunning = true;
let inventory = [];

// Crea variables para stats del jugador
let strength = 10;
let agility = 10;
let intelligence = 10;

// Coloca un mensaje de bienvenida al jugador y muestra su oro inicial
console.log(`Bienvenido, ${playerName}! Comienzas tu aventura con ${playerGold} piezas de oro.`);

let weaponDamage = 0;
console.log("Daño de arma inicial: " + weaponDamage);
console.log("Cuando compres una espada, el daño incrementará a 10!");

let monsterDefense = 5;
console.log("Defensa del monstruo: " + monsterDefense);
console.log("Los monstruos pueden resistir cierto daño en combate!.");

let healingPotionValue = 30;
console.log("Valor de la poción de curación: " + healingPotionValue);
console.log("Una poción te restaurará 30 de salud!.");

let firstTimePlaying= true;
let firstVisit = true;

console.log("Ubicación inicial: " + currentLocation);
console.log("Primera vez jugando: " + firstTimePlaying);

//Consulta si el jugador está en la taberna (tavern) y muestra un mensaje apropiado
if (currentLocation === "tavern") {
  console.log("Estás en la taberna. Puedes descansar y recuperar salud aquí.");
}
else{
  console.log("No estás en la taberna. Explora el mundo para encontrarla.");
}

if(currentLocation === "village"){
  console.log("=== PUEBLO ===");
  if(firstVisit){
    console.log("Es tu primera vez en el pueblo. Explora y conoce a los habitantes.");
    firstVisit = false;
  }
  console.log("Estás en el pueblo. El herrero y el mercado están cerca");
  console.log("\n¿Qué te gustaría hacer?");
  console.log("1. Ir al herrero (blacksmith)");
  console.log("2. Ir al mercado (market)");
  console.log("3. Ir al bosque (forest)");
  console.log("4. Revisar tu estado actual");
  console.log("5. Salir del juego");

  console.log("\nPueblerino: ¡Bienvenido al pueblo, aventurero " + playerName + "! Hay rumores de que hay un dragón en las montañas ...");
}
else if(currentLocation === "blacksmith"){
  console.log("Estás en el herrero. Puedes realizar las siguientes acciones:");
  console.log("1. Ir al pueblo (village)");
  console.log("2. Revisar tu estado actual");
  console.log("3. Salir del juego");
}
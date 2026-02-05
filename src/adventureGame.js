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

let firstVisit = true;

console.log("Ubicación inicial: " + currentLocation);
let playerSelection = "";
let numSelected = 0;

while(gameRunning){
  console.log("\n=== UBICACIÓN ACTUAL: " + currentLocation.toUpperCase() + " ===");
  if(currentLocation === "village"){
    console.log("=== PUEBLO ===");
    console.log("Estás en el pueblo. El herrero y el mercado están cerca");
    console.log("\n¿Qué te gustaría hacer?");
    console.log("1. Ir al herrero (blacksmith)");
    console.log("2. Ir al mercado (market)");
    console.log("3. Ir al bosque (forest)");
    console.log("4. Revisar tu estado actual");
    console.log("5. Salir del juego");

    if(firstVisit){
      console.log("Es tu primera vez en el pueblo. Explora y conoce a los habitantes.");
      console.log("\nPueblerino: ¡Bienvenido al pueblo, aventurero " + playerName + "! Hay rumores de que hay un dragón en las montañas ...");
      firstVisit = false;
    }

    playerSelection = readline.question("Selecciona una opción (1-5): ");
    numSelected = parseInt(playerSelection);

    switch(numSelected){
      case 1:
        currentLocation = "blacksmith";
        break;
      case 2:
        currentLocation = "market";
        break;
      case 3:
        currentLocation = "forest";
        break;
      case 4:
        console.log(`Estado actual de ${playerName}: Salud: ${health}, Oro: ${playerGold}, Inventario: ${inventory.join(", ")}`);
        break;
      case 5:
        console.log("Gracias por jugar. ¡Hasta la próxima aventura!");
        gameRunning = false;
      default:
        console.log("Opción no válida. Por favor, selecciona una opción del 1 al 5.");
        break;
    }

  }
  else if(currentLocation === "blacksmith"){
    console.log("Estás en el herrero. Puedes realizar las siguientes acciones:");
    console.log("1. Ir al pueblo (village)");
    console.log("2. Revisar tu estado actual");
    console.log("3. Salir del juego");

    playerSelection = readline.question("Selecciona una opción (1-3): ");
    numSelected = parseInt(playerSelection);

    switch(numSelected){
      case 1:
        currentLocation = "village";
        break;
      case 2:
        console.log(`Estado actual de ${playerName}: Salud: ${health}, Oro: ${playerGold}, Inventario: ${inventory.join(", ")}`);
        break;
      case 3:
        console.log("Gracias por jugar. ¡Hasta la próxima aventura!");
        gameRunning = false;
      default:
        console.log("Opción no válida. Por favor, selecciona una opción del 1 al 3.");
        break;
    }
  }
  else if(currentLocation === "forest"){
    console.log("Estás en el bosque. Hay rumores de que hay un dragón en las montañas...");
    console.log("\n¡Un monstruo salvaje aparece!");
    while(monsterDefense > 0){
      console.log(`Defensa del monstruo restante: ${monsterDefense}`);
      let attackDamage = strength + weaponDamage;
      console.log(`Atacas al monstruo y le haces ${attackDamage} puntos de daño.`);
      monsterDefense -= attackDamage;
    }
    console.log("¡Has derrotado al monstruo!");
    console.log("\n¿Qué te gustaría hacer ahora?");
    console.log("1. Regresar al pueblo (village)");
    console.log("2. Revisar tu estado actual");
    console.log("3. Salir del juego");

    playerSelection = readline.question("Selecciona una opción (1-3): ");
    numSelected = parseInt(playerSelection);
    switch(numSelected){
      case 1:
        currentLocation = "village";
        monsterDefense = 5;
        break;
      case 2:
        console.log(`Estado actual de ${playerName}: Salud: ${health}, Oro: ${playerGold}, Inventario: ${inventory.join(", ")}`);
        break;
      case 3:
        console.log("Gracias por jugar. ¡Hasta la próxima aventura!");
        gameRunning = false;
      default:
        console.log("Opción no válida. Por favor, selecciona una opción del 1 al 3.");
        break;
    }
  }
}

 // Create for loop to check inventory slots
  for(let i = 0; i < inventory.length; i++){
    console.log("Revisando inventario en el slot " + (i + 1));
    if(inventory[i]){
      console.log("Inventario slot " + (i + 1) + ": " + inventory[i]);
    } else {
      console.log("Inventario slot " + (i + 1) + ": Vacío");
    }
  }


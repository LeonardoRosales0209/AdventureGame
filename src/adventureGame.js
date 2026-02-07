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

// Creamos variables
let health = 100;
let max_health = 100;
let playerGold = 20;
let currentLocation = "village";
let gameRunning = true;
let inventory = [];
let defense = 0;

let weaponDamage = 0;
console.log("Daño de arma inicial: " + weaponDamage);
console.log("Cuando compres una espada, el daño incrementará a 10!");

let monsterDefense = 5;
console.log("Defensa del monstruo: " + monsterDefense);
console.log("Los monstruos pueden resistir cierto daño en combate!.");

let healingPotionValue = 30;
console.log("Valor de la poción de curación: " + healingPotionValue);
console.log("Una poción te restaurará 30 de salud!.");


const healthPotion = {
    name: "Pocion",
    type: "potion",
    value: 5,     // Cost in gold
    effect: 30,   // Healing amount
    description: "Restaura 30 puntos de salud"
};

const sword = {
    name: "Espada",
    type: "weapon",
    value: 10,    // Cost in gold
    effect: 10,   // Damage amount
    description: "Una espada resistente para combate"
};

const shield = {
    name: "Escudo",
    type: "armor",
    value: 15,    // Cost in gold
    effect: 5,    // Defense amount
    description: "Un escudo fuerte para protegerte"
};

console.log("=================================");
console.log("        DESAFÍO DEL DRAGÓN       ");
console.log("=================================");
console.log("\nTu objetivo: Derrotar al dragón de las montañas!");

// Obten el nombre del jugador usando readline-sync
while (!playerName) {
  playerName = readline.question("Cuál es tu nombre, aventurero?\n");
}

// Coloca un mensaje de bienvenida al jugador y muestra su oro inicial
console.log(`Bienvenido, ${playerName}! Comienzas tu aventura con ${playerGold} piezas de oro.`);

let firstVisit = true;

while(gameRunning){
  showOptions();  

  // Valida la entrada del jugador para seleccionar una opción
  let validChoice = false;
  while(!validChoice){
    try {
      let choice = readline.question("Selecciona una opción: ");

      // Revisa si la entrada es vacía
      if(choice.trim() === "") {
        throw "Entrada vacía. Por favor, introduce una opción válida.";
      }

      // Convierte a número y revisa si es un número válido
      let numChoice = parseInt(choice);
      if(isNaN(numChoice)) {
        throw "Entrada no válida. Por favor, introduce un número.";
      }

      // Actua de acuerdo a la ubicación
      validChoice = actionLocation(numChoice);
    } catch (error) {
      console.log("\nError: " + error);
      console.log("Por favor, intenta de nuevo.");
    }
  }

  // Revisa si el jugador ha muerto
  if(health <= 0){
    console.log("\nHas sido derrotado por el dragón... ¡Pero no te rindas, aventurero " + playerName + "! Intenta de nuevo y derrota al dragón para salvar el reino!");
    gameRunning = false;
  }
}

function showOptions(){
  if(currentLocation === "village"){
    console.log("=== PUEBLO ===");
    console.log("Estás en el pueblo. El herrero y el mercado están cerca");
    console.log("\n¿Qué te gustaría hacer?");
    console.log("1. Ir al herrero (blacksmith)");
    console.log("2. Ir al mercado (market)");
    console.log("3. Ir al bosque (forest)");
    console.log("4. Revisar tu estado actual");
    console.log("5. Revisar tu inventario");
    console.log("6. Salir del juego");

    if(firstVisit){
      console.log("Es tu primera vez en el pueblo. Explora y conoce a los habitantes.");
      console.log("\nPueblerino: ¡Bienvenido al pueblo, aventurero " + playerName + "! Hay rumores de que hay un dragón en las montañas ...");
      firstVisit = false;
    }
  }
  else if(currentLocation === "blacksmith"){
    console.log("=== HERRERO ===");
    console.log("El calor de la forja te envuelve mientras entras al herrero. Armas y armaduras relucen en las paredes, y el herrero te saluda con una sonrisa.");
    console.log("\n¿Qué te gustaría hacer?");
    console.log("1. Comprar una espada (10 gold)");
    console.log("2. Comprar una armadura (15 gold)");
    console.log("3. Regresa al pueblo (village)");
    console.log("4. Revisar tu estado actual");
    console.log("5. Revisar tu inventario");
    console.log("6. Salir del juego");
  }
  else if(currentLocation === "market"){
    console.log("=== MERCADO ===");
    console.log("Mercaderes venden sus mercancías en coloridos puestos. Un vendedor de pociones atrapa tu atención.");
    console.log("\n¿Qué te gustaría hacer?");
    console.log("1. Comprar una poción de curación (5 gold)");
    console.log("2. Regresa al pueblo (village)");
    console.log("3. Revisar tu estado actual");
    console.log("4. Revisar tu inventario");
    console.log("5. Salir del juego");
  }
  else if(currentLocation === "forest"){
    console.log("=== BOSQUE ===");
    console.log("Estás en el bosque. Hay rumores de que hay un dragón en las montañas...");
    console.log("Un bosque oscuro te rodea. Escuchas ruidos extraños...");
    processCombat();
  }    
}

function processCombat(){
    //Inicio de batalla
    let inBattle = true;
    let monsterHealth = 30;
    console.log("\n¡Un monstruo salvaje aparece!");

    while(inBattle){
      const weapon = inventory.find(item => item.type === "weapon");
      const armor = inventory.find(item => item.type === "armor");

      if(!weapon){
        console.log("No tienes un arma para luchar. El monstruo te ataca y pierdes 10 de salud.");
        health -= 10;
        console.log("Tu salud actual es: " + health);
        healing();
        console.log("Huyes del combate.");
        inBattle = false;
        break;
      }
      else{
        console.log("\nTu salud: " + health);
        console.log("Salud del monstruo: " + monsterHealth);
        
        let danho = weapon.effect - monsterDefense; // Calcula el daño considerando la defensa del monstruo
        let finalDamage = danho > 0 ? danho : 0; // El daño no puede ser negativo

        monsterHealth -= finalDamage; // El daño se reduce por la defensa del monstruo

        if(monsterHealth <= 0){
          console.log("¡Has derrotado al monstruo!");
          console.log("Ganas 10 piezas de oro.");
          playerGold += 10;
          inBattle = false;    
          currentLocation = "village"; // Regresas al pueblo después de la batalla
          console.log("\nRegresas al pueblo después de la batalla. El pueblo está tranquilo, pero sabes que el dragón sigue ahí afuera...");
          return;
        }
        else{
          console.log("El monstruo te ataca y pierdes 10 de salud.");
          let damageTaken = armor ? 10 - armor.effect : 10; // Calcula el daño que recibes considerando la defensa de la armadura
          health -= damageTaken; // Aplica el daño recibido
          healing();
          if(health <= 0){            
            console.log("Has sido derrotado por el monstruo...");
            inBattle = false;
          }
          else{
            console.log("Tu salud actual es: " + health);
          }
        }
      }
    }}

function hasItemType(type) {
    return inventory.some(item => item.type === type);
}

function healing(){
  let pocion = inventory.find(item => item.type === "potion");
  if(health < 30 && pocion){
    console.log("Usas una poción de curación para restaurar tu salud.");
    health += pocion.effect; // Restaura salud según el efecto de la poción
    if(health > max_health){
      health = max_health;
    }
    inventory.splice(inventory.indexOf(pocion), 1); // Elimina la poción del inventario después de usarla
    console.log("Tu salud actual es: " + health);
  }
}

function actionLocation(choice){
  if(currentLocation === "village"){
    if(choice < 1 || choice > 6) {
      throw "Opción no válida. Por favor, selecciona una opción del 1 al 6.";
    }

    validChoice = true;
    if(choice === 1) {
      currentLocation = "blacksmith";
      console.log("\nTe diriges al herrero...");
    } else if(choice === 2) {
      currentLocation = "market";
      console.log("\nTe diriges al mercado...");
    } else if(choice === 3) {
      currentLocation = "forest";
      console.log("\nTe diriges al bosque...");
    } else if(choice === 4) {
      displayStatus();
    } else if(choice === 5) {
      checkInventory();
    } else if(choice === 6) {
      quitGame();
    }
  }else if(currentLocation === "blacksmith" || currentLocation === "market"){
    if(choice < 1 || choice > 6) {
      throw "Opción no válida. Por favor, selecciona una opción del 1 al 6.";
    }
        
    validChoice = true;
    if(currentLocation === "blacksmith"){
      if(choice === 1) {
        if(playerGold >= sword.value){
          playerGold -= sword.value ;
          inventory.push(sword);
          weaponDamage = sword.effect;
          console.log("\nCompraste una espada. Tu daño de arma ahora es: " + weaponDamage);
        } else {
          console.log("\nNo tienes suficiente oro para comprar la espada.");
        }
      } else if(choice === 2) {
        if(playerGold >= shield.value){
          playerGold -= shield.value;
          inventory.push(shield);
          defense = shield.effect;
          console.log("\nCompraste una armadura. Tu defensa ahora es: " + defense);
        } else {
          console.log("\nNo tienes suficiente oro para comprar la armadura.");
        }
      } else if(choice === 3) {
        currentLocation = "village";
        console.log("\nRegresas al pueblo...");
      } else if(choice === 4) {
        displayStatus();
      } else if(choice === 5) {
        checkInventory();
      } else if(choice === 6) {
        quitGame();
      }
    } else if(currentLocation === "market"){
      if(choice === 1) {
        if(playerGold >= healthPotion.value){
          playerGold -= healthPotion.value;
          inventory.push(healthPotion);
          console.log("\nCompraste una poción de curación. Ahora puedes usarla para restaurar tu salud cuando sea necesario.");
        } else {
          console.log("\nNo tienes suficiente oro para comprar la poción.");
        }
      } else if(choice === 2) {
        currentLocation = "village";
        console.log("\nRegresas al pueblo...");
      } else if(choice === 3) {
        displayStatus();
      } else if(choice === 4) {
        checkInventory();
      } else if(choice === 5) {
        quitGame();
      }
    }
  }

  return validChoice;
}

function displayStatus(){
  console.log("\n=== " + playerName + "'s Status ===");
  console.log("❤️  Health: " + health);
  console.log("💰 Gold: " + playerGold);
  console.log("📍 Location: " + currentLocation);
}

function checkInventory(){
  console.log("\n=== " + playerName + "'s Inventory ===");
  if(inventory.length === 0){
    console.log("Tu inventario está vacío.");
  }
  else{
    inventory.forEach((item, index) => {
      console.log((index + 1) + ". " + item.name + " - " + item.description);
    });
  }
}

function quitGame(){
  console.log("\nGracias por jugar. ¡Hasta la próxima aventura!");
  gameRunning = false;
}
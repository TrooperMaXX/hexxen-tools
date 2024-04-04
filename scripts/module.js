import registerSettings from "./settings.js";



Hooks.once('init', async function() {
    console.log('hexxen-tools | init');
    registerSettings();
});

Hooks.once('ready', async function() {
    console.log('hexxen-tools | Lasst die Scheuenen BRENNEN!!');
});

Hooks.on("combatStart", async function (combat) {
    console.log('hexxen-tools | Combat Started');
    if (game.user.isGM && game.settings.get('hexxen-tools', 'auto-roll-ini')) {
        combat.rollAll();
    }
    if (game.user.isGM && game.settings.get('hexxen-tools', 'add-ini-0')) {
        const combatants = combat.setupTurns();
        if (!combatants.find((element) => element.name === 'Ini 0')){
            const combatant = await game.combat.createEmbeddedDocuments("Combatant", [{
                name: 'Ini 0',
                img: game.settings.get('hexxen-tools', 'ini-0-img'),
                hidden: false, 
                initiative: 0,
                isNPC: true
            }]);
        }else{
            console.log('hexxen-tools | Hat schon Ini 0');
        }
    }
   
});

Hooks.on("preDeleteCombat", async function (combat) {
    console.log('hexxen-tools | Combat Ended');
    if (game.user.isGM && game.settings.get('hexxen-tools', 'reset-ideen-coups')) {
        for (let combatant of combat.turns) {
            if(combatant.actor !== null && !combatant.actor.type.includes("npc") ){
                if (combatant.actor.system.resources.ideen < combatant.actor.system.attributes.WIS.value + combatant.actor.system.temp["idee-bonus"]){
                    combatant.actor.system.resources.ideen = combatant.actor.system.attributes.WIS.value + combatant.actor.system.temp["idee-bonus"];
                }
                if (combatant.actor.system.resources.coups < combatant.actor.system.attributes.ATH.value + combatant.actor.system.temp["coup-bonus"]){
                    combatant.actor.system.resources.coups = combatant.actor.system.attributes.ATH.value + combatant.actor.system.temp["coup-bonus"];
                }
                combatant.actor.system.encounter.ap.remaining = combatant.actor.system.calc.ap;
            }
        }
    }
});

Hooks.on("combatRound", async function (combat) {
    console.log('hexxen-tools | Next Round');
    if (game.user.isGM && game.settings.get('hexxen-tools', 'reset-aps')) {
        for (let combatant of combat.turns) {
            if(combatant.actor !== null && !combatant.actor.type.includes("npc") ){
                if (combatant.actor.system.encounter.ap.remaining < combatant.actor.system.calc.ap){
                    combatant.actor.system.encounter.ap.remaining = combatant.actor.system.calc.ap;
                }
            }
        }
    } 

});
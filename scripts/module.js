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
        console.log(`hexxen-tools | Kämpferys ${combatants}`);
        if (!combatants.find((element) => element.name === 'Ini 0')){
            const combatant = await game.combat.createEmbeddedDocuments("Combatant", [{
                name: 'Ini 0',
                img: game.settings.get('hexxen-tools', 'ini-0-img'),
                hidden: false, 
                initiative: 0
            }]);
        }else{
            console.log('hexxen-tools | Hat schon Ini 0');
        }
    }
   
});
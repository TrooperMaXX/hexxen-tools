import registerSettings from "./settings.js";
import itemCreator from "./itemCreator.js";
import { registerHeXXenStatus } from "./statusEffects/statusEffects.mjs";

import { default as ActiveEffectHeXXen } from "./statusEffects/active-effect.mjs";
import { _onUpdateODMG,_onUpdateIDMG, _onUpdateLDMG, _onUpdateMDMG } from "./utils/utils.mjs";

Hooks.once('init', async function() {
    console.log('hexxen-tools | init');
    registerSettings();
    CONFIG.ActiveEffect.documentClass = ActiveEffectHeXXen;
    CONFIG.statusEffects = registerHeXXenStatus();
    ActiveEffectHeXXen.registerHUDListeners();
    libWrapper.register('hexxen-tools', 'HexxenActor.prototype._onUpdate', async function (wrapped,data,options,userId, ...args) {
        console.log('HexxenActor.prototype._onUpdate');
        // ... do things ...
        if ( userId === game.userId ) {
            console.log(data);
            if (foundry.utils.hasProperty(data, "system.resources.odmg")) _onUpdateODMG(this,data);
            if (foundry.utils.hasProperty(data, "system.resources.idmg")) _onUpdateIDMG(this,data);
            if (foundry.utils.hasProperty(data, "system.resources.ldmg")) _onUpdateLDMG(this,data);
            if (foundry.utils.hasProperty(data, "system.resources.mdmg")) _onUpdateMDMG(this,data);
           
        }
        // let result = wrapped(...args);
    }, 'MIXED' /* optional, since this is the default type */ );


});

Hooks.once('ready', async function() {
    console.log('hexxen-tools | Lasst die Scheunen BRENNEN!!');
   // new itemCreator().render(true);
});

// Hooks.on('updateActor', (actor, change, options, userId) => {
//    console.log('hexxen-tools | updateActor');
//    console.log(actor);
//    let flattenedChange = flattenObj(change);
//    console.log(flattenedChange);
//    if ("system.resources.odmg" in flattenedChange){
//        console.log(actor.temporaryEffects);
//    
//        
//        if (flattenedChange["system.resources.odmg"] == 0 )
//        {
//            actor.toggleStatusEffect(`aeussererSchaden1`);
//        }else{
//            actor.toggleStatusEffect(`aeussererSchaden${flattenedChange["system.resources.odmg"]-1}`,{ active: false,overlay: false });
//            actor.toggleStatusEffect(`aeussererSchaden${flattenedChange["system.resources.odmg"]}`);
//            actor.toggleStatusEffect(`aeussererSchaden${flattenedChange["system.resources.odmg"]+1}`,{ active: false,overlay: false });
//        } 
//        
//    }
//    if ("system.resources.idmg" in flattenedChange){
//        console.log(flattenedChange["system.resources.idmg"]);
//    }
//    if ("system.resources.mdmg" in flattenedChange){
//        console.log(flattenedChange["system.resources.mdmg"]);
//    }
//    if ("system.resources.ldmg" in flattenedChange){
//        console.log(flattenedChange["system.resources.ldmg"]);
//    }
//    
//    
// });
//Hooks.on("renderItemDirectory", (app, html, options) => {
//    if ( !game.user.isGM ) return;
//    console.log('hexxen-tools | RENDER');
//    // Add Approval Tracker button
//    const header = html.find(".header-actions");
//    const button = document.createElement("button");
//    button.classList.add("create-hexxen-item");
//    button.type = "button";
//    button.innerHTML = `<i class="fa-solid fa-scale-balanced"></i>Troopis HeXXen Tool`;
//    button.onclick = event => new itemCreator().render(true);
//    header.append(button);
//  });
//
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
                initiative: 0.1,
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
                  //  let ideenCalc = combatant.actor.system.attributes.WIS.value + combatant.actor.system.temp["idee-bonus"];
					let updateDataIdee = {
					  "combatant.actor.system.resources.ideen": combatant.actor.system.attributes.WIS.value + combatant.actor.system.temp["idee-bonus"],
					};
                    
                console.log(updateDataIdee);
                try {
                    combatant.actor.update(updateDataIdee);
                } catch (error) {
                    console.log(error);
                }
					
                    console.log(combatant.actor);
                }
                if (combatant.actor.system.resources.coups < combatant.actor.system.attributes.ATH.value + combatant.actor.system.temp["coup-bonus"]){
                   //  let coupsCalc = combatant.actor.system.attributes.ATH.value + combatant.actor.system.temp["coup-bonus"];
                    let updateData = {
					  "combatant.actor.system.resources.coups": combatant.actor.system.attributes.ATH.value + combatant.actor.system.temp["coup-bonus"],
					};
					combatant.actor.update(updateData);
				}
				let updateData = {
					  "system.encounter.ap.remaining": combatant.actor.system.calc.ap,
					};
				combatant.actor.update(updateData);
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
                    const updateData = {
					  "system.encounter.ap.remaining": combatant.actor.system.calc.ap,
					};
					combatant.actor.update(updateData);
                }
            }
        }
    } 

});
import registerSettings from "./settings.js";
import { registerHeXXenStatus } from "./statusEffects/statusEffects.mjs";

import { default as ActiveEffectHeXXen } from "./statusEffects/active-effect.mjs";
import { _onUpdateODMG,_onUpdateIDMG, _onUpdateLDMG, _onUpdateMDMG } from "./utils/utils.mjs";

Hooks.once('init', async function() {
    console.log('hexxen-tools | init');
    registerSettings();
  
    if (game.settings.get('hexxen-tools', 'replace-status-effects')) {
        if ( game.release.generation < 12 ) Math.clamp = Math.clamped;
        CONFIG.ActiveEffect.documentClass = ActiveEffectHeXXen;
        CONFIG.statusEffects = registerHeXXenStatus();
        ActiveEffectHeXXen.registerHUDListeners();

        libWrapper.register('hexxen-tools', 'HexxenActor.prototype._onUpdate', async function (wrapped,data,options,userId, ...args) {
            console.log('hexxen-tools | HexxenActor.prototype._onUpdate');
            
            if ( userId === game.userId ) {
               
                if (foundry.utils.hasProperty(data, "system.resources.odmg")) _onUpdateODMG(this,data);
                if (foundry.utils.hasProperty(data, "system.resources.idmg")) _onUpdateIDMG(this,data);
                if (foundry.utils.hasProperty(data, "system.resources.ldmg")) _onUpdateLDMG(this,data);
                if (foundry.utils.hasProperty(data, "system.resources.mdmg")) _onUpdateMDMG(this,data);
               
            }
            let result = wrapped(data,options,userId, ...args);
            return result;
        }, 'MIXED' /* optional, since this is the default type */ );
    }
    


});

Hooks.once('ready', async function() {
    if(!game.modules.get('lib-wrapper')?.active && game.user.isGM)
        ui.notifications.error("Troopis HeXXenTools braucht das 'libWrapper' Modul. Bitte installiere und aktiviere es.");

    console.log('hexxen-tools | Lasst die Scheunen BRENNEN!!');
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
                let updateDataIdee, updateDataCoup, updateDataAP = {};

                if (combatant.actor.system.resources.ideen < combatant.actor.system.attributes.WIS.value + combatant.actor.system.temp["idee-bonus"]){
					updateDataIdee = {
					  "system.resources.ideen": combatant.actor.system.attributes.WIS.value + combatant.actor.system.temp["idee-bonus"],
					};                    
                }
                
                if (combatant.actor.system.resources.coups < combatant.actor.system.attributes.ATH.value + combatant.actor.system.temp["coup-bonus"]){
                    updateDataCoup = {
					  "system.resources.coups": combatant.actor.system.attributes.ATH.value + combatant.actor.system.temp["coup-bonus"],
					};
				}

				updateDataAP = {
					  "system.encounter.ap.remaining": combatant.actor.system.calc.ap,
					};
                
                const combinedSettings = { ...updateDataIdee, ...updateDataCoup, ...updateDataAP };
                combatant.actor.update(combinedSettings);
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
import { default as ActiveEffectHeXXen } from "../statusEffects/active-effect.mjs";

export function flattenObj(obj, parent, res = {}){
    for(let key in obj){
        let propName = parent ? parent + '.' + key : key;
        if(typeof obj[key] == 'object'){
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}

/**
 * Create an ID from the input truncating or padding the value to make it reach 16 characters.
 * @param {string} id
 * @returns {string}
 */
export function staticID(id) {
    if ( id.length >= 16 ) return id.substring(0, 16);
    return id.padEnd(16, "0");
}

export async  function _onUpdateODMG(actor,data) {
    let level = foundry.utils.getProperty(data, "system.resources.odmg");
    if ( !Number.isFinite(level) ) level = 1;
    let effect = actor.effects.get(ActiveEffectHeXXen.ID.ODMG);
    if ( level < 1 ) return effect?.delete();
    if ( effect ) {
        return effect.update({ "flags.hexxen-tools.odmg": level });
    } else {
        effect = await ActiveEffect.implementation.fromStatusEffect("auessererSchaden", { parent: actor });
        effect.updateSource({ "flags.hexxen-tools.odmg": level });
        return ActiveEffect.implementation.create(effect, { parent: actor, keepId: true });
    }
}

export async  function _onUpdateIDMG(actor,data) {
    let level = foundry.utils.getProperty(data, "system.resources.idmg");
    if ( !Number.isFinite(level) ) level = 1;
    let effect = actor.effects.get(ActiveEffectHeXXen.ID.IDMG);
    if ( level < 1 ) return effect?.delete();
    if ( effect ) {
        return effect.update({ "flags.hexxen-tools.idmg": level });
    } else {
        effect = await ActiveEffect.implementation.fromStatusEffect("innererSchaden", { parent: actor });
        effect.updateSource({ "flags.hexxen-tools.idmg": level });
        return ActiveEffect.implementation.create(effect, { parent: actor, keepId: true });
    }
}

export async  function _onUpdateLDMG(actor,data) {
    let level = foundry.utils.getProperty(data, "system.resources.ldmg");
    if ( !Number.isFinite(level) ) level = 1;
    let effect = actor.effects.get(ActiveEffectHeXXen.ID.LDMG);
    if ( level < 1 ) return effect?.delete();
    if ( effect ) {
        return effect.update({ "flags.hexxen-tools.ldmg": level });
    } else {
        effect = await ActiveEffect.implementation.fromStatusEffect("laehmungsStufe", { parent: actor });
        effect.updateSource({ "flags.hexxen-tools.ldmg": level });
        return ActiveEffect.implementation.create(effect, { parent: actor, keepId: true });
    }
}

export async  function _onUpdateMDMG(actor,data) {
    let level = foundry.utils.getProperty(data, "system.resources.mdmg");
    if ( !Number.isFinite(level) ) level = 1;
    let effect = actor.effects.get(ActiveEffectHeXXen.ID.MDMG);
    if ( level < 1 ) return effect?.delete();
    if ( effect ) {
        return effect.update({ "flags.hexxen-tools.mdmg": level });
    } else {
        effect = await ActiveEffect.implementation.fromStatusEffect("malusStufe", { parent: actor });
        effect.updateSource({ "flags.hexxen-tools.mdmg": level });
        return ActiveEffect.implementation.create(effect, { parent: actor, keepId: true });
    }
}
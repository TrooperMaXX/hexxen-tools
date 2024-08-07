import { staticID } from "../utils/utils.mjs"

/**
 * Extend the base ActiveEffect class to implement system-specific logic.
 */
export default class ActiveEffectHeXXen extends ActiveEffect { 
 
  static ID = {
    ODMG: staticID("hexxen1733odmg"),
    IDMG: staticID("hexxen1733idmg"),
    LDMG: staticID("hexxen1733ldmg"),
    MDMG: staticID("hexxen1733mdmg")
  };


/* -------------------------------------------- */
isSuppressed = false;
  /**
   * Register listeners for custom handling in the TokenHUD.
   */
  static registerHUDListeners() {
	console.log("hexxen-tools | registerHUDListeners");
    Hooks.on("renderTokenHUD", this.onTokenHUDRender);
    document.addEventListener("click", this.onClickTokenHUD.bind(this), { capture: true });
    document.addEventListener("contextmenu", this.onClickTokenHUD.bind(this), { capture: true });
  }

  /* -------------------------------------------- */
/**
   * Adjust exhaustion icon display to match current level.
   * @param {Application} app  The TokenHUD application.
   * @param {jQuery} html      The TokenHUD HTML.
   */
static onTokenHUDRender(app, html) {
//	console.log("hexxen-tools | onTokenHUDRender");
    const actor = app.object.actor;
      //ODMG
    const odmglevel = foundry.utils.getProperty(actor, "system.resources.odmg");
    if ( Number.isFinite(odmglevel) && (odmglevel > 0) ) {
      const img = ActiveEffectHeXXen._getODMGImage(odmglevel);
      html.find('[data-status-id="auessererSchaden"]').css({
        objectPosition: "-100px",
        background: `url('${img}') no-repeat center / contain`
      });
    }
      //IDMG
    const idmglevel = foundry.utils.getProperty(actor, "system.resources.idmg");
    if ( Number.isFinite(idmglevel) && (idmglevel > 0) ) {
      const img = ActiveEffectHeXXen._getIDMGImage(idmglevel);
      html.find('[data-status-id="innererSchaden"]').css({
        objectPosition: "-100px",
        background: `url('${img}') no-repeat center / contain`
      });
    }
      //MDMG
    const mdmglevel = foundry.utils.getProperty(actor, "system.resources.mdmg");
    if ( Number.isFinite(mdmglevel) && (mdmglevel > 0) ) {
      const img = ActiveEffectHeXXen._getMDMGImage(mdmglevel);
      html.find('[data-status-id="malusStufe"]').css({
        objectPosition: "-100px",
        background: `url('${img}') no-repeat center / contain`
      });
    }
      //LDMG
    const ldmglevel = foundry.utils.getProperty(actor, "system.resources.ldmg");
    if ( Number.isFinite(ldmglevel) && (ldmglevel > 0) ) {
      const img = ActiveEffectHeXXen._getLDMGImage(ldmglevel);
      html.find('[data-status-id="laehmungsStufe"]').css({
        objectPosition: "-100px",
        background: `url('${img}') no-repeat center / contain`
      });
    }
  }

  /* -------------------------------------------- */

  
  /**
   * Get the image used to represent exhaustion at this level.
   * @param {number} level
   * @returns {string}
   */
  static _getODMGImage(level) {
    const icon = "modules/hexxen-tools/img/status/small-fire.svg";
    const split = icon.split(".");
    const ext = split.pop();
    const path = split.join(".");
    return `${path}-${level}.${ext}`;
  }

  static _getIDMGImage(level) {
    const icon = "modules/hexxen-tools/img/status/poison-bottle.svg";
    const split = icon.split(".");
    const ext = split.pop();
    const path = split.join(".");
    return `${path}-${level}.${ext}`;
  }

  static _getLDMGImage(level) {
    const icon = "modules/hexxen-tools/img/status/light-thorny-triskelion.svg";
    const split = icon.split(".");
    const ext = split.pop();
    const path = split.join(".");
    return `${path}-${level}.${ext}`;
  }

  static _getMDMGImage(level) {
    const icon = "modules/hexxen-tools/img/status/terror.svg";
    const split = icon.split(".");
    const ext = split.pop();
    const path = split.join(".");
    return `${path}-${level}.${ext}`;
  }

  /* -------------------------------------------- */

 /**
   * Implement custom behavior for select conditions on the token HUD.
   * @param {PointerEvent} event        The triggering event.
   */
 static onClickTokenHUD(event) {
  //  console.log("hexxen-tools | onClickTokenHUD");
    const { target } = event;
    if ( !target.classList?.contains("effect-control") ) return;

    const actor = canvas.hud.token.object?.actor;
    if ( !actor ) return;

    const id = target.dataset?.statusId;
    if ( id === "auessererSchaden" ) ActiveEffectHeXXen._manageODMG(event, actor);
    if ( id === "innererSchaden" ) ActiveEffectHeXXen._manageIDMG(event, actor);
    if ( id === "malusStufe" ) ActiveEffectHeXXen._manageMDMG(event, actor);
    if ( id === "laehmungsStufe" ) ActiveEffectHeXXen._manageLDMG(event, actor);
  }

  /* -------------------------------------------- */

  /**
   * Manage custom exhaustion cycling when interacting with the token HUD.
   * @param {PointerEvent} event        The triggering event.
   * @param {Actor5e} actor             The actor belonging to the token.
   */
  static _manageODMG(event, actor) {
    let level = foundry.utils.getProperty(actor, "system.resources.odmg");
    if ( !Number.isFinite(level) ) level = 0;
    event.preventDefault();
    event.stopPropagation();
    if ( event.button === 0 ) level++;
    else level--;
    const max = 5;
    actor.update({ "system.resources.odmg": Math.clamp(level, 0, max) });
  }
  static _manageIDMG(event, actor) {
    let level = foundry.utils.getProperty(actor, "system.resources.idmg");
    if ( !Number.isFinite(level) ) level = 0;
    event.preventDefault();
    event.stopPropagation();
    if ( event.button === 0 ) level++;
    else level--;
    const max = 5;
    actor.update({ "system.resources.idmg": Math.clamp(level, 0, max) });
  }

  static _manageLDMG(event, actor) {
    let level = foundry.utils.getProperty(actor, "system.resources.ldmg");
    if ( !Number.isFinite(level) ) level = 0;
    event.preventDefault();
    event.stopPropagation();
    if ( event.button === 0 ) level++;
    else level--;
    const max = 5;
    actor.update({ "system.resources.ldmg": Math.clamp(level, 0, max) });
  }
  static _manageMDMG(event, actor) {
    let level = foundry.utils.getProperty(actor, "system.resources.mdmg");
    if ( !Number.isFinite(level) ) level = 0;
    event.preventDefault();
    event.stopPropagation();
    if ( event.button === 0 ) level++;
    else level--;
    const max = 5;
    actor.update({ "system.resources.mdmg": Math.clamp(level, 0, max) });
  }
/* -------------------------------------------- */
  /*  Lifecycle                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
   if ( this.id === this.constructor.ID.ODMG ) this._prepareODMG();
   if ( this.id === this.constructor.ID.IDMG ) this._prepareIDMG();
   if ( this.id === this.constructor.ID.LDMG ) this._prepareLDMG();
   if ( this.id === this.constructor.ID.MDMG ) this._prepareMDMG();
  }

  /* -------------------------------------------- */

  /**
   * Modify the ActiveEffect's attributes based on the exhaustion level.
   * @protected
   */
  _prepareODMG() {
    let level = this.getFlag("hexxen-tools", "odmg");
    if ( !Number.isFinite(level) ) level = 1;
    // TODO: Remove when v11 support is dropped.
    if ( game.release.version < 12 ) this.icon = this.constructor._getODMGImage(level);
    else this.img = this.constructor._getODMGImage(level);
    this.name = `Äußerer Schaden ${level}`;
  }

  _prepareIDMG() {
    let level = this.getFlag("hexxen-tools", "idmg");
    if ( !Number.isFinite(level) ) level = 1;
    // TODO: Remove when v11 support is dropped.
    if ( game.release.version < 12 ) this.icon = this.constructor._getIDMGImage(level);
    else this.img = this.constructor._getIDMGImage(level);
    this.name = `Innerer Schaden ${level}`;
  }

  _prepareLDMG() {
    let level = this.getFlag("hexxen-tools", "ldmg");
    if ( !Number.isFinite(level) ) level = 1;
    // TODO: Remove when v11 support is dropped.
    if ( game.release.version < 12 ) this.icon = this.constructor._getLDMGImage(level);
    else this.img = this.constructor._getLDMGImage(level);
    this.name = `Lähmungs Stufe ${level}`;
  }
  _prepareMDMG() {
    let level = this.getFlag("hexxen-tools", "mdmg");
    if ( !Number.isFinite(level) ) level = 1;
    // TODO: Remove when v11 support is dropped.
    if ( game.release.version < 12 ) this.icon = this.constructor._getMDMGImage(level);
    else this.img = this.constructor._getMDMGImage(level);
    this.name = `Malus Stufe ${level}`;
    
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _onUpdate(data, options, userId) {
    super._onUpdate(data, options, userId);
        
    const odmgLevel = foundry.utils.getProperty(data, "flags.hexxen-tools.odmg");
    const idmgLevel = foundry.utils.getProperty(data, "flags.hexxen-tools.idmg");
    const ldmgLevel = foundry.utils.getProperty(data, "flags.hexxen-tools.ldmg");
    const mdmgLevel = foundry.utils.getProperty(data, "flags.hexxen-tools.mdmg");
    
    const name = this.name;

    // Display proper scrolling status effects for odmg
    if ( (this.id === this.constructor.ID.ODMG) && Number.isFinite(odmgLevel)) {
    
      // Temporarily set the name for the benefit of _displayScrollingTextStatus. We should improve this method to
      // accept a name parameter instead.
      this.name = `Äußerer Schaden ${odmgLevel}`;
      this._displayScrollingStatus(odmgLevel);
      this.name = name;
    }
// Display proper scrolling status effects for idmg
    if ( (this.id === this.constructor.ID.IDMG) && Number.isFinite(idmgLevel)) {
    
      // Temporarily set the name for the benefit of _displayScrollingTextStatus. We should improve this method to
      // accept a name parameter instead.
      this.name = `Innerer Schaden ${idmgLevel}`;
      this._displayScrollingStatus(idmgLevel);
      this.name = name;
    }
// Display proper scrolling status effects for ldmg
    if ( (this.id === this.constructor.ID.LDMG) && Number.isFinite(ldmgLevel)) {
    
      // Temporarily set the name for the benefit of _displayScrollingTextStatus. We should improve this method to
      // accept a name parameter instead.
      this.name = `Lähmungs Stufe ${ldmgLevel}`;
      this._displayScrollingStatus(ldmgLevel);
      this.name = name;
    }
// Display proper scrolling status effects for mdmg
    if ( (this.id === this.constructor.ID.MDMG) && Number.isFinite(mdmgLevel)) {
    
      // Temporarily set the name for the benefit of _displayScrollingTextStatus. We should improve this method to
      // accept a name parameter instead.
      this.name = `Malus Stufe ${mdmgLevel}`;
      this._displayScrollingStatus(mdmgLevel);
      this.name = name;
    }

  }

  /* -------------------------------------------- */
 /** @inheritdoc */
 static async _fromStatusEffect(statusId, { reference, ...effectData }, options) {
  if ( !("description" in effectData) && reference ) effectData.description = `@Embed[${reference} inline]`;
  return super._fromStatusEffect?.(statusId, effectData, options) ?? new this(effectData, options);
}
   /* -------------------------------------------- */

  /**
   * Create an ActiveEffect instance from some status effect ID.
   * Delegates to {@link ActiveEffect._fromStatusEffect} to create the ActiveEffect instance
   * after creating the ActiveEffect data from the status effect data if `CONFIG.statusEffects`.
   * @param {string} statusId                             The status effect ID.
   * @param {DocumentModificationContext} [options={}]    Additional options to pass to ActiveEffect instantiation.
   * @returns {Promise<ActiveEffect>}                     The created ActiveEffect instance.
   * @throws    An error if there's not status effect in `CONFIG.statusEffects` with the given status ID,
   *            and if the status has implicit statuses but doesn't have a static _id.
   */
  static async fromStatusEffect(statusId, options={}) {
    // TODO: This function has been copy & pasted from V12. Remove it once V11 support is dropped.

    const status = CONFIG.statusEffects.find(e => e.id === statusId);
    if ( !status ) throw new Error(`Invalid status ID "${statusId}" provided to ActiveEffect.fromStatusEffect`);
    if ( foundry.utils.isNewerVersion(game.version, 12) ) {
      for ( const [oldKey, newKey] of Object.entries({label: "name", icon: "img"}) ) {
        if ( !(newKey in status) && (oldKey in status) ) {
          const msg = `StatusEffectConfig#${oldKey} has been deprecated in favor of StatusEffectConfig#${newKey}`;
          foundry.utils.logCompatibilityWarning(msg, {since: 12, until: 14, once: true});
        }
      }
    }
    const {id, label, icon, hud, ...effectData} = foundry.utils.deepClone(status);
    effectData.name = game.i18n.localize(effectData.name ?? label);
    if ( game.release.generation < 12 ) effectData.icon ??= icon;
    else effectData.img ??= icon;
    effectData.statuses = Array.from(new Set([id, ...effectData.statuses ?? []]));
    if ( (effectData.statuses.length > 1) && !status._id ) {
      throw new Error("Status effects with implicit statuses must have a static _id");
    }
    return ActiveEffect.implementation._fromStatusEffect(statusId, effectData, options);
  }

}
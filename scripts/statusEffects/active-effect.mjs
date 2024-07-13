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
    const level = foundry.utils.getProperty(actor, "system.resources.odmg");
    if ( Number.isFinite(level) && (level > 0) ) {
      const img = ActiveEffectHeXXen._getExhaustionImage(level);
      html.find('[data-status-id="auessererSchaden"]').css({
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
  static _getExhaustionImage(level) {
	// console.log("hexxen-tools | _getExhaustionImage");
    const icon = "modules/hexxen-tools/img/status/small-fire.svg";
    const split = icon.split(".");
    const ext = split.pop();
    const path = split.join(".");
  //  console.log(`${path}-${level}.${ext}`);
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
    if ( id === "auessererSchaden" ) ActiveEffectHeXXen._manageExhaustion(event, actor);
  }

  /* -------------------------------------------- */

  /**
   * Manage custom exhaustion cycling when interacting with the token HUD.
   * @param {PointerEvent} event        The triggering event.
   * @param {Actor5e} actor             The actor belonging to the token.
   */
  static _manageExhaustion(event, actor) {
//	console.log("hexxen-tools | _manageExhaustion");
    let level = foundry.utils.getProperty(actor, "system.resources.odmg");
 // console.log(level);
    if ( !Number.isFinite(level) ) level = 0;
    event.preventDefault();
    event.stopPropagation();
    if ( event.button === 0 ) level++;
    else level--;
    const max = 5;
//	console.log(level);
    actor.update({ "system.resources.odmg": Math.clamp(level, 0, max) });
    
  }
/* -------------------------------------------- */
  /*  Lifecycle                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
   if ( this.id === this.constructor.ID.ODMG ) this._prepareAeussererSchadenStufe();
  }

  /* -------------------------------------------- */

  /**
   * Modify the ActiveEffect's attributes based on the exhaustion level.
   * @protected
   */
  _prepareAeussererSchadenStufe() {
    console.log("hexxen-tools | _prepareAeussererSchadenStufe");
    let level = this.getFlag("hexxen-tools", "odmg");
    if ( !Number.isFinite(level) ) level = 1;
    // TODO: Remove when v11 support is dropped.
    if ( game.release.version < 12 ) this.icon = this.constructor._getExhaustionImage(level);
    else this.img = this.constructor._getExhaustionImage(level);
    this.name = `Äußerer Schaden ${level}`;
    
  }
  /* -------------------------------------------- */

  /** @inheritDoc */
  _onUpdate(data, options, userId) {
    super._onUpdate(data, options, userId);
        
    const newLevel = foundry.utils.getProperty(data, "flags.hexxen-tools.odmg");
    
    const name = this.name;

    // Display proper scrolling status effects for exhaustion
    if ( (this.id === this.constructor.ID.ODMG) && Number.isFinite(newLevel)) {
    
      // Temporarily set the name for the benefit of _displayScrollingTextStatus. We should improve this method to
      // accept a name parameter instead.
      this.name = `Äußerer Schaden ${newLevel}`;
      this._displayScrollingStatus(newLevel);
      this.name = name;
    }

  }

  /* -------------------------------------------- */

}
/**
 * Extend the base ActiveEffect class to implement system-specific logic.
 */
export default class ActiveEffectHeXXen extends ActiveEffect { 
 
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
	console.log("hexxen-tools | onTokenHUDRender");
    const actor = app.object.actor;
    const level = foundry.utils.getProperty(actor, "system.resources.odmg");
    if ( Number.isFinite(level) && (level > 0) ) {
      const img = ActiveEffectHeXXen._getExhaustionImage(level);
      html.find('[data-status-id="aeussererSchaden"]').css({
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
	console.log("hexxen-tools | _getExhaustionImage");
    const icon = "modules/hexxen-tools/img/status/small-fire.svg";
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
    console.log("hexxen-tools | onClickTokenHUD");
    const { target } = event;
    if ( !target.classList?.contains("effect-control") ) return;

    const actor = canvas.hud.token.object?.actor;
    if ( !actor ) return;

    const id = target.dataset?.statusId;
    if ( id === "aeussererSchaden" ) ActiveEffectHeXXen._manageExhaustion(event, actor);
  }

  /* -------------------------------------------- */

  /**
   * Manage custom exhaustion cycling when interacting with the token HUD.
   * @param {PointerEvent} event        The triggering event.
   * @param {Actor5e} actor             The actor belonging to the token.
   */
  static _manageExhaustion(event, actor) {
	console.log("hexxen-tools | _manageExhaustion");
    let level = foundry.utils.getProperty(actor, "system.resources.odmg");
  //  if ( !Number.isFinite(level) ) return;
	console.log("hexxen-tools | Number.isFinite(level)");
    event.preventDefault();
   event.stopPropagation();
    if ( event.button === 0 ) level++;
    else level--;
    const max = 5;
	console.log(level);
    actor.update({ "system.resources.odmg": Math.clamp(level, 0, max) });
    
  }
/* -------------------------------------------- */
  /*  Lifecycle                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    if ( this.id === "aeussererSchaden" ) this._prepareExhaustionLevel();
  }

  /* -------------------------------------------- */

  /**
   * Modify the ActiveEffect's attributes based on the exhaustion level.
   * @protected
   */
  _prepareExhaustionLevel() {
   
    let level = 1;
    if ( !Number.isFinite(level) ) level = 1;
    // TODO: Remove when v11 support is dropped.
    if ( game.release.version < 12 ) this.icon = this.constructor._getExhaustionImage(level);
    else this.img = this.constructor._getExhaustionImage(level);
    this.name = `Äußerer Schaden ${level}`;
    
  }
  /* -------------------------------------------- */

  /** @inheritdoc */
  async _onCreate(data, options, userId) {
    super._onCreate(data, options, userId);
   
  }

  /* -------------------------------------------- */

}
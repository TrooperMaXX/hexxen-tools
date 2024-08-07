const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
/**
 * The ItemCreation application.
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 * @alias ItemCreator
 */
export default class ItemCreator extends HandlebarsApplicationMixin(ApplicationV2)  {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
   // id: "item-creator",
    classes: ["create-hexxen-item"],
    position: {
      width: 480,
      height: "auto"
    },
    tag: "form",
    actions: {
      reset: ItemCreator.reset,
    },
    form: {
      handler: ItemCreator.#onSubmit,
      closeOnSubmit: true
    },
    window: {
      icon: "fas fa-gear", // You can now add an icon to the header
      title: "Dicke Titten",
      contentClasses: ["standard-form"]
    }
  
  };

  /** @override */
  static PARTS = {
    form: {
      template: "modules/hexxen-tools/templates/item-creator.hbs"
    },
    footer: {
      template: "templates/generic/form-footer.hbs",
    },
  }

  /* -------------------------------------------- */

  /** @inheritDoc 
  get title() {
    console.log("Hey Alex");
    return `My Module: *****`;
  }*/

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(_options) {
    const setting = game.settings.get('hexxen-tools', 'auto-roll-ini');
    return {
      setting,
      buttons: [
        { type: "submit", icon: "fa-solid fa-save", label: "SETTINGS.Save" }
      ]
    }
  }
 static  #onSubmit(event, form, formData) {
    //const settings = foundry.utils.expandObject(formData.object);
  
}
_onRender(context, options) {
  this.element.querySelector("input[name=something]").addEventListener("click", /* ... */);
  // We will deal with reset later
}


static async reset() {
  await game.settings.set('hexxen-tools', 'auto-roll-ini', {});
}
  /* -------------------------------------------- */

  /**
   * Render the Character field as a choice between observed Actors.
   *
   
  #characterChoiceWidget(field, _groupConfig, inputConfig) {

    // Create the form field
    const fg = document.createElement("div");
    fg.className = "form-group stacked character";
    const ff = fg.appendChild(document.createElement("div"));
    ff.className = "form-fields";
    fg.insertAdjacentHTML("beforeend", `<p class="hint">${field.hint}</p>`);

    // Actor select
    const others = game.users.reduce((s, u) => {
      if ( u.character && !u.isSelf ) s.add(u.character.id);
      return s;
    }, new Set());

    const options = [];
    const ownerGroup = game.i18n.localize("OWNERSHIP.OWNER");
    const observerGroup = game.i18n.localize("OWNERSHIP.OBSERVER");
    for ( const actor of game.actors ) {
      if ( !actor.testUserPermission(this.document, "OBSERVER") ) continue;
      const a = {value: actor.id, label: actor.name, disabled: others.has(actor.id)};
      options.push({group: actor.isOwner ? ownerGroup : observerGroup, ...a});
    }

    const input = foundry.applications.fields.createSelectInput({...inputConfig,
      name: field.fieldPath,
      options,
      blank: "",
      sort: true
    });
    ff.appendChild(input);

    // Player character
    const c = this.document.character;
    if ( c ) {
      ff.insertAdjacentHTML("afterbegin", `<img class="avatar" src="${c.img}" alt="${c.name}">`);
      const release = `<button type="button" class="icon fa-solid fa-ban" data-action="releaseCharacter" 
                               data-tooltip="USER.SHEET.BUTTONS.RELEASE"></button>`
      ff.insertAdjacentHTML("beforeend", release);
    }
    return fg;
  }
*/
  /* -------------------------------------------- */

  /**
   * Handle button clicks to release the currently selected character.
   * 
   
  static #onReleaseCharacter(event) {
    event.preventDefault();
    const button = event.target;
    const fields = button.parentElement;
    fields.querySelector("select[name=character]").value = "";
    fields.querySelector("img.avatar").remove();
    button.remove();
    this.setPosition({height: "auto"});
  }*/
}

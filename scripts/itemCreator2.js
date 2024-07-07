export default class MyFormApplication extends FormApplication {
  constructor(exampleOption) {
    super();
    this.exampleOption = exampleOption;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['form'],
      popOut: true,
      template: "./modules/hexxen-tools/templates/item-creator.hbs",
      id: 'my-form-application',
      title: 'My FormApplication',
    });
  }

  getData() {
    // Send data to the template
    return {
      msg: this.exampleOption,
      color: 'red',
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
  }

  async _updateObject(event, formData) {
    console.log(formData.exampleInput);
  }
}

window.MyFormApplication = MyFormApplication;
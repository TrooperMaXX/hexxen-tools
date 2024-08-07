export default function registerSettings() {
  game.settings.register('hexxen-tools', 'replace-status-effects', {
    name: "HeXXen 1733 Zustände",
    hint: "Soll die Foundry Standard Status Effekte durch HeXXen 1733 Zustände ersetzt werden?",
    type: Boolean,
    default: true,
    scope: 'world',
    config: true,
    requiresReload: true,
  });

  game.settings.register('hexxen-tools', 'auto-roll-ini', {
    name: "Automatisch Initiative würfeln",
    hint: "Soll zu Kampfbeginn die Initiative für alle automatisch gewürfelt werden? ",
    type: Boolean,
    default: true,
    scope: 'world',
    config: true,
  });

  game.settings.register('hexxen-tools', 'add-ini-0', {
    name: "Automatisch Ini 0 hinzufügen",
    hint: "Soll zu Kampfbeginn ein 'Ini 0' Eintrag hinzugefügt werden? ",
    type: Boolean,
    default: true,
    scope: 'world',
    config: true,
  });
  
  game.settings.register('hexxen-tools', 'ini-0-img', {
    name: "Bild für Ini 0",
    hint: "Welches Bild soll für 'Ini 0' angezeigt werden?",
    type: String,
    default: 'modules/hexxen-tools/img/Ini0_1.webp',
    filePicker: true,
    scope: 'world',
    config: true,
  });

  game.settings.register('hexxen-tools', 'reset-ideen-coups', {
    name: "Automatisch nach einem Kampf Ideen & Coups auffüllen",
    hint: "Sollen Ideen & Coups nach einem Kampf wieder automatisch aufgefüllt werden? ",
    type: Boolean,
    default: true,
    scope: 'world',
    config: true,
  });

  game.settings.register('hexxen-tools', 'reset-aps', {
    name: "Automatisch zu Rundenanfang APs auffüllen",
    hint: "Sollen APs der Jäger zu Rundenanfang wieder automatisch aufgefüllt werden? ",
    type: Boolean,
    default: true,
    scope: 'world',
    config: true,
  });
}
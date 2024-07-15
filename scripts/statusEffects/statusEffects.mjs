export function registerHeXXenStatus() {
	return [
	  _aeussererSchaden(),
	  _innererSchaden(),
      _malusStufe(),
      _laehmungsStufe(),
	]
  }
  
  //================================
  //             EXTRA             =
  //================================
  
  function _dead() {
	return {
	  id: "dead",
	  name: "Dead",
	  label: "Dead",
	  img: "modules/hexxen-tools/img/status/death-skull.svg",
	  description: "Du bist Tod.",
	  changes: []
	}
  }
  
  //================================
  //           STACKING            =
  //================================
  function _aeussererSchaden() {
	return {
	  id: `auessererSchaden`,
	  _id: `hexxen1733odmg00`,
	  name: `Äußerer Schaden`,
	  label: `Äußerer Schaden` ,
	  img: `modules/hexxen-tools/img/status/small-fire.svg`,
	  description: `In [INI-O] 2 <b>Schmerzschaden</b> pro Stufe </br> <b>Abbau:</b> Unempfindlichkeit / <b>Helfen:</b> Erste Hilfe`,
	  changes: []
	}
  }
  function _innererSchaden() {
	return {
	  id: `innererSchaden`,
	  _id: `hexxen1733idmg00`,
	  name: `Innerer Schaden `,
	  label: `Innerer Schaden `,
	  img: `modules/hexxen-tools/img/status/poison-bottle.svg`,
	  description: `In [INI-O] 2 <b>Schmerzschaden</b> pro Stufe </br><b>Abbau:</b> Unempfindlichkeit / <b>Helfen:</b> Erste Hilfe`,
	  changes: []
	}
  }
  function _laehmungsStufe(stack) {
	return {
	  id: `laehmungsStufe`,
	  _id: `hexxen1733ldmg00`,
	  name: `Lähmungs Stufe `,
	  label: `Lähmungs Stufe `,
	  img: `modules/hexxen-tools/img/status/light-thorny-triskelion.svg`,
	  description: `-1 Malus pro Stufe </br><b>Abbau:</b> Geistesstärke / <b>Helfen:</b> Redekunst`,
	  changes: []
	}
  }
  function _malusStufe(stack) {
	return {
	  id: `malusStufe`,
	  _id: `hexxen1733mdmg00`,
	  name: `Malus Stufe `,
	  label: `Malus Stufe `,
	  img: `modules/hexxen-tools/img/status/terror.svg`,
	  description: `-1 Malus pro Stufe </br><b>Abbau:</b> Geistesstärke / <b>Helfen:</b> Redekunst`,
	  changes: []
	}
  }
  
  //================================
  //          OVERLAPPING          =
  //================================
  
 
  
  //================================
  //         NON-STACKING          =
  //================================
  //**
// function _petrified() {
//	return {
//	  id: "petrified",
//	  name: "Petrified",
//	  label: "Petrified",
//	  icon: "systems/dc20rpg/images/statuses/petrified.svg",
//	  description: "You and your mundane belongings are turned into stone and you are no longer aware of your surroundings. You become 10 times heavier and have <b>Resistance (Half)</b> to all damage. <br><br>Any <b>Poisons</b> or <b>Diseases</b> already affecting you are suspended and you are immune to any additional <b>Poison</b> and <b>Disease</b> while <b>Petrified</b>. <br><br>You are also <b>Paralyzed</b> (<b>Attack Checks</b> made from within 1 Space that Hit you are considered <b>Critical Hits</b>), <b>Stunned</b> (automatically fail <b>Agility</b>, <b>Might</b> and <b>Physical Saves</b>), <b>Exposed</b>(<b>Attack Checks</b> against you have ADV), and <b>Incapacitated</b> (You can not Speak, Concentrate, or spend Action Points).",
//	  changes: [
//		{
//		  key: "system.damageReduction.damageTypes.corrosion.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.cold.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.fire.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.radiant.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.lightning.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.poison.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.psychic.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.sonic.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.sonic.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.umbral.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.piercing.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.slashing.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		},
//		{
//		  key: "system.damageReduction.damageTypes.bludgeoning.resistance",
//		  mode: 5,
//		  priority: undefined,
//		  value: "true"
//		}
//	  ]
//	}
// }
 
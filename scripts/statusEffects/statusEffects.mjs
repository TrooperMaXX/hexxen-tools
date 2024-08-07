export function registerHeXXenStatus() {
	return [
	  _aeussererSchaden(),
	  _innererSchaden(),
      _malusStufe(),
      _laehmungsStufe(),
	  _dead(),
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
	  icon: "modules/hexxen-tools/img/status/death-skull.svg",
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
	  icon: `modules/hexxen-tools/img/status/small-fire.svg`,
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
	  icon: `modules/hexxen-tools/img/status/poison-bottle.svg`,
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
	  icon: `modules/hexxen-tools/img/status/light-thorny-triskelion.svg`,
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
	  icon: `modules/hexxen-tools/img/status/terror.svg`,
	  description: `-1 Malus pro Stufe </br><b>Abbau:</b> Geistesstärke / <b>Helfen:</b> Redekunst`,
	  changes: []
	}
  }
 
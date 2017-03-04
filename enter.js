/**
 * Functions for entering 1099B transactions into TurboTax Online.
 *
 * See README.md for instructions.
 */

function waitFor(millisecs) {
  return new Promise(function(resolve, reject) {
    window.setTimeout(function() { resolve(true); }, millisecs);
  });
}

function shortPause() {
  return waitFor(1000);
}

function longPause() {
  return waitFor(6000);
}

function click(eltId) {
  return new Promise(function(resolve, reject) {
    document.getElementById(eltId).click();
    resolve(true);
  });
}

function focus(eltId) {
  return new Promise(function(resolve, reject) {
    document.getElementById(eltId).focus();
    resolve(true);
  });
}

function enterData(eltId, value) {
  return new Promise(function(resolve, reject) {
    document.getElementById(eltId).value = value;
    resolve(true);
  });
}

function enterOneRow(data, haveMore) {
  return longPause()
      .then(click.bind(null, "txtblk_00"))
      .then(shortPause)
      .then(focus.bind(null, "edt_00"))
      .then(shortPause)
      .then(enterData.bind(null, "edt_00", data["desc"]))
      .then(shortPause)
      .then(focus.bind(null, "edt_01"))
      .then(shortPause)
      .then(enterData.bind(null, "edt_01", data["acq"]))
      .then(shortPause)
      .then(focus.bind(null, "edt_02"))
      .then(shortPause)
      .then(enterData.bind(null, "edt_02", data["sale"]))
      .then(shortPause)
      .then(focus.bind(null, "edt_03"))
      .then(shortPause)
      .then(enterData.bind(null, "edt_03", data["proceeds"]))
      .then(shortPause)
      .then(focus.bind(null, "edt_04"))
      .then(shortPause)
      .then(enterData.bind(null, "edt_04", data["basis"]))
      .then(shortPause)
      .then(focus.bind(null, "combo_00"))
      .then(shortPause)
      .then(enterData.bind(null, "combo_00", data["category"]))
      .then(shortPause)
      .then(focus.bind(null, "edt_00"))
      .then(shortPause)
      .then(click.bind(null, "Done_00"))
      .then(longPause)
      .then(click.bind(null, haveMore ? "txtblk_00_0" : "txtblk_01_0"))
      .then(shortPause)
      .then(click.bind(null, "Continue_00"))
      .then(longPause);
}

function enterAll(entries) {
  entries.reduce(function(prev, currEntry, index) {
    return prev.then(function() {
      return enterOneRow(currEntry, index + 1 < entries.length);
    });
  }, Promise.resolve()).then(function() {
    console.log('All Done!');
  });
}

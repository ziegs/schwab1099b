/**
 * Functions for entering 1099B transactions into TurboTax Online.
 *
 * See README.md for instructions.
 */

function getInputName(num) {
  var base36 = num.toString(36);
  if (base36.length == 1)
    base36 = "0" + base36;

  return '_' + base36;
}

// Order of TurboTax fields in the form
FIELDS = ['desc', 'acq', 'sale', 'proceeds', 'basis']

function addEntries() {
  var time = 0;
  for (var c = 0; c < 21; c++) {
    window.setTimeout(function() {
      var e = document.getElementById('_00');
      e.click();
    }, time);
    time += 500;
  }
}

function enterValues(start, max) {
  var time = 0;

  for (var line = 0; line < max; line++) {
    for (var i = 0; i < 5; i++) {
      var elt = document.getElementById('edt' + getInputName(line*6 + i));
      var value = entries[line + start][FIELDS[i]];
      window.setTimeout(function(e) {
        e.focus();
      }, time, elt);
      time += 100;
      window.setTimeout(function(e, v) {
        e.value = v;
      }, time, elt, value);
      time += 100;
    }
    var wash = entries[line + start]['wash'];
    if (wash) {
      elt = document.getElementById('chk' + getInputName(line * 2));
      window.setTimeout(function(e) {
        e.click();
      }, time, elt);
      time += 100;
      elt = document.getElementById('combo' + getInputName(line));
      window.setTimeout(function(e) {
        e.selectedIndex = 3;
      }, time, elt);
      time += 100;
      elt = document.getElementById('edt' + getInputName(line*6 + 5));
      window.setTimeout(function(e) {
        e.focus();
      }, time, elt);
      time += 100;
      window.setTimeout(function(e, v) {
        e.value = v;
      }, time, elt, wash);
      time += 100;
    }
  }
  window.setTimeout(function(e) {
    alert("Done. Go to first entry and press TAB until the end. Then click Continue");
  }, time);
}

// First 24:
// enterValues(entries, 0, 24);
// Next 24:
// enterValues(entries, 24, 24);
// Repeat until done.

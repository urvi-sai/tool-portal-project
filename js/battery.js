// Average current is the device's current use, averaged over one full cycle
// (one wake-up plus the sleep that follows). Battery life is capacity divided
// by that average.
function estimateBatteryLife(capacityMah, activeMa, activeSeconds, sleepUa, intervalMinutes) {
  var cycleSeconds = intervalMinutes * 60;
  var sleepSeconds = cycleSeconds - activeSeconds;
  var sleepMa = sleepUa / 1000;
  var averageMa = (activeMa * activeSeconds + sleepMa * sleepSeconds) / cycleSeconds;
  var hours = capacityMah / averageMa;
  return { averageMa: averageMa, hours: hours, days: hours / 24, years: hours / 24 / 365 };
}

function formatNumber(value, digits) {
  return value.toLocaleString(undefined, { maximumFractionDigits: digits });
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('battery-form');
  var result = document.getElementById('result');

  function readNumber(id) {
    var text = document.getElementById(id).value.trim();
    return text === '' ? NaN : Number(text);
  }

  function showError(message) {
    result.className = 'error';
    result.textContent = message;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var capacity = readNumber('capacity');
    var activeMa = readNumber('active-current');
    var activeSeconds = readNumber('active-time');
    var sleepUa = readNumber('sleep-current');
    var interval = readNumber('interval');

    var values = [capacity, activeMa, activeSeconds, sleepUa, interval];
    if (values.some(function (v) { return !isFinite(v); })) {
      showError('Please fill in every box with a number.');
      return;
    }
    if (capacity <= 0 || interval <= 0 || activeSeconds <= 0) {
      showError('Battery capacity, time awake, and time between readings must be greater than zero.');
      return;
    }
    if (activeMa < 0 || sleepUa < 0) {
      showError('Current cannot be negative.');
      return;
    }
    if (activeMa === 0 && sleepUa === 0) {
      showError('The device must use some current, otherwise the battery would last forever.');
      return;
    }
    if (activeSeconds > interval * 60) {
      showError('The time awake cannot be longer than the time between readings.');
      return;
    }

    var r = estimateBatteryLife(capacity, activeMa, activeSeconds, sleepUa, interval);
    result.className = '';
    result.innerHTML =
      '<h2>Estimated battery life</h2>' +
      '<p class="big">' + formatNumber(r.days, 1) + ' days</p>' +
      '<p>That is about ' + formatNumber(r.hours, 0) + ' hours, or ' +
      formatNumber(r.years, 2) + ' years.</p>' +
      '<p>On average the device uses ' + formatNumber(r.averageMa, 4) + ' mA.</p>' +
      '<p class="hint">This is an estimate. Real batteries last less in the cold and lose capacity as they age.</p>';
  });
});

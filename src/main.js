// Progressive enhancement only: every page works without this file.
(function () {
  var S = function (k, fallback) {
    var el = document.querySelector('#ui-strings [data-k="' + k + '"]');
    return el ? el.textContent : fallback;
  };
  var prefix = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2);
  prefix = prefix === 'en' ? '' : '/' + prefix;
  'use strict';

  // Mobile navigation toggle -------------------------------------------
  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('nav-list');
  if (toggle && list) {
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      list.classList.toggle('open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && list.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        list.classList.remove('open');
        toggle.focus();
      }
    });
  }

  // Victoria Falls month guide: mark the current month, chart tooltips --
  var chart = document.getElementById('flow-chart');
  if (chart) {
    var now = new Date().getMonth();
    document.querySelectorAll('.month[data-month="' + now + '"], .month-nav a[data-month="' + now + '"]').forEach(function (el) {
      el.classList.add('is-now');
      var flag = el.querySelector('.now-flag');
      if (flag) flag.hidden = false;
      if (el.tagName === 'A') el.setAttribute('aria-label', el.textContent + ' ' + S('thisMonth', '(this month)'));
    });

    var tip = chart.querySelector('.chart-tip');
    var show = function (g) {
      var box = g.querySelector('.bar').getBoundingClientRect();
      var host = chart.getBoundingClientRect();
      tip.textContent = g.getAttribute('data-tip');
      tip.hidden = false;
      tip.style.left = Math.min(Math.max(box.left - host.left + box.width / 2, 90), host.width - 90) + 'px';
      tip.style.top = box.top - host.top - 8 + 'px';
    };
    var hide = function () { tip.hidden = true; };
    chart.querySelectorAll('.bar-group').forEach(function (g) {
      g.addEventListener('mouseenter', function () { show(g); });
      g.addEventListener('focus', function () { show(g); });
      g.addEventListener('mouseleave', hide);
      g.addEventListener('blur', hide);
      g.addEventListener('click', function () {
        var m = document.querySelector('.month[data-month="' + g.getAttribute('data-month') + '"]');
        if (m) m.scrollIntoView();
      });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); g.dispatchEvent(new Event('click')); }
      });
    });
  }

  // Enquiry form -------------------------------------------------------
  // Messages come from the page (#ui-strings) so each language version shows its own.
  var form = document.getElementById('enquiry');
  if (form) {
    var params = new URLSearchParams(location.search);
    var j = params.get('journey');
    if (j && form.journey) form.journey.value = j;

    var status = form.querySelector('.form-status');
    var say = function (msg) { status.hidden = false; status.textContent = msg; };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.website.value) return; // honeypot
      var missing = Array.prototype.filter.call(form.querySelectorAll('[required]'), function (el) {
        return el.type === 'checkbox' ? !el.checked : !el.value.trim() || !el.checkValidity();
      });
      form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
      if (missing.length) {
        missing.forEach(function (el) { el.setAttribute('aria-invalid', 'true'); });
        say(S('check', 'Please check:') + ' ' + missing.map(function (el) {
          return form.querySelector('label[for="' + el.id + '"]').textContent.replace('*', '').trim();
        }).join(', ') + '.');
        missing[0].focus();
        return;
      }

      var data = new FormData(form);
      data.delete('website');
      var endpoint = form.getAttribute('data-endpoint');

      if (endpoint) {
        say(S('sending', 'Sending…'));
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            location.href = prefix + '/enquire/thanks/';
          })
          .catch(function () {
  var S = function (k, fallback) {
    var el = document.querySelector('#ui-strings [data-k="' + k + '"]');
    return el ? el.textContent : fallback;
  };
  var prefix = (document.documentElement.getAttribute('lang') || 'en').slice(0, 2);
  prefix = prefix === 'en' ? '' : '/' + prefix;
            say(S('failed', 'Sorry, that did not send. Please email us at') + ' ' + form.getAttribute('data-email') + '.');
          });
        return;
      }

      // No endpoint configured: hand the enquiry to the visitor's email app.
      var lines = [];
      var seen = {};
      data.forEach(function (v, k) {
        if (k === 'consent' || !v) return;
        if (seen[k] !== undefined) { lines[seen[k]] += ', ' + v; return; }
        seen[k] = lines.length;
        lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v);
      });
      var subject = S('subject', 'Trip enquiry from') + ' ' + form.name.value.trim();
      location.href = 'mailto:' + form.getAttribute('data-email') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      say(S('opened', 'Your email app should open with the enquiry filled in. Press send there to reach us. If nothing opened, email us at') + ' ' + form.getAttribute('data-email') + '.');
    });
  }
})();

/* Accesso con email e password (Firebase). Le regole del database fanno entrare solo il proprietario.
   Uso: accessoRichiesto(function(utente){ ...parte l'app... }); si resta collegati sul dispositivo. */
(function(){
  var css = '#acc-vel{position:fixed;inset:0;z-index:99999;background:#f3f8fc;display:flex;align-items:center;justify-content:center;padding:20px;font-family:-apple-system,system-ui,sans-serif}'
    + '#acc-vel form{width:100%;max-width:340px;background:#fff;border:1px solid #cfe0ec;border-radius:16px;padding:22px;box-shadow:0 6px 24px rgba(0,0,0,.08)}'
    + '#acc-vel h2{margin:0 0 4px;font-size:20px;color:#1b2833}#acc-vel p{margin:0 0 14px;font-size:14px;color:#566a7a}'
    + '#acc-vel input{width:100%;box-sizing:border-box;margin:0 0 10px;padding:12px;font-size:16px;border:1px solid #cfe0ec;border-radius:10px;background:#f3f8fc;color:#1b2833}'
    + '#acc-vel button{width:100%;padding:12px;font-size:16px;font-weight:600;border:0;border-radius:10px;background:#f28c28;color:#231300}'
    + '#acc-vel .acc-link{background:none;color:#b35900;font-size:14px;font-weight:500;margin-top:8px}'
    + '#acc-vel .acc-msg{min-height:20px;margin:6px 0 0;font-size:14px;color:#d03a2f}';
  function errore(c){
    var m = {
      'auth/invalid-email':'L’email non sembra giusta.',
      'auth/missing-password':'Scrivi la password.',
      'auth/invalid-credential':'Email o password sbagliate.',
      'auth/wrong-password':'Email o password sbagliate.',
      'auth/user-not-found':'Email o password sbagliate.',
      'auth/too-many-requests':'Troppi tentativi. Aspetta qualche minuto e riprova.',
      'auth/network-request-failed':'Non riesco a collegarmi: controlla la connessione.',
      'auth/operation-not-allowed':'L’accesso con email non è ancora attivo sul server.'
    };
    return m[c] || 'Qualcosa è andato storto. Riprova tra poco.';
  }
  function mostra(titolo){
    if(document.getElementById('acc-vel')) return;
    var st = document.createElement('style'); st.id = 'acc-stile'; st.textContent = css; document.head.appendChild(st);
    var v = document.createElement('div'); v.id = 'acc-vel';
    v.innerHTML = '<form id="acc-form"><h2>' + titolo + '</h2><p>Accedi con la tua email e la tua password.</p>'
      + '<input id="acc-email" type="email" autocomplete="username" placeholder="Email" required>'
      + '<input id="acc-pw" type="password" autocomplete="current-password" placeholder="Password" required>'
      + '<button type="submit" id="acc-vai">Accedi</button>'
      + '<button type="button" class="acc-link" id="acc-reset">Password dimenticata</button>'
      + '<div class="acc-msg" id="acc-msg"></div></form>';
    document.body.appendChild(v);
    var msg = document.getElementById('acc-msg');
    document.getElementById('acc-form').addEventListener('submit', function(e){
      e.preventDefault();
      msg.style.color = '#d03a2f'; msg.textContent = '';
      var b = document.getElementById('acc-vai'); b.disabled = true; b.textContent = 'Attendi…';
      firebase.auth().signInWithEmailAndPassword(document.getElementById('acc-email').value.trim(), document.getElementById('acc-pw').value)
        .catch(function(er){ msg.textContent = errore(er && er.code); b.disabled = false; b.textContent = 'Accedi'; });
    });
    document.getElementById('acc-reset').addEventListener('click', function(){
      var em = document.getElementById('acc-email').value.trim();
      if(!em){ msg.style.color = '#d03a2f'; msg.textContent = 'Scrivi prima la tua email.'; return; }
      firebase.auth().sendPasswordResetEmail(em).then(function(){
        msg.style.color = '#2f9a4a'; msg.textContent = 'Ti ho mandato una email per scegliere una password nuova.';
      }, function(er){ msg.style.color = '#d03a2f'; msg.textContent = errore(er && er.code); });
    });
  }
  function nascondi(){
    var v = document.getElementById('acc-vel'); if(v) v.remove();
    var s = document.getElementById('acc-stile'); if(s) s.remove();
  }
  window.accessoRichiesto = function(titolo, avvia){
    var partito = false;
    firebase.auth().onAuthStateChanged(function(u){
      if(u){ nascondi(); if(!partito){ partito = true; avvia(u); } }
      else if(partito){ location.reload(); }
      else mostra(titolo);
    });
  };
  window.esciDallAccount = function(){ return firebase.auth().signOut(); };
})();

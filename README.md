# Dare e Avere Pub

App personale per segnare quello che Tommi paga di tasca sua per il pub e quello che prende dal pub, con la differenza calcolata al volo e un PDF da mandare al pub.

Sito statico, nessuna build necessaria: `index.html` è tutta l'app.

## Come vederla online (GitHub Pages)

Dopo il primo push, su GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)**.
L'indirizzo sarà `https://tommyfonti-art.github.io/dare-avere-pub/`.

## Attivare il salvataggio (Firebase, gratuito)

Finché `firebase-config.js` ha i valori finti, l'app funziona ma le voci non si salvano: spariscono ricaricando la pagina.

1. Vai su [console.firebase.google.com](https://console.firebase.google.com), accedi col tuo account Google.
2. **Aggiungi progetto**, dagli un nome (es. `dare-avere-pub`), continua con le impostazioni di default.
3. Nel progetto: **Build → Firestore Database → Crea database** → scegli una regione europea (es. `eur3`) → modalità **test** (va bene per iniziare; se un giorno condividi il link con altri, va sostituita con regole più strette).
4. **Impostazioni progetto** (icona ingranaggio) → **Generale** → scorri fino a **Le tue app** → clicca l'icona web `</>` → registra l'app (basta un nickname).
5. Ti mostra un blocco `firebaseConfig = {...}`: copia quei valori dentro `firebase-config.js` al posto dei placeholder.
6. Fai commit e push (o chiedi a Claude di farlo).

Da quel momento l'app salva davvero, su un database solo tuo.

## Le voci di partenza

Le 16 voci che c'erano già nella versione precedente (quella dentro Claude) sono incluse nel codice. La primissima volta che qualcuno apre la pagina con Firebase configurato e l'archivio è ancora vuoto, l'app le importa da sola, senza bisogno di toccare nulla. Da quel momento l'archivio non è più vuoto, quindi non si ripete.

## Struttura

- `index.html` — tutta l'app (markup, stile, logica, e le voci di partenza da importare)
- `firebase-config.js` — le tue chiavi Firebase (non committare quelle vere in un repo pubblico se ci tieni alla privacy: puoi rendere il repo privato)
- `manifest.json`, `icon-*.png`, `apple-touch-icon.png` — per poterla aggiungere alla schermata Home come un'app

## Aggiornamenti

Per qualsiasi modifica (nuove voci di default, correzioni, nuove funzioni), basta chiederlo a Claude nella chat di Dare e Avere Pub: aggiorna il codice e lo pubblica qui.

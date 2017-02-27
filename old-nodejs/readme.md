##Compilazione e Avvio su Windows
- Installa NodeJs https://nodejs.org/dist/v7.5.0/node-v7.5.0-x64.msi
- Da linea di comando installa browserify e minifier
- 'npm install -g browserify'
- 'npm install -g minifier'
- Avvia windows.bat
- La dashboard è accessibile su 127.0.0.1:3000
- Per inviare le richieste simulando il server si può usare HTTP Requester per Firefox https://addons.mozilla.org/it/firefox/addon/httprequester/
- Per avviarlo è necessaria una richiesta POST all'indirizzo 127.0.0.1:3000/game/start (Simula il server centrale che avvia il gioco), le altre API sono nel file app.js
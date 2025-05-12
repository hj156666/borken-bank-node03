const sqlite3 = require('sqlite3').verbose();

// Verbindung zur neuen SQLite-Datenbank herstellen (oder erstellen, falls sie nicht existiert)
const db = new sqlite3.Database('./neue-datenbank.db', (err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der neuen Datenbank:', err.message);
    } else {
        console.log('Verbindung zur neuen SQLite-Datenbank hergestellt.');
    }
});

// Neue Tabelle "Kunde" erstellen
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Kunde (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nachname TEXT NOT NULL,
            vorname TEXT NOT NULL,
            benutzername TEXT UNIQUE NOT NULL,
            kennwort TEXT NOT NULL,
            istEingeloggt BOOLEAN DEFAULT 0
        )
    `, (err) => {
        if (err) {
            console.error('Fehler beim Erstellen der Tabelle "Kunde":', err.message);
        } else {
            console.log('Tabelle "Kunde" erfolgreich erstellt oder existiert bereits.');

            // Beispielkunde einfügen
            const insertStmt = `
                INSERT INTO Kunde (nachname, vorname, benutzername, kennwort, istEingeloggt)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.run(insertStmt, ['Mustermann', 'Max', 'maxmuster', 'passwort123', 0], (err) => {
                if (err) {
                    console.error('Fehler beim Einfügen des Beispielkunden:', err.message);
                } else {
                    console.log('Beispielkunde erfolgreich hinzugefügt.');
                }
            });
        }
    });
});

// Verbindung schließen
db.close((err) => {
    if (err) {
        console.error('Fehler beim Schließen der neuen Datenbank:', err.message);
    } else {
        console.log('Neue Datenbankverbindung geschlossen.');
    }
});
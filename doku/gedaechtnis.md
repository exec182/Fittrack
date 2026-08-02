# Projektgedächtnis

Diese Datei fasst die wichtigsten Projektinformationen und Arbeitsnotizen für das Diättool zusammen.

## Überblick
- Projektname: Diättool
- Arbeitsbereich: Webserver + MySQL-Backend
- Startpunkt für die lokale Ausführung: Repository-Root

## Wichtige Orte
- Webserver: [webserver](../webserver)
- MySQL-Skripte und Dumps: [mysql](../mysql)
- Datenbank-Migrationen und Prüfskripte: [doku](.)

## Aktueller Aufbau
- Der Webserver wird über den Ordner [webserver](../webserver) bereitgestellt.
- Die Datenbank wird über die Konfiguration in [compose.yaml](../compose.yaml) gestartet.
- Die Haupt-Frontend-Logik befindet sich in [webserver/overview.js](../webserver/overview.js).

## Starten der Umgebung
Im Repository-Root ausführen:

```powershell
docker compose -f compose.yaml up -d --build
```

## Wichtige Hinweise
- SQL-Migrationen und Prüfskripte liegen im Ordner [doku](.).
- Für Änderungen an Datenbankstruktur oder Importlogik sollten die entsprechenden Dateien in [doku](.) mitgeführt werden.
- Die aktuelle Dokumentation sollte bei Änderungen immer mit aktualisiert werden, damit das Projektgedächtnis nicht verloren geht.

## Merksätze
- Das Projekt ist aktuell als Docker-Compose-Setup organisiert.
- Die zentrale Bedienlogik liegt im Webserver-Frontend.
- Datenbankänderungen sollten immer nachvollziehbar in der Doku und in den SQL-Skripten festgehalten werden.

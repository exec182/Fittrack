# Diättool

Diättool ist eine selbst gehostete Webanwendung, mit der Gewichtsverlauf, Körpermaße, persönliche Ziele und Training gemeinsam dokumentiert und ausgewertet werden können. Die Daten bleiben in der eigenen MySQL-Datenbank. Die Anwendung eignet sich als persönliches Verlaufsprotokoll, ersetzt aber keine medizinische Beratung.

## Funktionsumfang

- Gewicht sowie weitere Messwerte wie Brust-, Bauch-, Bund- und Poumfang erfassen
- Gewichtsverlauf, Änderungsrate, BMI und einen rechnerischen Kalorienbedarf anzeigen
- Zwischenziele definieren, automatisch als erreicht markieren und Belohnungen dokumentieren
- Einen versionierten Wochen-Trainingsplan verwalten
- Durchgeführte Trainings inklusive Dauer, Belastung, Schmerzen und Einschränkungen protokollieren
- Zeiträume regelbasiert analysieren und Training und Gewichtsverlauf gegenüberstellen
- Lesegeschützte Freigabelinks und Share-Pictures erzeugen
- Als Progressive Web App (PWA) auf unterstützten Geräten installieren

Die Oberfläche spricht über eine PHP-API mit MySQL. Apache und PHP laufen gemeinsam im Webserver-Container; MySQL läuft in einem separaten Container. Messungen, Ziele und Trainingsdaten werden dem jeweils angemeldeten Konto zugeordnet. Docker-Volumes erhalten Datenbank und Share-Pictures auch beim Neustart oder Austausch der Container.

## Voraussetzungen

Empfohlen wird ein aktuelles Linux-System mit Docker Engine und dem Docker-Compose-Plugin. Die offiziellen Anleitungen erklären die Installation:

- [Docker Engine unter Linux installieren](https://docs.docker.com/engine/install/)
- [Docker Desktop für Windows installieren](https://docs.docker.com/desktop/setup/install/windows-install/)

Unter Windows wird Docker Desktop mit WSL 2 empfohlen. Die folgenden `docker compose`-Befehle funktionieren in PowerShell und in einem WSL-Terminal. Zusätzlich werden Git und ungefähr 1 GB freier Speicherplatz benötigt.

## Installation

### 1. Projekt beziehen

Repository klonen oder als Archiv herunterladen und in den Projektordner wechseln:

```bash
git clone https://github.com/exec182/Fittrack.git
cd Fittrack
```

### 2. Konfiguration anlegen

Linux/macOS/WSL:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Anschließend in `.env` mindestens beide mit `change_me_...` vorbelegten Passwörter durch lange, zufällige Werte ersetzen:

```dotenv
MYSQL_HOST=mysql
MYSQL_ROOT_PASSWORD=<zufälliges-Root-Passwort>
MYSQL_DATABASE=diattool_db
MYSQL_USER=diattool_user
MYSQL_PASSWORD=<zufälliges-Anwendungspasswort>
WEB_BIND_ADDRESS=127.0.0.1
WEB_PORT=8080
TRUST_PROXY_HTTPS=0
```

`WEB_BIND_ADDRESS=127.0.0.1` macht die Anwendung nur auf dem Docker-Host erreichbar und ist die sichere Voreinstellung. Für einen direkten Zugriff aus dem lokalen Netzwerk kann bewusst `0.0.0.0` verwendet werden. Für Zugriffe aus dem Internet sollte stattdessen ein HTTPS-Reverse-Proxy eingesetzt werden.

> **Wichtig:** MySQL verwendet die Zugangsdaten zur Initialisierung nur beim ersten Erstellen des Volumes. Eine spätere Änderung in `.env` ändert vorhandene Datenbankkonten nicht automatisch.

### 3. Container bauen und starten

```bash
docker compose up -d --build
docker compose ps
```

Nach erfolgreichem Start ist Diättool unter [http://localhost:8080](http://localhost:8080) erreichbar. Beim ersten Start erstellt MySQL das Schema und die benötigten Messwerttypen automatisch. Die im Initial-Dump enthaltenen Demo-Konten besitzen absichtlich kein gültiges Passwort.

Logs lassen sich bei Problemen so verfolgen:

```bash
docker compose logs -f webserver mysql
```

## Account ohne freigeschaltete Registrierung anlegen

Die Selbstregistrierung ist standardmäßig in `webserver/app_config.php` deaktiviert. Ein Administrator kann ein Konto direkt in der Datenbank anlegen, ohne sie in der GUI freizuschalten.

Zuerst im PHP-Container einen Argon2id-Hash erzeugen. Das Beispielpasswort unbedingt ersetzen:

```bash
docker compose exec webserver php -r 'echo password_hash($argv[1], PASSWORD_ARGON2ID), PHP_EOL;' 'HIER-EIN-LANGES-PASSWORT-EINSETZEN'
```

PowerShell kann denselben Befehl unverändert ausführen. Das Klartextpasswort kann dabei in der Shell-Historie landen; die betreffende Zeile sollte anschließend aus der Historie entfernt werden. Den ausgegebenen Hash vollständig kopieren.

Danach die MySQL-Konsole öffnen; das Datenbankpasswort wird innerhalb des Containers aus dessen Umgebung gelesen:

```bash
docker compose exec mysql sh -lc 'mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"'
```

In der MySQL-Konsole den Benutzernamen und den zuvor kopierten Hash einsetzen:

```sql
INSERT INTO `user` (`nick`, `password`)
VALUES ('mein_benutzername', '$argon2id$...VOLLSTAENDIGER_HASH...');
EXIT;
```

Danach ist die Anmeldung sofort möglich. Zielgewicht, Körpergröße, Geburtsdatum und Geschlecht können nach der ersten Anmeldung im Profil gepflegt werden. Das Passwort sollte mindestens 12 Zeichen lang und nur für diesen Dienst verwendet werden.

Optional steht phpMyAdmin lokal zur Verfügung:

```bash
docker compose --profile tools up -d phpmyadmin
```

Es ist danach ausschließlich auf dem Docker-Host unter [http://127.0.0.1:8091](http://127.0.0.1:8091) erreichbar. Nach der Administration sollte es wieder beendet werden:

```bash
docker compose --profile tools stop phpmyadmin
```

## Nutzungsempfehlung

Für aussagekräftige Trends ist eine regelmäßige Messroutine wichtiger als ein einzelner Messwert:

1. Gewicht möglichst täglich unter vergleichbaren Bedingungen messen, idealerweise morgens nach dem Aufstehen und Toilettengang, vor dem Frühstück und mit ähnlicher Kleidung.
2. Kurzfristige Schwankungen durch Wasserhaushalt, Salz, Verdauung und Training nicht überbewerten. Den Verlauf über mehrere Wochen betrachten.
3. Körperumfänge etwa einmal pro Woche an derselben Stelle und unter gleichen Bedingungen erfassen.
4. Training zeitnah eintragen und Belastungs- sowie Schmerzangaben ehrlich dokumentieren. Das verbessert die spätere Gegenüberstellung.
5. Realistische Zwischenziele setzen und die Zielwerte bei Bedarf im Profil aktualisieren.

BMI, Kalorienbedarf, Hochrechnungen und Analysen sind rechnerische Orientierungshilfen, keine Diagnose oder individuelle Therapieempfehlung. Bei gesundheitlichen Beschwerden oder einer geplanten starken Gewichtsveränderung sollte medizinischer Rat eingeholt werden.

## Betrieb hinter einem Reverse-Proxy

Für externen Zugriff wird HTTPS über einen Reverse-Proxy empfohlen. Dieser sollte TLS-Zertifikate verwalten und nur den Webserver veröffentlichen. MySQL und phpMyAdmin dürfen nicht frei aus dem Internet erreichbar sein.

### Beispiel mit Traefik

Das folgende Beispiel setzt einen bereits laufenden Traefik voraus, der das externe Docker-Netzwerk `proxy` verwendet und einen HTTPS-Entrypoint namens `websecure` besitzt.

Netzwerk einmalig anlegen:

```bash
docker network create proxy
```

Neben `compose.yaml` eine Datei `compose.traefik.yaml` erstellen:

```yaml
services:
  webserver:
    environment:
      TRUST_PROXY_HTTPS: "1"
    labels:
      - traefik.enable=true
      - traefik.docker.network=proxy
      - traefik.http.routers.diaettool.rule=Host(`diaet.example.org`)
      - traefik.http.routers.diaettool.entrypoints=websecure
      - traefik.http.routers.diaettool.tls=true
      - traefik.http.routers.diaettool.tls.certresolver=letsencrypt
      - traefik.http.services.diaettool.loadbalancer.server.port=80
    networks:
      - diattool_network
      - proxy

networks:
  proxy:
    external: true
```

Domain, Entrypoint und Zertifikats-Resolver an die eigene Traefik-Konfiguration anpassen und dann starten:

```bash
docker compose -f compose.yaml -f compose.traefik.yaml up -d --build
```

`TRUST_PROXY_HTTPS=1` sorgt dafür, dass die Anwendung den von Traefik gesetzten Header `X-Forwarded-Proto: https` berücksichtigt und sichere Session-Cookies sowie HSTS aktiviert. Diese Option nur hinter einem vertrauenswürdigen Proxy verwenden. Der direkte Host-Port bleibt standardmäßig an `127.0.0.1` gebunden.

## Wartung

Anwendung nach einem Update neu bauen:

```bash
git pull
docker compose up -d --build
```

Container stoppen, Daten aber behalten:

```bash
docker compose down
```

Vor Updates sollte insbesondere das Datenbank-Volume gesichert werden. Eine einfache SQL-Sicherung unter Linux/WSL ist:

```bash
docker compose exec -T mysql sh -lc 'mysqldump -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" --single-transaction "$MYSQL_DATABASE"' > diattool-backup.sql
```

Unter PowerShell 7 kann derselbe Befehl verwendet werden. Bei Windows PowerShell 5 kann die Textumleitung die Kodierung verändern; dort besser WSL oder eine binärsichere Weiterleitung verwenden.

> `docker compose down -v` löscht die persistenten Datenbank- und Bilder-Volumes. Diesen Befehl nur verwenden, wenn wirklich alle gespeicherten Daten entfernt werden sollen.

## Datenschutz und Sicherheit

Das Tool speichert potenziell sensible Gesundheits- und Körperdaten. Deshalb sollten starke Datenbank- und Benutzerpasswörter, regelmäßige Backups, aktuelle Container-Images und HTTPS verwendet werden. Freigabelinks gewähren lesenden Zugriff auf persönliche Verlaufsdaten und sollten wie Zugangsdaten behandelt und bei Nichtgebrauch deaktiviert werden.

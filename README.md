# caseStatus-cache
Cache för ärendestatus från OeP


## Config

### Production-config

- **Server:**                       microservices.sundsvall.se
- **DB:**                           Maria DB
- **Version av integrationer:**     Produktion

### Test-config

- **Server:**                       microservices-test.sundsvall.se
- **DB:**                           Maria DB
- **Version av integrationer:**     Test

### Sandbox-config

- **Används inte**

## Integrationer

Denna applikation har integrationer mot:

* Open ePlatform

## Miljövariabler

Se fil .env.example för miljövariabler, genom att ändra namnet på filen till .env går den att använda med npm-paketet dotenv.

## Kör applikationen lokalt

För att köra applikationen lokalt krävs en .env-fil med miljövariabler. Applikationen startas med `npm run dev`.

## Hämta data från e-tjänster

Då svaret från Open ePlatform kan se olika ut beroende på hur e-tjänsten är uppbyggd, namnsättning av fält, nestning m.m. finns ingen generell funktion för att hämta organisationsnummer från svaret utan en switch-case-sats används för varje specifikt FamilyID i filen eServiceCaller.ts

## 
Copyright (c) 2021 Sundsvalls kommun


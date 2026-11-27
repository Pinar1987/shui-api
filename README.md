# Shui API

Individuell examination inom backendutveckling.

Shui är ett serverless REST API där användare kan registrera sig,
logga in, skapa inlägg och kommentera. Det går även att publicera
inlägg som gästanvändare.

## API Base URL

https://0fsan76gx9.execute-api.eu-north-1.amazonaws.com

## Tekniker

- Node.js och JavaScript
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Serverless Framework
- Middy
- Zod
- JWT
- bcrypt
- Git och GitHub

## Funktionalitet

- Registrering och inloggning
- Hashning av lösenord med bcrypt
- Autentisering med JWT
- Skapa, läsa, uppdatera och radera inlägg
- Publicera inlägg som gäst
- Filtrera inlägg efter användarnamn
- Skapa och läsa kommentarer
- Radera tillhörande kommentarer när ett inlägg tas bort
- Validering och felhantering
- Behörighetskontroll för uppdatering och radering

## API Endpoints

| Metod | Endpoint | Autentisering |
|---|---|---|
| POST | /auth/register | Nej |
| POST | /auth/login | Nej |
| GET | /posts | Nej |
| GET | /posts/{postId} | Nej |
| POST | /posts | Valfri |
| PUT | /posts/{postId} | Ja, ägare |
| DELETE | /posts/{postId} | Ja, ägare |
| GET | /posts/{postId}/comments | Nej |
| POST | /posts/{postId}/comments | Ja |

Inlägg sorteras från nyast till äldst.
Kommentarer sorteras från äldst till nyast.

Filtrering av inlägg:

GET /posts?username=exampleuser

## Projektstruktur

```text
src/
├── handlers/
│   ├── auth/
│   ├── posts/
│   └── comments/
├── middlewares/
├── repositories/
├── schemas/
├── services/
└── utils/
```

Handlers hanterar HTTP-anrop, services innehåller affärslogik
och repositories ansvarar för kommunikationen med DynamoDB.
Middlewares används för autentisering, behörighetskontroll,
validering och felhantering.

## Installation

Klona projektet:

```bash
git clone https://github.com/Pinar1987/shui-api.git
cd shui-api
npm ci
```

Skapa en .env-fil i projektets rot:

```env
JWT_SECRET=your_secret_key
```

Använd en egen säker JWT-nyckel.
.env-filen ska inte laddas upp till GitHub.

## Deployment

För deployment krävs Node.js, ett AWS-konto,
AWS CLI och tillgång till Serverless Framework.

Anpassa AWS-profilen i serverless.yml till din egen profil.

```bash
npx serverless deploy
```

## Användning

Registrera en användare via POST /auth/register:

```json
{
  "username": "exampleuser",
  "password": "Example12345"
}
```

Logga in via POST /auth/login med samma uppgifter.

Använd token från inloggningen i Authorization-headern:

```text
Authorization: Bearer YOUR_TOKEN
```

Skapa ett inlägg via POST /posts:

```json
{
  "title": "Hello Shui",
  "content": "My first post"
}
```

Utan token skapas inlägget som ett gästinlägg.

Skapa en kommentar via POST /posts/{postId}/comments:

```json
{
  "content": "My first comment"
}
```

## Testning

API:et har testats manuellt med curl mot den publicerade
AWS-miljön.

Testerna omfattar samtliga nio endpoints, autentisering,
gästinlägg, kommentarer, behörighetskontroll, felaktig JSON
och radering av tillhörande kommentarer.

## Begränsningar

Radering av inlägg och tillhörande kommentarer sker genom
separata databasoperationer och är inte atomär.

## Utvecklare

Pinar Buyukcelebi

Mobilapplikationsutvecklare – Folkuniversitetet

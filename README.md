# NISZ backend prep

## Setup

Adatbázis és Ormconfig.json -beállitása

```
npm install
npm run dev
```

## Elérhető routok

### POST /auth

**Leírás**: felhasználó belépés  
**Request:**

```json
email,
password
```

**Response:**

```json
token
```

### POST /user

**Leírás**: felhasználó regisztráció  
**Request:**

```json
username,
email,
password
```

**Response:**

```json
statusCode
```

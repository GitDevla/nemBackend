# NISZ backend prep

## Setup

`.env.dev` bállítása `.env.example` szerint

```
yarn || npm install
yarn server:ts ||npm run dev
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

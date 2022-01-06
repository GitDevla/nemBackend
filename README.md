# NISZ backend prep

## Setup

```
npm install
pmx prisma db push
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

### POST /user/register

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

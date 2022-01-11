# NISZ backend prep

## Setup

```
npm install
npx prisma db push
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

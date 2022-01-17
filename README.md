# NISZ backend prep

## Setup

`.env.dev` vagy `.env.prod` bállítása `.env.example` szerint

```
yarn
yarn serve:dev vagy yarn dev
```

## API Válasz kinézet

### Jó

status: 200-299

```json
{
	"data": {},
	"success": true
}
```

**A további response kinézetnél csak a data objectet írom le**

### Hiba

status: 400-500

```json
{
	"errorName": "Általános hiba kód",
	"details": "Pontos hiba leírás",
	"success": false
}
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
token
```

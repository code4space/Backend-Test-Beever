# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `GET /quote`
- `GET /quotes`
- `POST /quote`
- `PATCH /quote/:id`
- `DELETE /quote/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /quote

Description:

- Get one quote from 'https://api.kanye.rest/'

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "quote": "My mother in law Kris Jenner ... makes the best music playlist"
}
```

&nbsp;

## 4. GET /quotes

Description:

- Get all quote from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "quotes": [
    "I think I do myself a disservice by comparing myself to Steve Jobs and Walt Disney and human beings that we've seen before. It should be more like Willy Wonka...and welcome to my chocolate factory.",
    "Truth is my goal. Controversy is my gym. I'll do a hundred reps of controversy for a 6 pack of truth",
    "For me giving up is way harder than trying.",
    "My mother in law Kris Jenner ... makes the best music playlist",
    "Keep squares out yo circle"
  ],
  "favorites": ["Keep squares out yo circle"]
}
```

&nbsp;

## 5. POST /quote

Description:

- Create quote to databse

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "quote": "tidak lebih dari sekedar bulu"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "quote is required"
}
```

&nbsp;

## 6. PATCH /quote/:id

Description:

- update favorite to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (202 - Updated)_

```json
{
    "message": "success delete from favorite"
}
```
OR
```json
{
    "message": "success add to favorite"
}
```

&nbsp;

## 7. DELETE /quote/:id

Description:

- Delete quote from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "success delete quote with id: 6"
}
```

&nbsp;

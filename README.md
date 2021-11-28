# Simple CRUD API

Application with implementation of simple CRUD API using in-memory database underneath.

## Start project

1. Clone the project

```bash
git clone git@github.com:Potseluiko/simple-crud-api.git
```

2. Install all node modules

```bash
npm install
```

3. Optional. You can set PORT in `.env` file. Default port is 8080.

```bash
# In .env file:
PORT=8080
```

4. Start server

In development mode:

```bash
npm run start:dev
```

In production mode:

```bash
npm run start:prod
```

5. Run tests

```bash
npm run test
```

Notes. Tests run on port **9090**.

## Routes

- **GET** `/person` return all persons
- **GET** `/person/${personId}` returns person with corresponding `personId`
- **POST** `/person` is used to create record about new person and store it in database
- **PUT** `/person/${personId}` is used to update record about existing person
- **DELETE** `/person/${personId}` is used to delete record about existing person from database

Persons are objects with the following properties:

- `id` — unique identifier (`string`, `uuid`) generated on server side
- `name` — person's name (`string`, **required**)
- `age` — person's age (`number`, **required**)
- `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

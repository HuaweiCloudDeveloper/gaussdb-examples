# Typescript ORM with GaussDB example

## Project setup

```bash
npm install
# or
pnpm i
```

## Run

```bash
npm run start
# or
pnpm run start
```

## Restfui API

| Methods | Urls                      | Actions                                  |
|---------|---------------------------|------------------------------------------|
| POST    | /api/tutorials             | create new Tutorial                      |
| GET     | /api/tutorials             | retrieve all Tutorials                   |
| GET     | /api/tutorials/:id         | retrieve a Tutorial by :id               |
| PUT     | /api/tutorials/:id         | update a Tutorial by :id                 |
| DELETE  | /api/tutorials/:id         | delete a Tutorial by :id                 |
| DELETE  | /api/tutorials             | delete all Tutorials                     |
| GET     | /api/tutorials?title=[keyword] | find all Tutorials which title contains keyword |


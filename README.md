# Pet Store Api

  *DSCSRM Recruitment Technical Task*
  
Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.

## Pre - Requirement 

- Command Promt / Terminal
- MongoDB Atlas Account
- Postman

## Initialising

1.  `npm i`
2. `MONGO=<mongodb link> node index.js`

### Get all pets

`GET` `http://localhost:3030/`

### Get a single pet

`GET` `http://localhost:3030/pet/<PetName>`

### Create a new pet

`POST` `http://localhost:3030/`

### Update existing pet

`PUT` `http://localhost:3030/`

### Delete a pet

`DELETE` `http://localhost:3030/`

### Get pets of an owner

`GET` `http://localhost:3030/owner/<Owner>`

### Get owner of a pet

`GET` `http://localhost:3030/find/<PetName>`

### Get list of all owners

`GET` `http://localhost:3030/all`

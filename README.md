
# BOOK STORE APPLICATION USING NODEJS

Developed a REST backend using Node.js, Express.js, MySQL that supports user and seller functionalities. Sellers can manage books via CSV upload, while users can view books. Authentication and authorization should be implemented to ensure proper access control.

## Features

- Create, Read, Update and Delete Book.
- Add Books using CSV File.
- Make proper authentication for user and seller.


## Tech Stack

**Server:** Nodejs and Expressjs

**Database:** Mysql

## API Reference

#### Register User

```http
  POST :- http://127.0.0.1:5000/users
```

| Parameter | Type     | 
| :-------- | :------- | 
| `name   ` | `string` |
| `email`| `email_id`|
| `password`| `string`|
| `confPassword`| `string`|

#### Login User

```http
  POST :- http://127.0.0.1:5000/login
```

| Parameter | Type     | 
| :-------- | :------- |
| `email`   | `string` |
| `password`   | `string` |

#### Upload CSV File

```http
  POST :- http://127.0.0.1:5000/upload
```

| Parameter | Type     | 
| :-------- | :------- |
| `csv`   | `file.csv` |

#### Create new Book details

```http
  POST :- http://127.0.0.1:5000/create
```

| Parameter | Type     | 
| :-------- | :------- |
| `title`   | `string` |
| `author`   | `string` |
| `publishedDate`   | `Date` |
| `price`   | `number` |

#### Get Book by Id

```http
  Get :- http://127.0.0.1:5000/books/${id}
```

| Parameter | Type     | 
| :-------- | :------- |
| `id`   | `number` |

#### Update Book by Id

```http
  PUT :- http://127.0.0.1:5000/update/${id}
```

| Parameter | Type     | 
| :-------- | :------- | 
| `name   ` | `string` |
| `email`| `email_id`|
| `password`| `string`|
| `confPassword`| `string`|

#### Delete Book by Id

```http
  Delete :- http://127.0.0.1:5000/books/${id}
```

| Parameter | Type     | 
| :-------- | :------- |
| `id`   | `number` |

#### Get all Book title

```http
  Get :- http://127.0.0.1:5000/retrive
```

#### Get Book detail by title

```http
  Get :- http://127.0.0.1:5000/retrive/${title}
```

| Parameter | Type     | 
| :-------- | :------- |
| `title`   | `string` |





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ACCESS_TOKEN_SECRET`

`REFRESH_TOKEN_SECRET`


## Installation

Install my-project with npm

```bash
  using this link clone project :- https://github.com/KartikAKGEC89/Stratex_Task.git

  - Install node_modules :- npm install
  - Install dependency :- npm install bcrypt cookie-parser cors csvtojson dotenv express inquirer 
                          jsonwebtoken multer mysql2 nodemon sequelize util
  - Run project using :- npm start
```
    

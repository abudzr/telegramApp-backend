<p align="center">
  <img src="https://user-images.githubusercontent.com/68935056/119450034-97b8a200-bd5d-11eb-84c2-5fa095c791ee.png"   alt="Telegram" border="0" />
</p>

---

## ✏️ About

This is the repository Backend of the Bootcamp Arkademy task

#### User Endpoint

|  METHOD  |                   API                   |                    REMARKS                    |
| :------: | :-------------------------------------: | :-------------------------------------------: |
|  `POST`  |             /api/v1/users/              |      Register User and Activation Email       |
|  `POST`  |        /api/v1/users/auth/login         |        Sign in with a verified account        |
|  `POST`  |   /api/v1/users/auth/forgot-password    | Enter your email, if you forget your password |
|  `POST`  |  /api/v1/users/auth/reset-password/new  |  check email and enter new token & password   |
|  `GET`   | /api/v1/users/auth/verify/:email/:token |  Activation Email and input token from email  |
|  `GET`   |              /api/v1/users              |               Get All Data User               |
|  `GET`   |         /api/v1/users/find-user         |              Get Data By userID               |
| `PATCH`  |            /api/v1/users/:id            |              Edit Data By userID              |
| `DELETE` |            /api/v1/users/:id            |             Delete Data By userID             |

#### Messages Endpoint

|  METHOD  |              API               |           REMARKS            |
| :------: | :----------------------------: | :--------------------------: |
|  `POST`  |        /api/v1/messages        | Input Data To Table Messages |
|  `GET`   | /api/v1/messages/:idFrom/:idTo |         Get Messages         |
| `DELETE` |      /api/v1/messages/:id      |    Delete messages By id     |

### Other endpoints are still in the documentation process

## 💻 Installation

Follow the steps below

1. Clone this repo

```
git clone https://github.com/abudzr/telegramApp-backend.git
cd BE-Ticktiz
```

2. Install module & Import Database

##### Install Module

```
npm install
```

##### Import Database

Import `telegram-app.sql` To Your Databases

3. Create env file

```
# ---------------------------------------
#               CONFIG DB
# ---------------------------------------
DB_HOST= #host database
DB_USER= #user database
DB_PASS= #pass database
DB_NAME= #database name

SECRET_KEY = #your secret key
RESET_PASSWORD_KEY = #your secret key

EMAIL_USER = #email
EMAIL_PASSWORD = #email pass

# ---------------------------------------
#            CONFIG GENERAL
# ---------------------------------------
PORT= #port app
HOST= #host/domain app
```

Detail CONFIG GENERAL
| EXAMPLE URL | [http://localhost:4500]() |
| :-------------: |:-------------:|
| PORT | 4500 |
| HOST | [http://localhost]() |

4. Done, You can run it in the way below

##### Developer Mode (with nodemon)

```
npm run dev
```

##### Production Mode (only node)

```
npm start
```

## 🔖 Standard Response & Preview Request By Postman

#### Standard Response API

```json
{
    "status": true,
    "message": "login success",
    "data": [object Object]
}
```

Object data contains content according to the request

## ⛏️ Built Using

- [ExpressJS](https://expressjs.com)
- [MySQL2 Package](https://www.npmjs.com/package/mysql2)
- [CORS Package](https://www.npmjs.com/package/cors)
- [Body Parser Package](https://www.npmjs.com/package/body-parser)
- [Morgan Package](https://www.npmjs.com/package/morgan)
- [DotEnv Package](https://www.npmjs.com/package/dotenv)
- [Nodemon Package](https://www.npmjs.com/package/nodemon)
- [bcryptjs Package](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [redis](https://www.npmjs.com/package/redis)
- [uuid](https://www.npmjs.com/package/uuid)
- [socket.io](https://socket.io/)

## ✍️ Authors

- [@abudzr](https://github.com/abudzr)

## Link

- [Frontend](https://github.com/abudzr/telegramApp-frontend)
- [Visit Project](https://telegramaps.netlify.app/)

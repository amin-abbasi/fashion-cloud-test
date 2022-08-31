# Cache Project
This is a cache project written with Typescript and implemented using [Node.js] (Express), [MongoDB] (Mongoose), Jest, and OpenAPI (Swagger).


## Prerequisites / Setting up for first time
What you need to install before running this app:
ex: Make sure you have git, nvm, npm, [Node.js], and [MongoDB] installed


## Clone the project and install dependencies
- Clone the project: `git clone https://github.com/amin4193/fashion-cloud-test.git`
- Go to the project folder and run: `npm i`


## Environment Variables Setup
Check and modify your environment settings by copying or renaming `.env.example` as `.env` file.

There are 4 parts in `.env` file to be considered:
- Node environment: to specify whether this project in `development` or `production` mode.
- Application environment: to specify whether this application is in `live` mode or works in `local` mode.
- Server configurations: to specify `host`, `port`, and `protocol` of server.
- Database configurations: to specify `host`, `port`, and `name` of using database, which in case we are using MongoDB. You also can set `username` and `password` to secure your database connection if necessary.


## Run Application
You can start the project by:
```
npm start
```
or simply use:
```
nodemon
```

There is an endpoint to health-check your server connection:
`https://localhost:4000/api/health`
which should respond with: "200"

Your default base URL should be: `https://localhost:4000/api/v1`


## API Documentation (Swagger)
You can access to API documentation using this route:
`https://localhost:4000/api/docs`


## Test Application (Jest)
There are some tests already written in `cache.test.ts` file. You also can write your own tests in `__test__` folder by creating new `your_entity.test.ts` and then just run:

```
npm test
```


#### Note:
After development and test, you should put the following script in `.gitignore` file to prevent pushing tests files in production:

```
# test folder
__tests__
```


### Docker and Deployment
There is a `.docker` folder that has necessary configurations to run the project via [Docker]. You can simply set your own configs in `docker-compose.yml` file and run:
```
sudo docker-compose up --build
```


[Node.js]: https://nodejs.org/en/download/
[MongoDB]: https://docs.mongodb.com/manual/installation
[Docker]: https://docs.docker.com/desktop/install/linux-install/

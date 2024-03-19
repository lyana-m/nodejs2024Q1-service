### Home Library Service

#### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker Desktop](https://www.docker.com/products/docker-desktop/).

####  Running application in Docker
1. Clone repository

```
git clone https://github.com/lyana-m/nodejs2024Q1-service.git
```
2. Switch to working branch `database-and-docker`

```
git checkout database-and-docker
```

3. Install NPM packages

```
npm install
```

4. Create local `.env` file based on `.env.example`.
```
cp .env.example .env
```

5. Run application and database in Docker (Docker Desktop app should be strated before)
```
docker-compose up --build
```
#### Scan for vulnerabilities
You can scan built application and database images for vulnerabilities
```
npm run docker:scan:app
```
```
npm run docker:scan:db
```

####  Running application locally
1. Clone repository

```
git clone https://github.com/lyana-m/nodejs2024Q1-service.git
```
2. Switch to working branch `database-and-docker`

```
git checkout database-and-docker
```

3. Install NPM packages

```
npm install
```

4. Create local `.env` file based on `.env.example`.

```
cp .env.example .env
```

5. Run application

```
npm start
```

#### API documentation

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

#### Testing

**After application running** open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

**Note:** Test `Users (e2e) › PUT › should correctly update user password match` test may fail randomly (if it takes less than 1 ms to complete). This does not indicate a problem with the application, just try again.

#### Auto-fix and format

```
npm run lint
```

```
npm run format
```

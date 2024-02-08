# G5_L2_PARIS_SECURITE

Create a .env file : 

```bash
    cd backend/
    touch .env
```

Edit .env file with docker's container url : 
```bash
    MONGO_URI=mongodb://mongodb/allergies
    backend_url=http://backend:3000
    frontend_url=http://frontend:3000
```

To run app with docker :

```bash
    docker compose up -d
```

To stop docker container:

```bash
    docker compose down
```

For local development :

To run frontend only :
```bash
    cd frontend/
    npm run dev
```

To run backend only :
```bash 
    cd backend/
    node index.js
```

To run only mongodb : 
```bash
    docker compose up -d mongodb
```

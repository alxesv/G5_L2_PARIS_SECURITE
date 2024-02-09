# G5_L2_PARIS_SECURITE

## Docker Deployement

Create a .env file in backend: 

```bash
    cd backend/
    touch .env
```

Edit .env file with docker's container url : 
```bash
    MONGO_URI=mongodb://mongodb/allergies
    EMAIL_ADDRESS="email expéditeur"
    EMAIL_PASSWORD="mot de passe expéditeur"
    SECRET_KEY="clé aléatoire"
```
Create a .env file in frontend: 

```bash
    cd frontend/
    touch .env
```

Edit .env file with docker's container url : 
```bash
    backend_url=http://backend:3000
```

To run app with docker at repo's root :

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
# Liens
- trello :  https://trello.com/b/P4Oc97dQ/securite

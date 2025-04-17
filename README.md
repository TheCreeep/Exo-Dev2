# Système de Gestion des Urgences

Un système de microservices pour la gestion des urgences, permettant de gérer les appelants, les opérateurs, les équipes d'intervention et les incidents.

## Architecture

Le système est composé de trois microservices :

1. **Caller-Operator Service** (Port 3001)
   - Gestion des appelants
   - Gestion des opérateurs

2. **Team Service** (Port 3002)
   - Gestion des équipes d'intervention
   - Gestion de la disponibilité des équipes

3. **Incident Service** (Port 3003)
   - Gestion des incidents
   - Attribution des équipes aux incidents
   - Suivi du statut des interventions

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (Port 27018)
- Docker et Docker Compose (optionnel)

## Installation

### Sans Docker

1. Cloner le repository :
```bash
git clone <repository-url>
cd urgency-system
```

2. Installer les dépendances pour chaque service :
```bash
cd caller-operator-service && npm install
cd ../team-service && npm install
cd ../incident-service && npm install
```

3. Configurer les variables d'environnement :
   - Copier les fichiers `.env.example` en `.env` dans chaque service
   - Modifier les variables selon votre environnement

4. Démarrer les services :
```bash
# Dans des terminaux séparés
cd caller-operator-service && npm start
cd team-service && npm start
cd incident-service && npm start
```

### Avec Docker

1. Construire et démarrer les services :
```bash
docker-compose up --build
```

## API Endpoints

### Caller-Operator Service (http://localhost:3001)

#### Callers
- POST `/api/callers` - Créer un nouvel appelant
- GET `/api/callers` - Lister tous les appelants
- GET `/api/callers/:id` - Obtenir un appelant spécifique

#### Operators
- POST `/api/operators` - Créer un nouvel opérateur
- GET `/api/operators` - Lister tous les opérateurs
- GET `/api/operators/:id` - Obtenir un opérateur spécifique

### Team Service (http://localhost:3002)

- POST `/api/teams` - Créer une nouvelle équipe
- GET `/api/teams` - Lister toutes les équipes
- GET `/api/teams/available` - Trouver une équipe disponible
- GET `/api/teams/:id` - Obtenir une équipe spécifique
- PATCH `/api/teams/:id/availability` - Mettre à jour la disponibilité d'une équipe

### Incident Service (http://localhost:3003)

- POST `/api/incidents` - Signaler un nouvel incident
- GET `/api/incidents` - Lister tous les incidents
- GET `/api/incidents/:id` - Obtenir un incident spécifique
- PATCH `/api/incidents/:id/status` - Mettre à jour le statut d'un incident

## Modèles de données

### Caller
```javascript
{
  name: String,
  phone: String
}
```

### Operator
```javascript
{
  name: String
}
```

### Team
```javascript
{
  type: String,
  availability: Boolean
}
```

### Incident
```javascript
{
  localisation: String,
  description: String,
  status: String (enum: ['pending', 'in_progress', 'resolved']),
  reportedAt: Date,
  callerId: ObjectId,
  operatorId: ObjectId,
  teamId: ObjectId
}
```

## Monitoring

Chaque service dispose d'un endpoint de santé :
- GET `/health` - Retourne le statut du service

## Sécurité

- CORS est activé et configuré pour permettre les communications entre services
- Les validations d'entrée sont effectuées au niveau des modèles
- Les erreurs sont gérées de manière sécurisée

## Développement

Pour le développement, vous pouvez utiliser le mode de développement qui inclut le rechargement automatique :
```bash
npm run dev
```

## Tests

Pour exécuter les tests (à implémenter) :
```bash
npm test
```

## Postman Collection

The project includes a Postman collection (`Emergency_Response_System.postman_collection.json`) that contains all the API endpoints for testing and development. The collection is organized into folders for each service:

### Caller-Operator Service
- **Create Caller**
  - Method: POST
  - URL: `{{base_url}}/api/callers`
  - Body: 
    ```json
    {
      "name": "John Doe",
      "phone": "1234567890",
      "location": "123 Main St"
    }
    ```

- **Get Callers**
  - Method: GET
  - URL: `{{base_url}}/api/callers`

- **Get Caller by ID**
  - Method: GET
  - URL: `{{base_url}}/api/callers/:id`

- **Create Operator**
  - Method: POST
  - URL: `{{base_url}}/api/operators`
  - Body:
    ```json
    {
      "name": "Jane Smith",
      "specialty": "Medical"
    }
    ```

- **Get Operators**
  - Method: GET
  - URL: `{{base_url}}/api/operators`

- **Get Operator by ID**
  - Method: GET
  - URL: `{{base_url}}/api/operators/:id`

### Team Service
- **Create Team**
  - Method: POST
  - URL: `{{base_url}}/api/teams`
  - Body:
    ```json
    {
      "type": "Medical",
      "members": ["John", "Jane"],
      "availability": true
    }
    ```

- **Get Teams**
  - Method: GET
  - URL: `{{base_url}}/api/teams`

- **Get Team by ID**
  - Method: GET
  - URL: `{{base_url}}/api/teams/:id`

- **Find Available Team**
  - Method: GET
  - URL: `{{base_url}}/api/teams/available`

- **Update Team Availability**
  - Method: PATCH
  - URL: `{{base_url}}/api/teams/:id/availability`
  - Body:
    ```json
    {
      "availability": false
    }
    ```

### Incident Service
- **Report Incident**
  - Method: POST
  - URL: `{{base_url}}/api/incidents`
  - Body:
    ```json
    {
      "description": "Medical emergency",
      "severity": "high",
      "location": "123 Main St",
      "callerId": 1,
      "operatorId": 1
    }
    ```

- **Get Incidents**
  - Method: GET
  - URL: `{{base_url}}/api/incidents`

- **Get Incident by ID**
  - Method: GET
  - URL: `{{base_url}}/api/incidents/:id`

- **Update Incident Status**
  - Method: PATCH
  - URL: `{{base_url}}/api/incidents/:id/status`
  - Body:
    ```json
    {
      "status": "in_progress"
    }
    ```

### Environment Variables
The collection uses the following environment variables:
- `base_url`: The base URL of your API gateway (e.g., `http://localhost:3000`)

To use the collection:
1. Import the collection into Postman
2. Create an environment and set the `base_url` variable
3. Start testing the endpoints

## Setup

1. Install dependencies for each service:
```bash
cd caller-operator-service && npm install
cd ../team-service && npm install
cd ../incident-service && npm install
```

2. Start MongoDB:
```bash
mongod
```

3. Start each service in a separate terminal:
```bash
# Terminal 1
cd caller-operator-service && npm start

# Terminal 2
cd team-service && npm start

# Terminal 3
cd incident-service && npm start
```

## Environment Variables

Each service requires the following environment variables:

### Caller-Operator Service
- `PORT`: Service port (default: 3001)
- `MONGODB_URI`: MongoDB connection string
- `TEAM_SERVICE_URL`: URL of the team service

### Team Service
- `PORT`: Service port (default: 3002)
- `MONGODB_URI`: MongoDB connection string

### Incident Service
- `PORT`: Service port (default: 3003)
- `MONGODB_URI`: MongoDB connection string
- `TEAM_SERVICE_URL`: URL of the team service

### API Gateway
- `PORT`: Gateway port (default: 3000)
- `CALLER_OPERATOR_SERVICE_URL`: URL of the caller-operator service
- `TEAM_SERVICE_URL`: URL of the team service
- `INCIDENT_SERVICE_URL`: URL of the incident service

Create a `.env` file in each service directory with these variables.

## Testing

Each service has its own test suite. Run tests with:
```bash
cd <service-directory>
npm test
```

## License

MIT 
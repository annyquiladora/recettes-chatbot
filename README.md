1. Schéma d’architecture du projet
+-----------------------+
|      Client (Postman) |
+-----------+-----------+
            |
            v
+-----------------------+
|        Express        |
|       (Node.js)       |
+-----------+-----------+
            |
            v
+-----------------------+
|  Contrôleurs (src/controllers) |
|  - recipesController.js        |
+-----------+-----------+
            |
            v
+-----------------------+
|    Modèles (src/models)         |
|   (Pas utilisé actuellement)   |
+-----------+-----------+
            |
            v
+-----------------------+
|    Routes (src/routers)         |
|   - recipes.js                 |
+-----------+-----------+
            |
            v
+-----------------------+
|    Google Vertex AI    |
|  (Generative Language) |
+-----------------------+
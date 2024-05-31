### 1. Schéma d’architecture du projet

+-----------------------+
                         
| Client (Postman) |     
+-----------+-----------+
|
v                                               
+-----------------------+
                         
| Express |                 
| (Node.js) |           
+-----------+-----------+
|                                         
v                                                 
+-----------------------+
                           
| Contrôleurs (src/controllers) |

| - recipesController.js |

+-----------+-----------+
|                      
v                      
+-----------------------+
                           
| Modèles (src/models) |

| (Pas utilisé actuellement) |

+-----------+-----------+
|                      
v                      
+-----------------------+
                          
| Routes (src/routers) |

| - recipes.js |

+-----------+-----------+
                         
|                      
v            

+-----------------------+
                         
| Google Vertex AI |

| (Generative Language) |

+-----------------------+

### 2. Liste des fonctionnalités offertes par votre API
Génération de recettes en fonction des ingrédients fournis.
Vérification que les termes fournis sont des ingrédients culinaires valides.
Retour d'un message d'erreur si les termes ne sont pas des ingrédients culinaires.
3. Liste des endpoints et les entrées/sorties
Endpoint : POST /get-recipes
Description : Génère des recettes à partir des ingrédients fournis.
Entrée : JSON contenant une liste d'ingrédients
{
  "ingredients": ["tomato", "cheese", "basil"]
}

*Sortie : JSON contenant les recettes générées ou un message d'erreur.
Réponse de succès :
{
  "recipes": "Liste des recettes générées..."
}

Réponse d'erreur :
{
  "message": "Please provide valid cooking ingredients."
}

### Documentation fonctionnelle
### Quelle est votre application ?
L'application "Gorditos-Recipe" est une API qui utilise Google Vertex AI pour générer des recettes basées sur les ingrédients fournis par l'utilisateur.

### Que permet de faire l’application ?
L'application permet de :

Générer des recettes à partir d'une liste d'ingrédients fournis par l'utilisateur.
Valider les termes fournis pour s'assurer qu'ils sont des ingrédients culinaires.
Liste des fonctionnalités offertes
Génération de recettes : Utilise l'IA générative pour suggérer des recettes en fonction des ingrédients.
Validation des ingrédients : Vérifie que les termes fournis sont des ingrédients valides avant de générer les recettes.

### Comment l’utiliser ?

Installation :

Clonez le dépôt du projet.
Installez les dépendances avec npm install.
Configurez les variables d'environnement nécessaires dans un fichier .env 
Lancement du serveur :

Démarrez le serveur avec node server.js.
Utilisation de l'API avec Postman :

Envoyez une requête POST à l'endpoint /get-recipes avec un corps JSON contenant une liste d'ingrédients.

Liste des endpoints et paramètres
POST /get-recipes
Paramètres :
ingredients (array) : Liste des ingrédients pour générer des recettes.

{
  "ingredients": ["tomato", "cheese", "basil"]
}

Exemple de réponse de succès :
json
Copier le code
{
  "recipes": "Liste des recettes générées..."
}
Exemple de réponse d'erreur :
json
Copier le code
{
  "message": "Please provide valid cooking ingredients."
}
Façons de l’utiliser
Envoi de requêtes via Postman :
Configurez une requête POST à http://localhost:3000/api/get-recipes.
Ajoutez un corps JSON avec la liste des ingrédients.
Envoyez la requête et consultez la réponse pour obtenir les recettes ou les messages d'erreur.

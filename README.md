# Maël FIAUDRIN - Projet nodeJs L260 - LP : DWBD

## Etapes pour utiliser le projet

#### Récupération du projet
Saisissez dans un terminal la commande :
`git clone https://github.com/fiaudrin1/projectNodeJsL260_Mael_FIAUDRIN.git`


Puis entrez dans le dossier le projet téléchargé :
`cd projectNodeJsL260_Mael_FIAUDRIN`
#### Récupérer les variables d'environnemments
Effectuez dans votre terminal les commandes :

`npm install -g`

`npm i @hapi/glue`

#### Lancer le serveur
Vous devrez tout d'abord vous assurer que vos services wamp sont ouverts pour que le projait ait accès à la base de donnée. Les informations de connexion à la base de donnée se trouvent dans le fichier manifest.js. Si vous rencontrez un problème au niveau de la connexion à la base de donnée, il faudra certainement changer les valeurs des variables user, password et database.

Pour lancer le serveur, entrez dans votre terminal :
`node server` ou `npm start`

#### Accèder au projet sur internet
Lancez votre navigateur et entrez dans l'url :
`http://localhost:3000/documentation`

#### Tester le projet
Vous pouvez désormais tester le projet. Vous aurez à créer un utilisateur à travers la route "POST user".

Ensuite vous devrez vous connecter avec cet utilisateur au sein de la route POST /user/login, et vous authentifier avec le bouton "authorize" situé en haut à droite.

Vous devrez entrer "bearer " suivi du code obtenu lors de l'authentification.

FROM node:lts-alpine

RUN echo "==========================="; \
    echo "|                         |"; \
    echo "|       FRONTEND          |"; \
    echo "|                         |"; \
    echo "==========================="

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server 
#RUN npm install --save-dev webpack
RUN npm install -g webpack

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY ./package*.json ./
COPY ./webpack.config.js ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY ./src ./src

# construit l'app pour la production en la minifiant
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
FROM node:lts-alpine

RUN echo "==========================="; \
    echo "|                         |"; \
    echo "|       FRONTEND          |"; \
    echo "|                         |"; \
    echo "==========================="

RUN apk update 

#install optionnels
RUN apk add bash
RUN apk add curl
#RUN apt-get install -y net-tools
#RUN apt-get install -y iputils-ping

#install ssh server
#RUN apt-get install -y openssh-server
#RUN mkdir /var/run/sshd
#RUN echo 'root:root123' | chpasswd
#RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
#RUN touch /etc/ssh/sshd_config
#RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config

#RUN /usr/sbin/sshd -D &
#RUN echo root123 | su -c "/etc/init.d/ssh start" 

EXPOSE 8080
    
# installe un simple serveur http pour servir un contenu statique
#RUN npm install -g http-server 
#RUN npm install --save-dev webpack
RUN npm install -g webpack
RUN npm install -g serve

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copy files
COPY popote/ ./

# ENV IP_BACKEND='https://popote.zapto.org/api'
ENV IP_BACKEND='https://127.0.0.1:3000'

# copie 'package.json' et 'package-lock.json' (si disponible)
#COPY ./package*.json ./
#COPY ./webpack.config.js ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
#COPY ./ ./

# construit l'app pour la production en la minifiant
RUN npm run build

EXPOSE 8080
RUN bash

# execute fichier bash de post traitement (lancement des applications et demons)
#CMD src/docker_cmd.bash
#CMD [ "http-server", "dist/bundle.js" ]
CMD npm run dev
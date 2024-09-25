# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18.0.0

FROM node:current-bullseye

RUN echo "==========================="; \
    echo "|                         |"; \
    echo "|       BACKEND           |"; \
    echo "|                         |"; \
    echo "==========================="

RUN apt-get update 

#install optionnels
RUN apt-get install -y net-tools
RUN apt-get install -y default-mysql-client
RUN apt-get install -y iputils-ping
RUN apt-get install -y nano

#installation Mutt (relai mail)
RUN apt-get install -y mutt
RUN apt-get install -y ssmtp

RUN echo 'root:root123' | chpasswd

ENV NODE_ENV production
ENV IP_MARIADB="localhost"

WORKDIR /app

RUN npm install mysql

RUN npm install

# copie files
COPY serverNode/ ./
COPY mariadb/create_base.sql .

RUN mkdir /var/spool/mail/node
RUN mkdir ~/mail
RUN mkdir ~/tmp
COPY serverNode/mutt/.muttrc .
COPY serverNode/mutt/ssmtp.conf /etc/ssmtp/ssmtp.conf

RUN chmod +x *bash
RUN chown -R node:node *
RUN chown -R node:node .muttrc

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# execute fichier bash de post traitement (lancement des applications et demons)
CMD src/docker_cmd.bash

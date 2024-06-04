# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18.0.0

#FROM node:lts-alpine
FROM node:current-bullseye

RUN echo "==========================="; \
    echo "|                         |"; \
    echo "|       BACKEND           |"; \
    echo "|                         |"; \
    echo "==========================="

RUN apt-get update 

#install net-tools (ifconfig) optionnel
RUN apt-get install -y net-tools

#install ssh server
#RUN apt-get install -y openssh-server
#RUN mkdir /var/run/sshd
#RUN echo 'root:root123' | chpasswd
#RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
#RUN touch /etc/ssh/sshd_config
#RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config

#RUN /usr/sbin/sshd -D &
#RUN echo root123 | su -c "/etc/init.d/ssh start" 

#EXPOSE 22

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY ./package*.json ./

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

RUN npm install

# Copy the rest of the source files into the image.
COPY ./ ./

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
#CMD ["/bin/bash", "-c", "/usr/sbin/sshd -D ; node src/server"]
#CMD ["/bin/bash", "-c", "/etc/init.d/ssh start ; node src/server"]
#RUN cd src

# execute fichier bash de post traitement (lancement des applications et demons)
CMD src/docker_cmd.bash
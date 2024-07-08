
DROP DATABASE Popote;

CREATE DATABASE IF NOT EXISTs Popote;

USE Popote;

CREATE TABLE IF NOT EXISTS Users(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    pwd VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    idRole BIGINT NOT NULL
);

DELETE FROM Users;

INSERT INTO Users (nom, pwd, email, idRole) VALUES 
    ("admin", "nimda", "bruno.froger93@gmail.com", 0),
    ("toto", "toto", "toto@orange.com", 1),
    ("titi", "titi", "titi@orange.com", 1),
    ("Bruno", "bruno", "bruno.froger@orange.com", 0);

CREATE TABLE IF NOT EXISTS Ingredients(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idRecette BIGINT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    quantite INT,
    unite VARCHAR(25)
);

DELETE FROM Ingredients;

INSERT INTO Ingredients (idRecette, nom, quantite, unite) VALUES
    (1, "Pamplemousse", "2", ""),
    (1, "crevettes", "200", "grammes"),
    (2, "poulet", "1", ""),
    (3, "pate a tarte", "1", ""),
    (3, "pommes", "8", ""),
    (3, "sucre", "100", "grammes"),
    (4, "ingredient", "100", "grammes"),
    (5, "ingredient", "100", "grammes"),
    (6, "ingredient", "100", "grammes"),
    (7, "ingredient", "100", "grammes"),
    (8, "ingredient", "100", "grammes"),
    (9, "ingredient", "100", "grammes"),
    (10, "ingredient", "100", "grammes"),
    (11, "ingredient", "100", "grammes"),
    (12, "ingredient", "100", "grammes"),
    (13, "ingredient", "100", "grammes"),
    (14, "ingredient", "100", "grammes"),
    (15, "ingredient", "100", "grammes"),
    (16, "ingredient", "100", "grammes"),
    (17, "ingredient", "100", "grammes"),
    (18, "ingredient", "100", "grammes"),
    (19, "ingredient", "100", "grammes"),
    (20, "ingredient", "100", "grammes"),
    (21, "ingredient", "100", "grammes");

CREATE TABLE IF NOT EXISTS TypePlats(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(20)
);

DELETE FROM TypePlats;

INSERT INTO TypePlats (nom) VALUES
    ("Tout"),
    ("Entree"),
    ("Plat"),
    ("Dessert");


CREATE TABLE IF NOT EXISTS Roles(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(20)
);

DELETE FROM Roles;

INSERT INTO Roles (nom) VALUES
    ("Administrateur"),
    ("Utilisateur"),
    ("Visiteur");


CREATE TABLE IF NOT EXISTS Recettes(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    numRecette INT NOT NULL,
    type BIGINT NOT NULL,
    auteur BIGINT NOT NULL,
    titre VARCHAR(100),
    description VARCHAR(300),
    realisation VARCHAR(5000)
);

DELETE FROM Recettes;

INSERT INTO Recettes (numRecette, type, auteur, titre, description, realisation) VALUES
    (1, 2, 2, "pamplemousse crevette", "entree fraiche pour l'ete", "Couper les pamplemousses en 2, les vider en preservant sans abimer le contenu (vous devez avoir l'interieur du demi pamplemeousse entier), couper en des le pamplemeousse et les mettre dans un saladier, ajouter les crevettes decortiquees, ajouter la moyonnaise, melanger puis utiliser les pamplemeousse vides pour servir de bol a votre preparation, servir frais"),
    (2, 3, 2, "poulet au four", "Plat traditionnel du dimanche midi", "Mettre le poulet dans un plat, poser quelques morceuax de beurre sur le poulet, verser un verre de bouillon au fond du plat, enfourner a 180 pendant 1h30"),
    (3, 4, 3, "tarte aux pommes", "dessert traditionnel avec des pommes", "etaler la pate dans le plat a tarte, couper les pommes en lamelles, repartir les pommes sur la pate, saupoudrer de sucre, mettre au four pendant 30mn"),
    (4, 2, 2, "Recette bidon", "recette de titi", "bla bla"),
    (5, 3, 2, "Recette bidon", "recette de toto", "bla bla"),
    (6, 4, 2, "Recette bidon", "recette de bruno", "bla bla"),
    (7, 2, 2, "Recette bidon", "recette de titi", "bla bla"),
    (8, 3, 2, "Recette bidon", "recette de toto", "bla bla"),
    (9, 4, 2, "Recette bidon", "recette de bruno", "bla bla"),
    (10, 2, 2, "Recette bidon", "recette de titi", "bla bla"),
    (11, 3, 2, "Recette bidon", "recette de toto", "bla bla"),
    (12, 4, 2, "Recette bidon", "recette de bruno", "bla bla"),
    (13, 2, 2, "Recette bidon", "recette de titi", "bla bla"),
    (14, 3, 2, "Recette bidon", "recette de toto", "bla bla"),
    (15, 4, 2, "Recette bidon", "recette de bruno", "bla bla"),
    (16, 2, 2, "Recette bidon", "recette de titi", "bla bla"),
    (17, 3, 2, "Recette bidon", "recette de toto", "bla bla"),
    (18, 4, 2, "Recette bidon", "recette de bruno", "bla bla"),
    (19, 2, 2, "Recette bidon", "recette de titi", "bla bla"),
    (20, 3, 2, "Recette bidon", "recette de toto", "bla bla"),
    (21, 4, 2, "Recette bidon", "recette de bruno", "bla bla");


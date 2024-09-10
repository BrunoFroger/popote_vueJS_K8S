
DROP DATABASE IF EXISTS Popote;

CREATE DATABASE IF NOT EXISTs Popote;

USE Popote;

CREATE TABLE IF NOT EXISTS Users(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    numero BIGINT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    pwd VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    idRole BIGINT NOT NULL
);

DELETE FROM Users;

INSERT INTO Users (numero, nom, pwd, email, idRole) VALUES 
    (1, "admin", "nimda", "bruno.froger93@gmail.com", 0),
    (2, "toto", "toto", "toto@orange.com", 1),
    (3, "titi", "titi", "titi@orange.com", 1),
    (4, "Bruno", "bruno", "bruno.froger@orange.com", 0),
    (5, "Inconnu", "sdgflsqfgjqsdgfqljsdfgq", "", 1);

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
    realisation VARCHAR(5000),
    validation BOOLEAN
);

DELETE FROM Recettes;

INSERT INTO Recettes (numRecette, type, auteur, titre, description, realisation, validation) VALUES
    (1, 2, 2, "pamplemousse crevette", "entree fraiche pour l'ete", "Couper les pamplemousses en 2, les vider en preservant sans abimer le contenu (vous devez avoir l'interieur du demi pamplemeousse entier), couper en des le pamplemeousse et les mettre dans un saladier, ajouter les crevettes decortiquees, ajouter la moyonnaise, melanger puis utiliser les pamplemeousse vides pour servir de bol a votre preparation, servir frais", 1),
    (2, 3, 2, "poulet au four", "Plat traditionnel du dimanche midi", "Mettre le poulet dans un plat, poser quelques morceuax de beurre sur le poulet, verser un verre de bouillon au fond du plat, enfourner a 180 pendant 1h30", 1),
    (3, 4, 3, "tarte aux pommes", "dessert traditionnel avec des pommes", "etaler la pate dans le plat a tarte, couper les pommes en lamelles, repartir les pommes sur la pate, saupoudrer de sucre, mettre au four pendant 30mn", 1),
    (4, 2, 2, "Recette bidon", "recette de titi", "bla bla", 1),
    (5, 3, 3, "Recette bidon", "recette de toto", "bla bla", 1),
    (6, 4, 4, "Recette bidon", "recette de bruno", "bla bla", 1),
    (7, 2, 2, "Recette bidon", "recette de titi", "bla bla", 1),
    (8, 3, 3, "Recette bidon", "recette de toto", "bla bla", 1),
    (9, 4, 4, "Recette bidon", "recette de bruno", "bla bla", 1),
    (10, 2, 2, "Recette bidon", "recette de titi", "bla bla", 1),
    (11, 3, 3, "Recette bidon", "recette de toto", "bla bla", 1),
    (12, 4, 4, "Recette bidon", "recette de bruno", "bla bla", 1),
    (13, 2, 2, "Recette bidon", "recette de titi", "bla bla", 1),
    (14, 3, 3, "Recette bidon", "recette de toto", "bla bla", 1),
    (15, 4, 4, "Recette bidon", "recette de bruno", "bla bla", 1),
    (16, 2, 2, "Recette bidon", "recette de titi", "bla bla", 1),
    (17, 3, 3, "Recette bidon", "recette de toto", "bla bla", 1),
    (18, 4, 4, "Recette bidon", "recette de bruno", "bla bla", 1),
    (19, 2, 2, "Recette bidon", "recette de titi", "bla bla", 0),
    (20, 3, 3, "Recette bidon", "recette de toto", "bla bla", 0),
    (21, 4, 4, "Recette bidon", "recette de bruno", "bla bla", 0);


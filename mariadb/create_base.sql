
CREATE DATABASE IF NOT EXISTs Popote;

USE Popote;

CREATE TABLE IF NOT EXISTS Users(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    pwd VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    idRole BIGINT NOT NULL
);

INSERT INTO Users (nom, pwd, email, idRole) VALUES 
    ("admin", "nimda", "bruno.froger93@gmail.com", 0),
    ("toto", "toto", "toto@orange.com", 1),
    ("titi", "titi", "titi@orange.com", 1);

CREATE TABLE IF NOT EXISTS Ingredients(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idRecette BIGINT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    quantite INT,
    dosage VARCHAR(30),
    unite VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS TypePlats(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(20)
);

INSERT INTO TypePlats (nom) VALUES
    ("entrée"),
    ("plat"),
    ("dessert");


CREATE TABLE IF NOT EXISTS Roles(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(20)
);

INSERT INTO Roles (nom) VALUES
    ("Administrateur"),
    ("Utilisateur");


CREATE TABLE IF NOT EXISTS Recettes(
    id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    type BIGINT NOT NULL,
    auteur BIGINT NOT NULL,
    titre VARCHAR(100),
    description VARCHAR(300),
    realisation VARCHAR(5000)
);

INSERT INTO Recettes (type, auteur, titre, description, realisation) VALUES
    (2, 1, "tarte aux pommes", "dessert traditionnel avec des pommes", "etaler la pate dans le plat a tarte, couper les pommes en lamelles, repartir les pommes sur la pate, saupoudrer de sucre, mettre au four pendant 30mn");


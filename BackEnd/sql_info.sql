CREATE DATABASE `bachelor_butikk`;

CREATE TABLE IF NOT EXISTS `bachelor_butikk`.`shelves` (
  `shelfId` VARCHAR(45) NOT NULL,
  `shelfDescription` VARCHAR(45) NULL,
  `shelfX` VARCHAR(45) NOT NULL,
  `shelfY` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`shelfId`));

CREATE TABLE IF NOT EXISTS `bachelor_butikk`.`items` (
  `barcode` VARCHAR(45) NOT NULL,
  `itemName` VARCHAR(45) NOT NULL,
  `itemTrademark` VARCHAR(45) NOT NULL,
  `itemRelativePosition` VARCHAR(45) NOT NULL,
  `shelf` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`barcode`),
  INDEX `fk_items_shelves_idx` (`shelf` ASC),
  CONSTRAINT `fk_items_shelves`
    FOREIGN KEY (`shelf`)
    REFERENCES `bachelor_butikk`.`shelves` (`shelfId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
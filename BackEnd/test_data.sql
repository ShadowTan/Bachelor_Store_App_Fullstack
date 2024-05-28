insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("1", "Brødvarer", "1055, 701", "1040");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("2", "Frukt & Grønt", "1508, 1154", "1040");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("3", "Grønnsaker", "1840, 1509", "1040");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("6", "Ferskvarer", "1875", "370, 741");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("9", "Frossenpizza", "1297, 1001", "170");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("11", "Meieri + Egg", "1324, 1638", "25");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("14", "Brus", "161, 387", "220");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("16", "Potetgull", "25", "308, 54");
insert into shelves(shelfId, shelfDescription, shelfX, shelfY) VALUES ("18", "Drikke", "26", "539, 451");



-- Eksempler på brødvarer
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("101", "Grovbrød", "Bakeriet", "1", "1");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("102", "Hveteboller", "Bakeriet", "2", "1");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("103", "Knekkebrød", "Kornbrød", "3", "1");

-- Eksempler på frukt og grønnsaker
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("201", "Epler", "Gårdsbruket", "1", "2");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("202", "Bananer", "Gårdsbruket", "2", "2");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("203", "Salat", "Gårdsbruket", "3", "2");

-- Eksempler på grønnsaker
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("301", "Gulrøtter", "Gårdsbruket", "1", "3");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("302", "Brokkoli", "Gårdsbruket", "2", "3");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("303", "Tomater", "Gårdsbruket", "3", "3");

-- Eksempler på ferskvarer
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("401", "Melk", "Tine", "1", "6");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("402", "Yoghurt", "Tine", "2", "6");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("403", "Ost", "Tine", "3", "6");

-- Eksempler på frossenpizza
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("501", "Grandiosa Pepperoni", "Grandiosa", "1", "9");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("502", "Big One", "Grandiosa", "2", "9");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("503", "Grandiosa Kjøttboller", "Grandiosa", "3", "9");

-- Eksempler på meieri og egg
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("601", "Egg", "Gårdsbruket", "1", "11");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("602", "Smør", "Tine", "2", "11");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("603", "Fløte", "Tine", "3", "11");

-- Eksempler på brus
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("701", "Cola", "Coca-Cola", "1", "14");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("702", "Fanta", "Coca-Cola", "2", "14");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("703", "Sprite", "Coca-Cola", "3", "14");

-- Eksempler på potetgull
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("801", "Salted Chips", "Lay's", "1", "16");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("802", "Cheese Flavor", "Doritos", "2", "16");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("803", "Barbecue", "Pringles", "3", "16");

-- Eksempler på drikke
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("901", "Vann", "Fjellbekk", "1", "18");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("902", "Brus", "Pepsi", "2", "18");
insert into items(barcode, itemName, itemTrademark, itemRelativePosition, shelf) values ("903", "Energidrikk", "Red Bull", "3", "18");

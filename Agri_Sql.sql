CREATE DATABASE agriculture_management;
USE agriculture_management;
CREATE TABLE farms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    farm_name VARCHAR(100),
    location VARCHAR(100),
    size_acres INT
);
CREATE TABLE farms (
    farm_id INT PRIMARY KEY AUTO_INCREMENT,
    farm_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    size_acres DECIMAL(10,2),
    created_acropst TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
drop TABLE farms;
CREATE TABLE farms (
    farm_id INT PRIMARY KEY AUTO_INCREMENT,
    farm_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    size_acres DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE crops (
    crop_id INT PRIMARY KEY AUTO_INCREMENT,
    farm_id INT,
    crop_name VARCHAR(100) NOT NULL,
    planting_date DATE,
    expected_harvest DATE,
    quantity VARCHAR(50),

    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);
CREATE TABLE workers (
    worker_id INT PRIMARY KEY AUTO_INCREMENT,
    farm_id INT,
    worker_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50),
    salary DECIMAL(10,2),

    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);
CREATE TABLE irrigation (
    irrigation_id INT PRIMARY KEY AUTO_INCREMENT,
    farm_id INT,
    irrigation_date DATE,
    water_amount VARCHAR(50),
    method VARCHAR(50),

    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);
CREATE TABLE harvests (
    harvest_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_id INT,
    harvest_date DATE,
    expected_yield VARCHAR(50),
    status VARCHAR(50),

    FOREIGN KEY (crop_id)
    REFERENCES crops(crop_id)
    ON DELETE CASCADE
);
SHOW TABLES;
CREATE TABLE irrigation (
    irrigation_id INT PRIMARY KEY AUTO_INCREMENT,
    farm_id INT,
    irrigation_date DATE,
    water_amount VARCHAR(50),
    method VARCHAR(50),

    FOREIGN KEY (farm_id)
    REFERENCES farms(farm_id)
    ON DELETE CASCADE
);
INSERT INTO farms (farm_name, location, size_acres)
VALUES
('Green Valley Farm', 'Punjab', 50.5);
INSERT INTO crops (farm_id, crop_name, planting_date, expected_harvest, quantity)
VALUES
(1, 'Wheat', '2026-05-01', '2026-09-01', '500 KG');
INSERT INTO workers (farm_id, worker_name, phone, role, salary)
VALUES
(1, 'Ali Khan', '03001234567', 'Field Worker', 25000);
SELECT * FROM farms;
ALTER TABLE workers ADD COLUMN status VARCHAR(20) DEFAULT 'Active';
use agriculture_management;
DELETE FROM crops 
where crop_id=2;
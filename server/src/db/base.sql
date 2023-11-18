-- Create Supplier Table
CREATE TABLE Supplier (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Notes TEXT
);

-- Create Category Table
CREATE TABLE if not exists Category (
    ID SERIAL PRIMARY KEY,
    Category VARCHAR(255) NOT NULL
);

-- Create Product Table
CREATE TABLE Product (
    ID SERIAL PRIMARY KEY,
    Category_ID INT REFERENCES Category(ID),
    Supplier_ID INT REFERENCES Supplier(ID),
    Product_Name VARCHAR(255) NOT NULL,
    Description TEXT,
    UNIQUE (Supplier_ID, Product_Name)
);

-- Create Customer Table
CREATE TABLE Customer (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Notes TEXT
);

-- Create Purchases Table
CREATE TABLE Purchases (
    ID SERIAL PRIMARY KEY,
    Product_ID INT REFERENCES Product(ID),
    Quantity INT NOT NULL,
    Unit_Price NUMERIC(10, 2) NOT NULL,
	Paper BOOLEAN,
    Transaction_Date TIMESTAMP NOT NULL,
    Delivery_Date TIMESTAMP,
    Delivery_Status VARCHAR(50),
    Notes TEXT
);

-- Create Sales Table
CREATE TABLE Sales (
    ID SERIAL PRIMARY KEY,
    Customer_ID INT REFERENCES Customer(ID),
    Product_ID INT REFERENCES Product(ID),
    Agent_ID INT REFERENCES Users(ID),
    Quantity INT NOT NULL,
    Unit_Price NUMERIC(10, 2) NOT NULL,
    Transaction_Date TIMESTAMP NOT NULL,
    Payment_Method VARCHAR(50),
    Remittance_Status VARCHAR(50)
);

-- Create Inventory Table
CREATE TABLE Inventory (
    ID SERIAL PRIMARY KEY,
    Product_ID INT REFERENCES Product(ID),
    Papers BOOLEAN,
    Quantity_in_Stock INT NOT NULL,
    Reorder_Level INT,
    In_Stock_Status VARCHAR(20),
    Low_Stock_Status VARCHAR(20),
    No_Stock_Status VARCHAR(20),
    Total_Inventory_Cost NUMERIC(10, 2),
    Total_Inventory_Value NUMERIC(10, 2)
);

CREATE DATABASE IF NOT EXISTS budget_allocations;

USE budget_allocations;

CREATE TABLE IF NOT EXISTS allocations(
    id INT PRIMARY KEY AUTO_INCREMENT,
    unit VARCHAR(50) NOT NULL,
    benefitType VARCHAR(20) NOT NULL,
    month VARCHAR(10) NOT NULL,
    allocatedAmount INT NOT NULL
);

CREATE DATABASE IF NOT EXISTS spend_transactions;

USE spend_transactions;

CREATE TABLE IF NOT EXISTS transactions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    budgetId INT NOT NULL,
    amount INT NOT NULL,
    reason VARCHAR(50),
    createdAt VARCHAR(50) NOT NULL
);
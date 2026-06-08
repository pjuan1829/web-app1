CREATE DATABASE IF NOT EXISTS app_db;
USE app_db;

CREATE TABLE IF NOT EXISTS catalog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00
);

INSERT IGNORE INTO catalog (name, description, price) VALUES
  ('Enterprise Widget', 'High-value widget for strategic workflows.', 149.99),
  ('Integration Module', 'Service connector for API-driven pipelines.', 249.50),
  ('Analytics Package', 'Dashboard analytics solution for enterprise teams.', 499.00);

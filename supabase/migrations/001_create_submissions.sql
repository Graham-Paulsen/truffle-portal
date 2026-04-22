CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(100),
  answers JSONB,
  score INTEGER,
  fit_level VARCHAR(20),
  loxoid VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

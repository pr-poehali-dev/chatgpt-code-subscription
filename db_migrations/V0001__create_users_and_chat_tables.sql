CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    subscribed BOOLEAN DEFAULT FALSE,
    subscribed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    language VARCHAR(10) NOT NULL,
    prompt TEXT NOT NULL,
    generated_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password_hash, is_admin, subscribed)
VALUES ('admin@codeai.dev', 'admin123', TRUE, TRUE)
ON CONFLICT (email) DO NOTHING;
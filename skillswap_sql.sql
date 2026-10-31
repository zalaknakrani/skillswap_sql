SELECT VERSION();
CREATE DATABASE IF NOT EXISTS skillswap_sql;

USE skillswap_sql;

-- 1. USER
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    contact VARCHAR(30),
    degree VARCHAR(100),
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    coins INT NOT NULL DEFAULT 0
);

-- 2. SKILL
CREATE TABLE skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100)
);

-- 3. SKILL OFFERING
CREATE TABLE skill_offering (
    offering_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level VARCHAR(50),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id)
        REFERENCES skills(skill_id) ON DELETE CASCADE,

    UNIQUE (user_id, skill_id)
);

-- 4. SKILL INTEREST
CREATE TABLE skill_interest (
    interest_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    desired_level VARCHAR(50),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id)
        REFERENCES skills(skill_id) ON DELETE CASCADE,

    UNIQUE (user_id, skill_id)
);

-- 5. MATCH
CREATE TABLE match_record (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    recipient_id INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    match_score DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (requester_id) REFERENCES users(user_id),
    FOREIGN KEY (recipient_id) REFERENCES users(user_id),

    CHECK (requester_id <> recipient_id)
);

-- 6. SESSION REQUEST
CREATE TABLE session_request (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    recipient_id INT NOT NULL,
    skill_id INT NOT NULL,
    session_type VARCHAR(30),
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INT,
    coins_earned INT NOT NULL DEFAULT 0,

    FOREIGN KEY (requester_id) REFERENCES users(user_id),
    FOREIGN KEY (recipient_id) REFERENCES users(user_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id),

    CHECK (requester_id <> recipient_id)
);

-- 7. MESSAGE
CREATE TABLE messages (
    message_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

SHOW TABLES;


-- USER DATA
INSERT INTO users
(username, name, email, password_hash, contact, degree,
 country, state, city, coins)
VALUES
('riya', 'Riya Shah', 'riya.demo@example.com',
 'DEMO_HASH_1', '9000000001', 'B.Tech CSE',
 'India', 'Gujarat', 'Surat', 100),

('arjun', 'Arjun Patel', 'arjun.demo@example.com',
 'DEMO_HASH_2', '9000000002', 'B.Tech IT',
 'India', 'Gujarat', 'Ahmedabad', 80),

('neha', 'Neha Desai', 'neha.demo@example.com',
 'DEMO_HASH_3', '9000000003', 'BCA',
 'India', 'Gujarat', 'Vadodara', 60),

('kabir', 'Kabir Mehta', 'kabir.demo@example.com',
 'DEMO_HASH_4', '9000000004', 'B.Tech CSE',
 'India', 'Gujarat', 'Surat', 50);

-- SKILL DATA
INSERT INTO skills (name, category)
VALUES
('Java', 'Programming'),
('SQL', 'Database'),
('Web Development', 'Development'),
('Python', 'Programming'),
('UI Design', 'Design');

-- SKILLS USERS CAN TEACH
INSERT INTO skill_offering
(user_id, skill_id, proficiency_level)
VALUES
(1, 1, 'Advanced'),
(1, 3, 'Intermediate'),
(2, 2, 'Advanced'),
(2, 4, 'Intermediate'),
(3, 5, 'Advanced'),
(4, 3, 'Advanced');

-- SKILLS USERS WANT TO LEARN
INSERT INTO skill_interest
(user_id, skill_id, desired_level)
VALUES
(1, 2, 'Beginner'),
(2, 1, 'Intermediate'),
(3, 3, 'Intermediate'),
(4, 4, 'Beginner'),
(3, 2, 'Beginner');

-- MATCH DATA
INSERT INTO match_record
(requester_id, recipient_id, status, match_score)
VALUES
(1, 2, 'accepted', 90.00),
(2, 1, 'pending', 85.00),
(3, 4, 'pending', 75.00);

-- SESSION REQUEST DATA
INSERT INTO session_request
(requester_id, recipient_id, skill_id, session_type,
 status, duration, coins_earned)
VALUES
(1, 2, 2, 'online', 'pending', 60, 0),
(2, 1, 1, 'online', 'accepted', 45, 20),
(3, 4, 3, 'in-person', 'pending', 60, 0);

-- MESSAGE DATA
INSERT INTO messages
(sender_id, receiver_id, message_text, is_read)
VALUES
(1, 2, 'Hi! Can you teach me SQL?', FALSE),
(2, 1, 'Sure! Let us schedule a session.', TRUE),
(3, 4, 'I want to learn web development.', FALSE);


SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(*) AS total_skills FROM skills;
SELECT COUNT(*) AS total_offerings FROM skill_offering;
SELECT COUNT(*) AS total_interests FROM skill_interest;
SELECT COUNT(*) AS total_matches FROM match_record;
SELECT COUNT(*) AS total_sessions FROM session_request;
SELECT COUNT(*) AS total_messages FROM messages;


SELECT
    u.username,
    s.name AS skill_name,
    so.proficiency_level
FROM users u
JOIN skill_offering so
    ON u.user_id = so.user_id
JOIN skills s
    ON so.skill_id = s.skill_id;

CREATE DATABASE skillswap_sql;
USE skillswap_sql;

-- 1. USER TABLE
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    contact VARCHAR(15),
    degree VARCHAR(100),
    country VARCHAR(50),
    state VARCHAR(50),
    city VARCHAR(50),
    coins INT NOT NULL DEFAULT 100,
    CHECK (coins >= 0)
);

-- 2. SKILL TABLE
CREATE TABLE Skill (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL
);

-- 3. SKILL_OFFERING TABLE
CREATE TABLE Skill_Offering (
    offering_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level ENUM(
        'Beginner', 'Intermediate', 'Advanced', 'Expert'
    ) NOT NULL,

    UNIQUE (user_id, skill_id),

    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES Skill(skill_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 4. SKILL_INTEREST TABLE
CREATE TABLE Skill_Interest (
    interest_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    desired_level ENUM(
        'Beginner', 'Intermediate', 'Advanced', 'Expert'
    ) NOT NULL,

    UNIQUE (user_id, skill_id),

    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES Skill(skill_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 5. MATCH TABLE
CREATE TABLE matches (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    recipient_id INT NOT NULL,
    status ENUM('Pending', 'Accepted', 'Rejected') 
        NOT NULL DEFAULT 'Pending',
    match_score DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (requester_id <> recipient_id),
    CHECK (match_score BETWEEN 0 AND 100),

    FOREIGN KEY (requester_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (recipient_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    UNIQUE (requester_id, recipient_id)
);

-- 6. MESSAGE TABLE
CREATE TABLE Message (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    CHECK (sender_id <> receiver_id),

    FOREIGN KEY (sender_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (receiver_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 7. SESSION_REQUEST TABLE
CREATE TABLE Session_Request (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    recipient_id INT NOT NULL,
    skill_id INT NOT NULL,
    session_type ENUM('Teaching', 'Learning')
        NOT NULL,
    status ENUM('Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled')
        NOT NULL DEFAULT 'Pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration INT NOT NULL DEFAULT 0,
    coins_earned INT NOT NULL DEFAULT 0,

    CHECK (requester_id <> recipient_id),
    CHECK (duration >= 0),
    CHECK (coins_earned >= 0),

    FOREIGN KEY (requester_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (recipient_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (skill_id)
        REFERENCES Skill(skill_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
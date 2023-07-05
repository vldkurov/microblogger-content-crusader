PRAGMA foreign_keys= ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS authors
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT    NOT NULL,
    email    TEXT    NOT NULL UNIQUE,
    password TEXT    NOT NULL,
    token    TEXT    NOT NULL DEFAULT '',
    isLogin  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blogs
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    b_title    VARCHAR(255) NOT NULL DEFAULT 'Blog Title',
    b_subtitle VARCHAR(255) NOT NULL DEFAULT 'Blog Subtitle',
    author_id  INT, --the user that the blog belongs to
    FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS articles
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    a_title    VARCHAR(255) NOT NULL DEFAULT 'Article Title',
    a_subtitle VARCHAR(255) NOT NULL DEFAULT 'Article Subtitle',
    created    TEXT         NOT NULL,
    modified   TEXT,
    published  TEXT,
    likes      INT,
    status     VARCHAR(16),
    body       TEXT         NOT NULL DEFAULT 'Article Body',
    author_id  INT, --the user that the record belongs to
    FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    body       TEXT NOT NULL,
    posted     TEXT NOT NULL,
    author_id  INT,
    article_id INT,
    FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS likes
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id  INT,
    article_id INT,
    FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE
);

INSERT INTO authors ('name', 'email', 'password')
VALUES ('Nina Richie', 'nina@mail.com', 'password'),
       ('Albert Einstein', 'albert@mail.com', 'password');

INSERT INTO blogs ('b_title', 'b_subtitle', 'author_id')
VALUES ('Adventures In Code', 'A very first journey', 1),
       ('The Origin of Time and Space', 'The magic of Nature', 2);

INSERT INTO articles ('a_title', 'a_subtitle', 'created', 'modified', 'status', 'body', 'author_id')
VALUES ('Getting started', 'A daunting task', datetime('now', 'localtime'), datetime('now', 'localtime'), 'Draft',
        'Lorem ipsum dolor sit amet', 1),
       ('Next steps', 'Learning about SQL', datetime('now', 'localtime'), datetime('now', 'localtime'), 'Draft',
        'Lorem ipsum dolor sit amet', 1),
       ('Very interesting story', 'A first time publish', datetime('now', 'localtime'), datetime('now', 'localtime'),
        'Draft',
        'Lorem ipsum dolor sit amet', 1),
       ('Long life Story', 'Once upon a time...', datetime('now', 'localtime'), datetime('now', 'localtime'),
        'Draft',
        'Lorem ipsum dolor sit amet', 1),
       ('Basic theory', 'Gravitation question', datetime('now', 'localtime'), datetime('now', 'localtime'), 'Draft',
        'Lorem ipsum dolor sit amet', 2),
       ('Brownian motion', 'Terms of fluctuations', datetime('now', 'localtime'), datetime('now', 'localtime'),
        'Draft',
        'Lorem ipsum dolor sit amet', 2),
       ('The first quantum theory', 'Paradox of 19th-century physics', datetime('now', 'localtime'),
        datetime('now', 'localtime'), 'Draft',
        'Lorem ipsum dolor sit amet', 2);

INSERT INTO comments (body, posted, article_id, author_id)
VALUES ('I think this is great', datetime('now', 'localtime'), 1, 1),
       ('I do not like this', datetime('now', 'localtime'), 1, 1);

COMMIT;
DROP TABLE IF EXISTS pages;
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content_url TEXT NOT NULL,
    page_url TEXT NOT NULL,
    folder_path TEXT NOT NULL,
    page_desc TEXT NOT NULL DEFAULT '',
    user_id INTEGER NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    deleted_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pages_user_id ON pages (user_id);

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL DEFAULT 'Wabby Wabbo',
    role TEXT NOT NULL DEFAULT 'user',
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    folders TEXT NOT NULL DEFAULT '[{"name": "root", "children": [{"name": "uncategorized", "children": []}]}]'
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
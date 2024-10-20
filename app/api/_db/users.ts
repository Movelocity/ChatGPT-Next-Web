import sqlite3 from "sqlite3";
import path from "path";
import os from "os";
import fs from "fs";

// 设置数据库文件路径
const dbPath =
  os.platform() === "win32" && process.env.PROGRAMDATA
    ? path.join(process.env.PROGRAMDATA, "nextchat", "database.db")
    : "/var/opt/nextchat/database.db";

// 创建数据库目录（仅对于Windows系统）
if (os.platform() === "win32") {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 连接到数据库（如果不存在则创建）
const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("Failed to connect to database:", err.message);
    } else {
      console.log("Connected to SQLite database.");
      db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('admin', 'user')),
            metadata TEXT
        )`);
    }
  },
);

// 增加用户
const addUser = async (
  name: string,
  password: string,
  role: string,
  metadata: string,
) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (name, password, role, metadata) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, password, role, metadata], function (err: any) {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          reject("name already exists.");
        } else {
          reject(err.message);
        }
      } else {
        resolve({ id: this.lastID, name, role, metadata });
      }
    });
  });
};

// 登录校验
const login = async (name: string, password: string) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE name = ? AND password = ?`;
    db.get(sql, [name, password], (err, row) => {
      if (err) {
        reject(err.message);
      } else if (row) {
        resolve(row);
      } else {
        reject("Invalid name or password.");
      }
    });
  });
};

// 修改昵称
const updatename = async (oldname: string, newname: string) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET name = ? WHERE name = ?`;
    db.run(sql, [newname, oldname], function (err) {
      if (err) {
        reject(err.message);
      } else if (this.changes === 0) {
        reject("name not found.");
      } else {
        resolve("name updated successfully.");
      }
    });
  });
};

// 修改密码
const updatePassword = async (name: string, newPassword: string) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET password = ? WHERE name = ?`;
    db.run(sql, [newPassword, name], function (err) {
      if (err) {
        reject(err.message);
      } else if (this.changes === 0) {
        reject("name not found.");
      } else {
        resolve("Password updated successfully.");
      }
    });
  });
};

const getMetadata = async (name: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT metadata FROM users WHERE name = ?`;
    db.get(sql, [name], (err, row: any) => {
      if (err) {
        reject(err.message);
      } else if (row === undefined) {
        resolve(null); // 用户不存在
      } else {
        resolve(row.metadata);
      }
    });
  });
};

// 读写metadata
const updateMetadata = async (name: string, metadata: string) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET metadata = ? WHERE name = ?`;
    db.run(sql, [metadata, name], function (err) {
      if (err) {
        reject(err.message);
      } else if (this.changes === 0) {
        reject("name not found.");
      } else {
        resolve("Metadata updated successfully.");
      }
    });
  });
};

const closeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject("Error closing the database:" + err.message);
      } else {
        resolve("Database connection closed.");
      }
    });
  });
};

// 示例用法
(async () => {
  try {
    await addUser("user1", "password123", "user", '{"key": "value"}');
    const user = await login("user1", "password123");
    console.log("Logged in user:", user);
    await updatename("user1", "newUser1");
    await updatePassword("newUser1", "newPassword123");
    await updateMetadata("newUser1", '{"newKey": "newValue"}');
  } catch (error) {
    console.error("Error:", error);
  }
})();

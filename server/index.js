const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// SQLite数据库文件
const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

// 初始化表
const initSql = `
CREATE TABLE IF NOT EXISTS resume (
  id INTEGER PRIMARY KEY,
  data TEXT NOT NULL
);
`;
db.run(initSql);

// 获取简历
app.get('/api/resume', (req, res) => {
  db.get('SELECT data FROM resume WHERE id = 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.json({ resume: null });
    try {
      res.json({ resume: JSON.parse(row.data) });
    } catch (e) {
      res.status(500).json({ error: '数据解析失败' });
    }
  });
});

// 保存/更新简历
app.put('/api/resume', (req, res) => {
  const data = JSON.stringify(req.body.resume || {});
  db.run(
    'INSERT INTO resume (id, data) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',
    [data],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
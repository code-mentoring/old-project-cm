import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.use((_req, res) => {
  res.send('Project CM');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

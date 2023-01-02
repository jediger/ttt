import express from 'express';
import TTTController from './controller';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(TTTController.CurrentState())
})

app.post('/', (req, res) => {
  const { x, y, team } = req.body;
  const args = {
    x: parseInt(x),
    y: parseInt(y),
    team,
  };
  res.send(TTTController.MakeMove(args));
});

app.post('/reset', (req, res) => {
  res.send(TTTController.ResetBoard());
});

app.post('/grid/:size', (req, res) => {
  const size = parseInt(req.params.size);
  res.send(TTTController.ChangeBoardSize(size));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
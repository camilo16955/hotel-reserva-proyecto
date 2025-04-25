// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let usuarios = [
  { id: 1, nombre: 'Juan Pérez', correo: 'juan@correo.cl', rol: 'Administrador' },
  { id: 2, nombre: 'Ana Díaz', correo: 'ana@correo.cl', rol: 'Cliente' }
];

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const nuevoUsuario = { id: Date.now(), ...req.body };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios[index] = { id, ...req.body };
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


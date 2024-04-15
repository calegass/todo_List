const express = require("express"); // Framework web
const cors = require("cors"); // Controle de acesso
const admin = require("firebase-admin"); // Firebase Admin SDK

const serviceAccount = require("./serviceAccountKey.json"); // Chave de acesso ao Firebase

const app = express(); // Instância do Express

admin.initializeApp({ // Inicialização do Firebase Admin SDK
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-list-60adb-default-rtdb.firebaseio.com",
});

app.use(cors()); // Habilita o CORS
app.use(express.json()); // Habilita o uso de JSON

const tasksRouter = require("./routes/taskRoutes"); // Importa as rotas
app.use("/api", tasksRouter); // Define o prefixo das rotas

app.use((err, req, res, next) => { // Middleware para tratamento de erros
  console.error(err.stack);
  res.status(500).send("Ocorreu algum erro.");
});

const PORT = process.env.PORT || 3000; // Porta do servidor

const server = app.listen(PORT, () => { // Inicializa o servidor
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Servidor iniciado em http://${host}:${port}`);
});
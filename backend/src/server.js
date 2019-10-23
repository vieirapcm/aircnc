const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const routes   = require("./routes");
const path     = require("path");

const socketio = require("socket.io");
const http     = require("http");

const app = express();
const server = http.Server(app); // Extrai o servidor http do express.
const io = socketio(server); // Habilita o server a ouvir o protocolo web socket.

// Conexão com a base de dados mongoDb (user: aircnc | pass: aircnc2019 | db: aircnc).
mongoose.connect('mongodb+srv://aircnc:aircnc2019@aircnc-cu8jq.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const connectedUsers = {};

// Ouve toda a informação do usuário logado (web ou mobile).
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

// Se utiliza o 'next' pois o 'res' não será usado e o 'next' permite que o fluxo siga normalmente, sem depender de uma resposta.
// Esse middleware permite que 'io' e 'connectedUsers' sejam utilizados ao longo do projeto.
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next(); // Segue o fluxo.
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);

server.listen(3333); // Aqui o server ouve tanto requisições http quanto web socket.
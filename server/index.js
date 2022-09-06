const express = require('express');
const {createServer} = require('http');
const { Server } = require("socket.io");

const bodyParser = require('body-parser');
const cors = require("cors");
const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const server = createServer(app);
const io = new Server(server, {  cors: {
    origin: "*",
  },});

//on socket  connection we create listener, which will listen to sendNotificationOnCreateComment,
//which will be sent(emitted) from client,
//when comment successfully created and inside on sendNotificationOnCreateComment,
// we broadcast event to all clients, but client who is creating comment

io.on("connection", (socket) => {
  socket.on("sendNotificationOnCreateComment", (arg) => {
    socket.broadcast.emit("getNotification", arg);
  });
});

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    // this will send to all clients, so its preferably to do broadcast using socket.broadcast inside socket.on
    // io.emit("getNotification", result);
    response.send(result);
  });
});
//I changed it to be post since in client API get does not have body
app.post('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/client', '');
  response.sendFile(`${rootDir}/public/index.html`);
});

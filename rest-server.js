//////////
// CONFIG
// Skapa en express-app (vår server)
const express = require('express');
const app = express();
// express behöver body-parser för att läsa in request body (som json)
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
// porten vi servar på (som i http://localhost:3000 )
const port = 3000;

// Konfigurera databasanslutningen
const mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql',
  database : 'tshirtshop',
  //database : 'ye_olde_custom_tshirt_shoppe'
});
// gör om metoderna connect och query till promise-metoder, så vi kan använda async / await
const util = require('util');
db.connect = util.promisify(db.connect);
db.query = util.promisify(db.query);
// Anslut till databasen
db.connect();

// acceptera CORS
let cors = require('cors');
app.use(cors());

///////////////////////////
// REST API

// GET läser, ex: http://localhost:3000/magazines,  http://localhost:3000/magazines/2
app.get('/rest/:table/:id?', async (req, res) => {
  let result;
  if(req.params.id){
    result = await db.query("SELECT * FROM ?? WHERE id = ?", [req.params.table, req.params.id]);
  }else{
    result = await db.query("SELECT * FROM ??", [req.params.table]);
  }
  res.json(result);
});

// POST skapar, ex: http://localhost:3000/magazines
app.post('/rest/:table', async (req, res) => {
  let result = await db.query("INSERT INTO ?? SET ?", [req.params.table].concat(req.body));
  res.json(result);
});

// PUT uppdaterar, ex: http://localhost:3000/magazines/2
app.put('/rest/:table/:id', async (req, res) => {
  let result = await db.query("UPDATE ?? SET ? WHERE id = ?", [req.params.table].concat(req.body).concat(req.params.id));
  res.json(result);
});

// Radera allt i ett table
app.delete('/rest/:table/', async (req, res) => {
  let result = await db.query("DELETE FROM ??", [req.params.table]);
  res.json(result);
});

// DELETE raderar, ex: http://localhost:3000/magazines/2
app.delete('/rest/:table/:id', async (req, res) => {
  let result = await db.query("DELETE FROM ?? WHERE id = ?", [req.params.table, req.params.id]);
  res.json(result);
});

// ska fånga alla utstående anrop till /rest som inte matchat någon tabell ovan
app.all('/rest/*', async (req, res) => {
  console.log('not found', req.path, req.method);
  res.status(404).end();
});

// serve frontend files (all existing files in the client folder will respond)
app.use(express.static( './client/'));
// also catch all remaining requests
// and send them to our index.html file
// because that is how we get virtual routes in the front-end (and front-end 404's)
// use a little regex for that (not match rest)
app.get('*', async(req, res)=>{
  res.sendFile(path.normalize(__dirname + '/client/index.html'));
});

// servern startas
app.listen(port, () => {
  console.log('server running on port ' + port);
})

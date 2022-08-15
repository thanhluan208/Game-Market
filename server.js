const jsonServer = require("json-server");
const jsonServerAuth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

server.db = router.db;

const PORT = process.env.PORT || 3004;

server.use(jsonServerAuth)
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

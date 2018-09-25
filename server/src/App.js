const express = require('express');
const path = require('path');
const app = express();
// view engine setup
app.use('/', express.static(path.join(__dirname, '..', '..', 'client')));
const port = 8080;
app.listen(port, () => {
    console.log("listening on port ", port);
});
module.exports = app;
//# sourceMappingURL=App.js.map
let express = require('express');
let app = express();
app.use(express.static(__dirname + '/dist/login-app'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/login-app/index.html' );
});

app.listen(process.env.PORT || 8080);
'use strict'

const express = require('express');
const app = express();
const router = express.Router();
const port = 3001;
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname + '/../public'));

const getPeriodicElement = (symbol) => {
    let data = fs.readFileSync(path.join(__dirname + '/periodic-info.json'));
    let results = JSON.parse(data);
    let elementFound = results.elements.find(element => element.symbol == symbol)
    return elementFound;    
}


app.get('/api/element/:symbol', (req, res) => {
    let element = getPeriodicElement(req.params["symbol"]);
    if (element != null){
        /* let now = new Date().getTime();
        while (new Date().getTime() < now + 5000){} */
        res.send(JSON.stringify(element));
        return true;
    }
    res.send('{"status": "error", "errorMessage": "element not found"}');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    console.log('To shutdown the server: ctrl + c')
})
import {SerialPort} from "serialport";
import {ReadlineParser} from "@serialport/parser-readline";
import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    const fs = require('fs');
    app.get('/', function(req, res) {
        fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la lecture du fichier index.html');
            }
            const nouveauContenu = data.replace('Contenu initial du paragraphe', 'Nouveau contenu du paragraphe');
            res.send(nouveauContenu);
        });
    });
});

app.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port 3000.');
});
let dataOne = [];

app.get('/data1', (req, res) => {
    res.json(dataOne);
});

const port = new SerialPort({path: 'COM3', baudRate: 115200 }, function (err) {
    if (err) {
        return console.log('Error:', err.message);
    }
});
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (data) => {
    console.log('Data: '+data+' ==> '+((parseInt(data)*100)/1023)+'%');
    dataOne[0] = ((parseInt(data)*100)/1023)+'%';

});

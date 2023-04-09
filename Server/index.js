import {SerialPort} from "serialport";
import {ReadlineParser} from "@serialport/parser-readline";
import express from 'express';
import fs from 'fs';

const app = express();
const N = 60; // Nombre de données à garder en mémoire

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

let dataOne = new Array(N).fill(null); // Initialisation de la fenêtre glissante

app.get('/data1', (req, res) => {
    const aggregatedData = dataOne.filter(d => d !== null); // Filtrage des données non nulles
    res.json(aggregatedData);
});

const port = new SerialPort({path: 'COM3', baudRate: 115200 }, function (err) {
    if (err) {
        return console.log('Error:', err.message);
    }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (data) => {
    const value = ((parseInt(data)*100)/1023)+'%';
//console.log('Data: '+data+' ==> '+value);
 console.log(value);
    dataOne.shift(); // Décalage de la fenêtre glissante
    dataOne.push(value); // Ajout de la nouvelle valeur à la fin de la fenêtre glissante
});

// Route pour allumer la LED
app.get('/led-on', (req, res) => {
    port.write('on', (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('LED turned on');
        res.send('LED turned on');
    });
});

// Route pour éteindre la LED
app.get('/led-off', (req, res) => {
    port.write('off', (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('LED turned off');
        res.send('LED turned off');
    });
});

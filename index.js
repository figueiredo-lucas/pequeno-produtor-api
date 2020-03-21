const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Advertiser = require('./models/advertiser');
const mongoose = require('mongoose');
const options = {
    swaggerDefinition: {
        info: {
            description: 'API para o sistema de anúncios de Pequenos Produtores',
            title: 'Pequeno Produtor',
            version: '1.0.0',
        },
        host: 'localhost:9000',
        basePath: '/'
    },
    basedir: __dirname,
    files: ['./index.js', './models/*.js']
};

require('express-swagger-generator')(app)(options);

mongoose.connect('mongodb://127.0.0.1/pequeno-produto', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



/**
 * Lista todos os anunciantes
 * @route GET /advertiser
 * @returns {Advertiser[]} 200 - "A lista completa com os anunciantes e produtos"
 * @returns {string} 400 - "Algum erro misterioso"
 */
app.get('/advertiser', (req, res) => {
    Advertiser.find({}, (err, advertisers) => {
        if (err) return res.status(400).send(err);
        res.send(advertisers);
    });
});

/**
 * Lista um anunciante pelo seu ID
 * @route GET /advertiser/{id}
 * @param {string} id.path.required - O ID do anunciante a ser encontrado
 * @returns {Advertiser.model} 200 - "O anunciante encontrado pelo ID"
 * @returns {string} 404 - "Anunciante não encontrado"
 * @returns {string} 400 - "Algum erro misterioso"
 */
app.get('/advertiser/:id', (req, res) => {
    Advertiser.findById(req.params.id, (err, advertiser) => {
        if (err) return res.status(400).send(err);
        if (!advertiser) return res.status(404).send('Anunciante não encontrado');
        res.send(advertiser);
    });
});

/**
 * Cadastra um novo anunciante
 * @route POST /advertiser
 * @param {Advertiser.model} advertiser.body.required - Todos os dados do anunciante
 * @returns {Advertiser.model} 200 - "O anunciante recém cadastrado"
 * @returns {string} 400 - "Algum erro misterioso"
 */
app.post('/advertiser', (req, res) => {
    Advertiser.create(req.body, (err, advertiser) => {
        if (err) return res.status(400).send(err);
        res.send(advertiser);
    });
});

/**
 * Atualiza dados de um anunciante a partir do ID
 * @route PATCH /advertiser/{id}
 * @param {string} id.path.required - O ID do anunciante a ser atualizado
 * @param {Advertiser.model} advertiser.body.required - Os dados do anunciante a ser atualizado
 * @returns {Advertiser.model} 200 - "O aunciante com os dados atualizados"
 * @returns {string} 400 - "Algum erro misterioso"
 */
app.patch('/advertiser/:id', (req, res) => {
    Advertiser.findByIdAndUpdate(req.params.id, req.body, (err, advertiser) => {
        if (err) return res.status(400).send(err);
        if (!advertiser) return res.status(404).send('Anunciante não encontrado');
        res.send(advertiser);
    });
});

/**
 * Remove um anunciante a partir do ID
 * @route DELETE /advertiser/{id}
 * @param {string} id.path.required - O ID do anunciante a ser removido
 * @returns {Advertiser.model} 200 - "O anunciante que foi removido"
 * @returns {string} 404 - "Anunciante não encontrado"
 * @returns {string} 400 - "Algum erro misterioso"
 */
app.delete('/advertiser/:id', (req, res) => {
    Advertiser.findByIdAndDelete(req.params.id, (err, advertiser) => {
        if (err) return res.status(400).send(err);
        if (!advertiser) return res.status(404).send('Anunciante não encontrado');
        res.send(advertiser);
    });
});

app.listen('9000', () => {
    console.log('Listening on port 9000.')
})
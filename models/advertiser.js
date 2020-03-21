var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * @typedef Phone
 * @property {string} number - O número de telefone com DDD
 * @property {boolean} isWhatsapp - Checagem se é ou não WhatsApp
 */

/**
 * @typedef MenuEntry
 * @property {string} product - O nome do produto
 * @property {string} description - A descrição do produto
 * @property {number} price - O valor do produto
 */

/**
 * @typedef Advertiser
 * @property {string} _id
 * @property {string} name
 * @property {string} description
 * @property {string} email
 * @property {string} logoPath
 * @property {string} address
 * @property {Phone[]} phones
 * @property {string} facebook
 * @property {string} instagram
 * @property {boolean} doesDelivery
 * @property {MenuEntry[]} menu
 */
var AdvertiserSchema = new Schema({
    name: String,
    description: String,
    email: String,
    logoPath: String,
    address: String,
    phones: [{
        number: String,
        isWhatsapp: Boolean
    }],
    facebook: String,
    instagram: String,
    doesDelivery: Boolean,
    menu: [{
        product: String,
        description: String,
        price: Number
    }]
});

module.exports = mongoose.model('advertiser', AdvertiserSchema);
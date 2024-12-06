import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const productsChema = new Schema({
}, {timestamps: true, strict: false});
export default class ModelProduct extends mongoose.model('products', productsChema) {

}
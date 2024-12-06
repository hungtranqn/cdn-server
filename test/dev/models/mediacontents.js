import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const MediaContentsPathChema = new Schema({

}, {timestamps: true, strict: false});
export default class MediaContents extends mongoose.model('mediacontents', MediaContentsPathChema) {

}
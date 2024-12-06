import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import Promise  from "bluebird";
import express from "express";
import fs from "fs";
import lodash from "lodash";
mongoose.Promise = Promise;
import debug from "debug";
const  url = "mongodb://scandatatestdbOwner:scandatatestdbOwner@192.168.1.103:27017/scan-data-build?maxPoolSize=1000";
import ModelProduct from "./models/product.js";
const app = express();
const connectDatabase   = async ()=>{
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully ! : '+url);
    })
    mongoose.connection.on('error', (err) => {
        console.log(`Could not connect to MongoDB because of ${err}`)
        process.exit(1)
    })
    mongoose.connection.on('disconnected', () => {
        process.exit(1)
    });
    mongoose.set('debug', false);
    await mongoose.connect(url,{});
};
await connectDatabase();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// View Engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/',async (req, res) => {
    let images = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    let limit = req.query.limit || 10;
    images = lodash.take(images, limit);
    let find = [
        {
            find:'https://ae01.alicdn.com',
            replace:'ali1'
        },
        {
            find:'https://ae02.alicdn.com',
            replace:'ali2'
        },
        {
            find:'https://ae03.alicdn.com',
            replace:'ali3'
        },
        {
            find:'https://ae04.alicdn.com',
            replace:'ali4'
        },
        {
            find:'//ae01.alicdn.com',
            replace:'ali1'
        },
        {
            find:'//ae02.alicdn.com',
            replace:'ali2'
        },
        {
            find:'//ae03.alicdn.com',
            replace:'ali3'
        },
        {
            find:'//ae04.alicdn.com',
            replace:'ali4'
        }
    ];
    let stt = 0;
    let hostServer = 'https://images.suuforest.net';
    hostServer = 'https://images-lanh.devsgd.com';
    images  = images.map((item)=>{
        stt++;
        for(let findItem of find) {
            if (item.thumbnail.indexOf(findItem.find) !== -1) {
                item.thumbnail = item.thumbnail.replace(findItem.find, `${hostServer}/imgs/${findItem.replace}`);
                item.src = item.thumbnail;
                break;
            }
        }
        item.stt = stt;
        return item;
    });
    res.render('index', {
        title: 'Load Images',
        images: images
    });
});
app.listen(1996, () => {
    console.log('Server started on http://localhost:1996');
});
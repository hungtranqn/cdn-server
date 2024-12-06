
global.suu = {};
import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import Promise  from "bluebird";
import express from "express";
import fs from "fs";
mongoose.Promise = Promise;
import debug from "debug";
const log = debug("crawler-server:test:main");
const  url = "mongodb://192.168.2.122:27017/mediaserver";
import lodash from "lodash";
import md5 from "md5";
import MediaContents from "./models/mediacontents.js";
const connectDatabase   = async ()=>{
    mongoose.connection.on('connected', () => {
        log('Connected to MongoDB successfully ! : '+url);
    })
    mongoose.connection.on('error', (err) => {
        log(`Could not connect to MongoDB because of ${err}`)
        process.exit(1)
    })
    mongoose.connection.on('disconnected', () => {
        process.exit(1)
    });
    mongoose.set('debug', false);
    await mongoose.connect(url,{});
};
(async ()=>{
    await connectDatabase();
    const data = await MediaContents.find({});
    console.log(data);
})()


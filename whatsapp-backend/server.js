// Imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// App Config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1137593",
    key: "b60d896ef97cbceab53d",
    secret: "0655dcf2170e217a1b0d",
    cluster: "eu",
    useTLS: true
  });

// Middleware
app.use(express.json());
app.use(cors());

//   We are using cors,so we dont need to do this:
    //   To secure the messages this is required,
    //   These are the course headers
    //   We allow the requests from any endpoint and
    //   we will be accessing any kind of header
    // app.use((req, res, next)=>{
    //     res.setHeader("Access-Control-Allow-Origin","*");
    //     res.setHeader("Access-Control-Allow-Headers","*");
    //     next();
    // })

// db config
const connection_url="mongodb+srv://admin:whatsappmern@cluster0.zy8c5.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//For Pusher
const db = mongoose.connection;
db.once('open',()=>{
    console.log("DB Connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change)=>{
        console.log("A change ocuured ",change);
    });
    if(change.operationType ==='insert'){
        const messageDetails = change.fullDocument;
        pusher.trigger('messages','inserted',{
            name= messageDetails.name,
            message= messageDetails.message,
            timestamp=messageDetails.timestamp,
            received:messageDetails.received
        });
    }
    else {
        console.log("error triggering pusher");
    }
});


// API Routes
app.get('/',(req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

app.post('./messages/new',(req,res)=>{
    const dbMessage=req.body;
    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            req.status(201).send(data);
        }
    })
});


// listeners
app.listen(port,()=>console.log(`Listening on local host: ${port}`));


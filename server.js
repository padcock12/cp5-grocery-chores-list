const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

let userEnter = "";
let itemName ="";
let products =[];
let previousList=[];
let quantity=0;

let choresParker = [];
let choreName = "";
let howLong = "";
let personName="";


app.post('/api/products',(req,res)=> {
   const product = {
       itemName:req.body.itemName,
       quantity:parseInt(req.body.quantity),
       userEnter:req.body.userEnter
   } 
   products.push(product);
   console.log(product);
   res.send(product);
});

app.post('/api/chores',(req,res)=> {
   const chores = {
       choreName:req.body.choreName,
       howLong:req.body.howLong,
       personName:req.body.personName
   }
   choresParker.push(chores);
   console.log(choresParker);
   res.send(choresParker);
});

app.get('/api/products',(req,res)=> {
   res.send(products); 
});

app.get('/api/choresParker',(req,res)=> {
    res.send(choresParker);
});


app.delete('/api/products/:name',(req,res)=> {
   const name = req.body.name;
   const item = products.find((element)=>element.name === name);
   const index = products.indexOf(item);
   products.splice(index,1);
   res.send(products);
});

app.delete('/api/chores/:name',(req,res)=> {
   const choreName = req.body.choreName;
   const item = choresParker.find((element)=>element.choreName===choreName);
   const index = choresParker.indexOf(item);
   choresParker.splice(index,1);
   res.send(choresParker);
});


app.put('/api/cart/increase/:itemName/:quantity',(req,res)=> {
    const itemName = req.params.itemName;
    console.log("Increase quantity");
    let quantity = parseInt(req.params.quantity);
    let item = products.find((element)=>element.itemName === itemName);
    if(!products.includes(item)) {
        res.sendStatus(404);
    }
    const index = products.indexOf(item);
    products.splice(index,1);
    quantity = quantity+1;
    console.log(item);
    console.log(quantity);
    const personName = item.personName;
    item = {
             itemName:itemName,
             quantity: quantity,
             personName:personName
         }
    products.push(item);
    console.log(products);
    res.send(products);
});

app.put('/api/cart/decrease/:itemName/:quantity',(req,res)=> {
    const itemName = req.params.itemName;
    console.log("Decrease quantity");
    let quantity = parseInt(req.params.quantity);
    let item = products.find((element)=>element.itemName === itemName);
    if(!products.includes(item)) {
        res.sendStatus(404);
    }
    quantity = quantity-1;
    if(quantity ===0) {
         const index = products.indexOf(item);
         products.splice(index,1);
         res.send(products);
    }
    const index = products.indexOf(item);
    products.splice(index,1);
    console.log(item);
    console.log(quantity);
    const personName = item.personName;
    item = {
             itemName:itemName,
             quantity: quantity,
             personName: personName
         }
    products.push(item);
    console.log(products);
    res.send(products);
});

app.listen(3000, ()=> console.log("Server is listening port 3000"));
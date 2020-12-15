const express = require('express');
const app = express();
const page = require('./routes/page')
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
const Blog = require('./models/blog');


mongoose.connect("mongodb://localhost/text",{useUnifiedTopology: true,useNewUrlParser: true});
var db = mongoose.connection;
db.once('open',()=>console.log('connected database'));
db.on('error',console.error.bind(console,'error'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');

app.use('/blog',page);
app.get('/',(req,res)=>{
    Blog.find({},(err,blogs)=>{ 
        if(err)
        console.log(err)
        res.render('front',{blogs:blogs});
    });
})
app.listen(8000,()=>console.log('server is started at port 8000'));
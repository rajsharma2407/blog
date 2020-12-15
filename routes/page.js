const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/',(req,res)=>{
    Blog.find({},(err,blogs)=>{ 
        res.render('index',{blogs:blogs});
        if(err)
        console.log(err)
    });
})
router.get('/add',(req,res)=>{
    res.render('newBlog')
})

router.post('/add',(req,res)=>{
    var title = req.body.title;
    var desc = req.body.description;

    var blog = new Blog({
        title:title,
        description:desc
    }) ;
    blog.save(err=>{
        if(err) {
        console.log(err);
            res.redirect('/blog/add');
        }
        console.log('blog saved');
    })  
    res.redirect('/blog')
})
router.get('/update/:slug',(req,res)=>{
    
    Blog.findOne({slug:req.params.slug},(err,page)=>{
        if(err) console.log(err)
        if(page){
            res.render('update',{page:page});
        }else{
            res.redirect('/');
        }
    })
})
router.put('/update/:id',async (req,res)=>{
    await Blog.findByIdAndUpdate(req.params.id,{
        title:req.body.title
        ,description:req.body.description
        ,slug:(req.body.title).replace(/\s+/g,'-'),
        createdAt: Date.now()
    });
    res.redirect('/blog')
})
router.delete('/:id',async (req,res)=>{
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/blog')
})
router.get('/:slug',(req,res)=>{
    
    Blog.findOne({slug:req.params.slug},(err,blogs)=>{ 
        if(err)
        console.log(err)
            res.render('Blog',{blog:blogs});
       
    });
})
module.exports = router;
// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
const PATH = '/posts';
server.post(PATH, (req, res) => {
    const { author, title, contents } = req.body;
    if (!author || !title || !contents) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
    }    
    const post = {
        id: id++,
        author,
        title,
        contents
    }
    posts.push(post);
    res.status(200).json(post);
});

server.post(`${PATH}/author/:author`, (req, res) => {
    let {author} = req.params;
    let {title, contents} = req.body;
    if (!author || !title || !contents) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
    }
    const post = {
        id: id++,
        author,
        title,
        contents
    }
    posts.push(post);
    res.status(200).json(post);

});

server.get(PATH, (req, res) =>{
    let {term} = req.query;
    if(term){
        const term_posts = posts.filter(
            (p) => p.title.includes(term) || p.contents.includes(term)
        );
        return res.status(200).json(term_posts);
    }
    res.status(200).json(posts);
});

server.get(`${PATH}/:author`, (req, res) => {
    let {author} = req.params;
    const post = posts.filter(
        (p) => p.author === author 
    );    
    if (post.length === 0) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post del autor indicado" });
    }    
    res.status(200).json(post);
});

server.get(`${PATH}/:author/:title`, (req, res) => {
    let {author, title} = req.params;
    const post = posts.filter(
        (p) => p.author === author && p.title === title
    );    
    if (post.length === 0) {
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post con dicho titulo y autor indicado" });
    }    
    res.status(200).json(post);
});

server.put(PATH, (req, res) =>{
    const { id, title, contents } = req.body;
    if (id && title && contents) {
        let post = posts.find(p => p.id === parseInt(id))
        if (post) {
            post.title = title;
            post.contents = contents;
            res.json(post);
        }else{
        return res
            .status(STATUS_USER_ERROR)
            .json({ error: "No existe ningun post con dicho ID" });
        }
    }else{
        return res
        .status(STATUS_USER_ERROR)
        .json({ error: "No se recibieron los parámetros necesarios para modificar el Post" });
    }
});

server.delete(PATH, (req, res) => {
    const {id} = req.body;
    const post = posts.find((p) => p.id === parseInt(id));
    if(!id || !post) {
        return res
        .status(STATUS_USER_ERROR)
        .json({ error: "Mensaje de error" });
    }else{
        posts = posts.filter(p => p.id != parseInt(id));
        res.json({success: true});
    }
});

server.delete('/author', (req, res) => {
    const {author} = req.body;
    const author_found = posts.find((p) => p.author === author);
    if(!author || !author_found) {
        return res
        .status(STATUS_USER_ERROR)
        .json({"error": "No existe el autor indicado"});
    }
    let delete_authors = [];
    //Opcion 1
    delete_authors = posts.filter(p => p.author === author);
    posts = posts.filter(p => p.author !== author);

    //Opcion 2
    // posts = posts.filter(p=>{
    //     if (p.author !== author) {
    //         return true;            
    //     } else {
    //         delete_authors.push(p);
    //     }
    // });

    res.json(delete_authors);
    
});

module.exports = { posts, server };

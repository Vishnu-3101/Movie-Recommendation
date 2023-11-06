const joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let genres = [{id:1 , name: "comedy"},
            {id:2 , name: "horror"},
            {id:3 , name: "crime"}
            ];

app.get('/' , (req,res) => {
    res.send("Welcome to Movie Recommendation website");
});

app.get('/api/genres' , (req,res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req,res)=> {
    var genre = genres.find(g => g.id===parseInt(req.params.id));
    if(!genre){
        return res.status(404).send("Genre with given id not found");
    }
    res.send(genre);
});

app.post('/api/genres', (req,res)=>{

    const { error } = validate(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    var genre = {
        id: genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id',(req,res) => {
    var genre = genres.find(g => g.id===parseInt(req.params.id));
    if(!genre){
        return res.status(404).send("Genre with given id not found");
    }

    const { error } = validate(req.body);
    
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id',(req,res) => {
    var genre = genres.find(g => g.id===parseInt(req.params.id));
    if(!genre){
        return res.status(404).send("Genre with given id not found");
    }

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});

function validate(body){
    const schema = joi.object({
        name: joi.string().min(3).required()
    });
    return schema.validate(body);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));
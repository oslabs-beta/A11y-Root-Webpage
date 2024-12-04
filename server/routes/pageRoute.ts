import express from 'express';
// import path from 'path';

const pageRoute = express.Router();

pageRoute.get('/', (req,res)=> {
    res.status(200).send(res.locals)
});

pageRoute.post('/', (req,res)=> {
    res.status(200).send(res.locals)
});

pageRoute.patch('/', (req,res)=> {
    res.status(200).send(res.locals)
});

pageRoute.delete('/', (req,res)=> {
    res.status(200).send(res.locals)
});

export default pageRoute;
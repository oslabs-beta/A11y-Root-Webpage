import express from 'express';
// import path from 'path';

const projectRoute = express.Router();

projectRoute.get('/', (req,res)=> {
    res.status(200).send(res.locals)
});

projectRoute.post('/', (req,res)=> {
    res.status(200).send(res.locals)
});

projectRoute.patch('/', (req,res)=> {
    res.status(200).send(res.locals)
});

projectRoute.delete('/', (req,res)=> {
    res.status(200).send(res.locals)
});

export default projectRoute;
import 'dotenv/config'
import express from 'express'

const app= express()
const port =process.env.PORT || 3000
app.use(express.json())

let Data = [];
let nextId =1

app.use(express.json());

app.post('/data', (req,res) => {
    const {name, age} = req.body
    const UserData = {id: nextId++, name, age}
    Data.push(UserData)
    res.status(201).send(UserData)
})

app.get('/data',(req,res) => {
    res.status(200).send(Data);
})

app.get('/data/:id',(req,res) => {
    const user = Data.find(i => i.id ===parseInt(req.params.id))
    if(!user){
        return res.status(404).send(`No such id found!`)
    }else{
        res.status(200).send(user)
    }
})

app.put('/data/:id', (req,res) => {
    const user=Data.find(t => t.id ===parseInt(req.params.id))
    if(!user){
        return res.status(404).send(`No such id found`);
    }
    const {name,age}=req.body;
    user.name=name;
    user.age=age;

    return res.status(200).send(user);
})

app.delete('/data/:id', (req,res) => {
    const index=Data.findIndex(t => t.id === parseInt(req.params.id))
    if(index===-1){
        return res.status(404).send(`Invalid id`);
    }
    Data.splice(index,1);
    return res.status(204).send(`Deleted`);
})

app.listen(port, () => {
    console.log(`server is running at port: ${port}...`);
})
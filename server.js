const express = require('express');
const app = express();
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users', (req, res)=> {
    res.json(users)
})

app.post('/users',async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashpassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashpassword)

        const user = { name: req.body.name, password: hashpassword }
        users.push(user)
        res.status(200).send()
    } catch {
        res.status(500).send()
    }   
})

app.post('/users/login', async (req, res)=> {
    const user = users.find(user => users.name = req.body.name)
    if(user == null) {
        return res.status(400).send('cannot find user')
    }

    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('success')
        }
        else {
            res.send('not allow')
        }
    } catch  {
        res.status(500).send()
    }
})


app.listen(3000,()=>{
    console.log('server online')
})

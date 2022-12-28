const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

/* app.get('/users', (request, response) => {
    const {name, age} = request.query
    
    return response.json({name , age})
}) */

/* app.get('/users/:id', (request, response) => {
    const {id} = request.params
    console.log(id)
    
    return response.json({id})
})
 */

/* app.get('/users', (request, response) => {
    
    const {name,age} = request.body
    
    
    return response.json({ name,age})
}) */

const users = []
const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error:"user not found!"})
    }
    request.userIndex = index
    request.userId = id

    next()
}



app.get('/users', (request, response) => {
   
    return response.json(users)
})

app.post('/users', (request, response) => {
   
    const {name,age} = request.body
    const user = {id:uuid.v4(), name, age}

    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    
    const{name, age} = request.body
    const index = request.userIndex
    const id = request.userId
    const updateuser = {id, name, age}

    users[index] = updateuser

    return response.json(updateuser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json()
})



app.listen(port, () => {
    console.log(`🚀 server started on port ${port}`)
})
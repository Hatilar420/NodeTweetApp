require('dotenv').config()
const express =  require('express');
const app =  express();
const cors = require('cors')
const port = process.env.PORT
const users = require('./Controllers/UserController')
const following = require('./Controllers/FollowController')
const posts = require('./Controllers/PostController')

app.use(cors())
app.use(express.json())
app.use('/api/users',users)
app.use('/api/post',posts)
app.use('/api/follow',following)


app.listen(port, () => {
    console.log(`hosted on port ${port}`)
})
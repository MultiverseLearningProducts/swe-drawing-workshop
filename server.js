const express = require('express')
const app = express()
require('express-ws')(app)
const path = require('path')
const Color = require('next-color')

const color = new Color(.9)
const sockets = []
const state = {}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.ws('/', (ws, req) => {
    sockets.push(ws)
    const clientColor = color.next()
    state[clientColor] = [0,0,0,0]

    ws.send(`COLOR|${clientColor}`)

    ws.on('message', msg => {
        const [clientColor, deltaX, deltaY, x, y] = msg.split('|')
        state[clientColor] = [Number(deltaX), Number(deltaY), Number(x),Number(y)]
        sockets.forEach(socket => socket.send(JSON.stringify(state)))
    })

    ws.on('close', () => {
        const index = sockets.indexOf(ws)
        sockets.splice(index, 1)
        delete state[clientColor]
    })
})  

app.listen(3000, () => {
    console.log('Drawing app is ready')
})
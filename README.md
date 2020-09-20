# SWE Drawing Workshop

This workshop is an introduction to HTML canvas element, Node.js express server and websockets.

## Heroku

1. `heroku apps:create myapp`
1. `git push heroku master`

Remember heroku likes to assign the port so make provisions to start the app on a process.env.PORT

## Mousedown

First of all capture the mouse x, y when the "pen" is down.

## Canvas

Include the canvas element. Initialise it with javascript and get it to fill the viewport.

```javascript
const [canvas] = document.getElementsByTagName('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
```

## Draw on the canvas

When the pen goes down update a 'flag' to true. Set a global x, y. `onmousemove` start a path, move to the global x, y, use lineTo the current event's mouse clientX, clientY, finish with stroke()

You should be drawing now.

Can you alter pen width?

## Server

First of all create a server to serve your static index.html page.

```javascript
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
```

## WebSockets

Instead of drawing on the client, we want to send our mouse positions to a socket server who can broadcast those positions to all connected clients.

1. Create the socket endpoint
1. Keep track of connections with a sockets array
1. Deal with connections, messages and disconnections
1. Assign clients colorKeys to track multiple mouse positions
1. clients need to receive their color and assign it

## Serialise - Deserialise

Use JSON string to transfer the state of the shared data in a keyed object.

1. Send up your mouse positions (dont use them to draw any more)
1. Send down shared state
1. Deserialze and render the shared state object
1. Draw via the socket server

Update your client to connect to a deployed server here 'wss://swe-drawing-workshop.herokuapp.com/'

## Conclusion

* We have learnt about HTML canvas
    + What is the API to create a context?
    + What is the canvas context in your own words?
* We have used WebSockets
    + What can you pass backwards and forwards via websockets?
    + What functionality do websockets give you that a standard express server does not?
* We have serialised and deserialised data
    + What javascript module did we use to do this?
    + What other way did we serialize data (hint: "pipes")?

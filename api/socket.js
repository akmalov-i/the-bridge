const io = require('socket.io')(3001, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.on('userJoined', async (userId) => {
    if (!socket.rooms[userId]) {
      await socket.join(userId)
    }
  })

  socket.on('createMessage', async (data, cb) => {
    if (!data.text) {
      return cb('Текст не может быть пустым')
    }

    await io.to(data.from).emit('newMessage', data)
    await io.to(data.to).emit('setMessage', data)
    await io.to(data.to).emit('setTelegram')
    cb()
  })

  socket.on('userLeft', (userId, cb) => {
    socket.leave(userId)
    cb()
  })
})

export default function (req, res, next) {
  next()
}

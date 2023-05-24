import { Socket } from 'socket.io'

export const SocketServer = (socket: Socket) => {
    // join & out news detail
    socket.on('joinRoom', (id: string) => {
        socket.join(id)
        console.log({ joinRoom: (socket as any).adapter.rooms })
    })

    socket.on('outRoom', (id: string) => {
        socket.leave(id)
        console.log({ outRoom: (socket as any).adapter.rooms })
    })

    // subscribe & unsubscribe by user id
    socket.on('subscribe', (id: string) => {
        socket.join(id)
        console.log({ subscribe: (socket as any).adapter.rooms })
    })

    socket.on('unsubscribe', (id: string) => {
        socket.leave(id)
        console.log({ unsubscribe: (socket as any).adapter.rooms })
    })

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected')
    })
}

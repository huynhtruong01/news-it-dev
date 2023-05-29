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

    socket.on('followNotify', ({ user, userFollow }) => {
        console.log(user.username, userFollow.username)
        const notify = {
            userId: user.id,
            newsId: null,
            user,
            news: null,
            recipients: [userFollow],
            readUsers: [],
            text: 'has started follow you',
        }

        socket.to(userFollow.id.toString()).emit('createNotify', notify)
    })
}

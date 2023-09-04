"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const services_1 = require("../services");
const SocketServer = (socket) => {
    // join & out news detail
    socket.on('joinRoom', (id) => {
        socket.join(id);
        console.log({ joinRoom: socket.adapter.rooms });
    });
    socket.on('outRoom', (id) => {
        socket.leave(id);
        console.log({ outRoom: socket.adapter.rooms });
    });
    // subscribe & unsubscribe by user id
    socket.on('subscribe', (id) => {
        socket.join(id);
        console.log({ subscribe: socket.adapter.rooms });
    });
    socket.on('unsubscribe', (id) => {
        socket.leave(id);
        console.log({ unsubscribe: socket.adapter.rooms });
    });
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
    socket.on('followNotify', ({ user, userFollow }) => {
        const notify = {
            userId: user.id,
            newsId: null,
            user,
            news: null,
            recipients: [userFollow],
            readUsers: [],
            text: 'follow you',
        };
        socket.to(userFollow.id.toString()).emit('createNotify', notify);
    });
    socket.on('notifyLikesNews', (notify) => __awaiter(void 0, void 0, void 0, function* () {
        const newNotify = yield services_1.notifyService.create(notify);
        socket.to('15').emit('notifyNews', newNotify);
    }));
};
exports.SocketServer = SocketServer;

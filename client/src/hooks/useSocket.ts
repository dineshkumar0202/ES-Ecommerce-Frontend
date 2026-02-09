import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const useSocket = (userId: string | null) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;

        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.emit('join', userId);

        return () => {
            newSocket.disconnect();
        };
    }, [userId]);

    return socket;
};

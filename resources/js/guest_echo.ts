import axios from 'axios'
import Echo from 'laravel-echo'

const echo = new Echo({
    broadcaster: 'reverb',

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 80),

    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 443),

    forceTLS:
        (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',

    enabledTransports: ['ws', 'wss'],

    authorizer: (channel) => {
        return {
            authorize: (
                socketId,
                callback
            ) => {
                axios.post(
                    '/broadcasting/auth',
                    {
                        socket_id: socketId,
                        channel_name: channel.name,
                    },
                    {
                        headers: {
                            'X-Chat-Token': localStorage.getItem('chat_session_token') || '',
                        },
                    }
                )
                    .then(response => {
                        callback(null, response.data)
                    })
                    .catch(error => {
                        callback(error, null)
                    })
            },
        }
    },
})

export default echo
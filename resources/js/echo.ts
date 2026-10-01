import Echo from 'laravel-echo'
import { Message } from './types/chat'

const echo = new Echo({
    broadcaster: 'reverb',

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 80),

    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 443),

    forceTLS:
        (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',

    enabledTransports: ['ws', 'wss'],
})

export default echo




export const subscribeToChatSession =(
        sessionUuid: string,
        onMessage: (message: Message) => void,
    ) => {
    return echo
        .channel(`chat.session.${sessionUuid}`)
        .listen('.message.sent', (event: Message) => {
            onMessage(event)
        })
    }

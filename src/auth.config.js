import Google from "@auth/core/providers/google"
import GitHub from '@auth/core/providers/github'
import Discord from '@auth/core/providers/discord'
import Twitch from '@auth/core/providers/twitch'
import Credentials from "@auth/core/providers/credentials"
import { getUserByEmail } from "@/lib/data"

export default {
    providers: [
        Google,
        GitHub,
        Discord,
        Twitch,
        Credentials({
            async authorize(credentials) {
                console.log('AUTHORIZE');
                return getUserByEmail(credentials.email)
            },
        }),
    ]
}
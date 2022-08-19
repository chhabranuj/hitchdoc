import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "1035296938518-av5tfslbn46hvjitjkpiountbvb04nfc.apps.googleusercontent.com",
            clientSecret: "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"
        }),
    ]
})


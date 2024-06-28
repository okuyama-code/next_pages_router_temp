import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("credentials")
        console.log(credentials)
        // Here you should check the credentials against your database
        // This is just a placeholder
        const user = { id: 1, name: "奥山", email: credentials.email }
        console.log(credentials.password)
        console.log(user)
        if (user) {
          return user

        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("callback")
      // console.log(account)
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      console.log("session関数!!")
      console.log(session)
      console.log(session.user.email)
      console.log(token)
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
})
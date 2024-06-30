import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { register } from '../auth';

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
        if (user) {
          return user

        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
			try {
        const params = {
          provider: account?.provider,
          uid: user?.id,
          name: user?.name,
          email: user?.email
        }
        const res = await register(params)
        console.log(res)
				if (res.status === 200) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				console.log('エラー', error);
				return false;
			}
		},
  }
})
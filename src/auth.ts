import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from '$env/static/private'
import { SvelteKitAuth } from '@auth/sveltekit'
import Strava from '@auth/sveltekit/providers/strava'

declare module '@auth/sveltekit' {
	interface Session {
		accessToken?: string
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Strava({
			clientId: STRAVA_CLIENT_ID,
			clientSecret: STRAVA_CLIENT_SECRET,
			authorization: { params: { scope: 'profile:read_all', approval_prompt: 'auto' } },
		}),
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			if (profile && account) {
				token.accessToken = account.access_token
				token.id = profile.id
				token.firstName = profile.firstname
			}

			return token
		},
		async session({ session, token }) {
			if (token) {
				session.accessToken = token.accessToken as string
				session.user.id = token.id as string
				session.user.name = token.firstName as string
			}

			return session
		},
	},
})

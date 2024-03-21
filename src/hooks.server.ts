import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handle as authenticationHandle } from './auth'

async function authorizationHandle({ event, resolve }: { event: any; resolve: any }) {
	if (event.url.pathname.startsWith('/app')) {
		const session = await event.locals.auth()

		if (!session) {
			throw redirect(303, '/')
		}
	}

	return resolve(event)
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle)

import * as db from '$lib/server/db'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth()

	if (session?.user && session.user.id) {
		const userExists = await db.getUser(parseInt(session.user.id))

		if (userExists) {
			throw redirect(303, '/app/dashboard')
		} else {
			throw redirect(303, '/app/register')
		}
	}

	return {}
}

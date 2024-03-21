import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth()

	if (session?.user && session.user.id) {
		throw redirect(303, '/app')
	}

	return {}
}

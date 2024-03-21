import * as db from '$lib/server/db'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth()
	let user

	if (session?.user && session.user.id) {
		user = await db.getUser(parseInt(session.user.id))
	}

	return {
		session: session,
		user: user,
	}
}

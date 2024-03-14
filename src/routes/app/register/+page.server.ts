import * as api from '$lib/server/api'
import * as db from '$lib/server/db'
import { type Bike } from '@prisma/client'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth()

	if (session?.user && session.user.id && session.user.name && session.accessToken) {
		const userId = parseInt(session.user.id)
		const userExists = await db.userExists(userId)

		if (!userExists) {
			const athlete = await api.getAthlete(session.accessToken)
			let bikes = []

			if (athlete.hasOwnProperty('bikes')) {
				bikes = athlete.bikes.map((bike: any) => {
					return { id: bike.id, name: bike.nickname, distance: bike.distance }
				})
			}

			return {
				user: {
					id: userId,
					name: session.user.name,
					bikes: bikes,
				},
			}
		} else {
			throw redirect(303, '/app/dashboard')
		}
	}
}

export const actions = {
	register: async ({ request }) => {
		const data = await request.formData()
		const id = data.get('id')
		const bikes = data.getAll('bike').map((bike: FormDataEntryValue) => JSON.parse(bike as string))

		if (id && bikes) {
			const user = await db.createUser(parseInt(id as string), bikes as Bike[])

			if (user) {
				throw redirect(303, '/app/dashboard')
			}
		}
	},
} satisfies Actions

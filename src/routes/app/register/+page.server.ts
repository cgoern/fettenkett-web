import * as api from '$lib/server/api'
import * as db from '$lib/server/db'
import { type Bike } from '@prisma/client'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { put } from '@vercel/blob'

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth()

	if (session?.user && session.user.id && session.user.name && session.accessToken) {
		const userExists = await db.getUser(parseInt(session.user.id))

		if (!userExists) {
			const athlete = await api.getAthlete(session.accessToken)
			let bikes = []

			if (athlete.hasOwnProperty('bikes')) {
				bikes = athlete.bikes.map((bike: any) => {
					return { id: bike.id, name: bike.nickname, distance: bike.distance } as Bike
				})
			}

			return {
				bikes: bikes,
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
		const images = data.getAll('image') as File[]
		let bikes = data.getAll('bike').map((bike) => JSON.parse(bike as string))

		const uploads = await Promise.all(
			images.map(async (image) => {
				if (image.name !== '') {
					const { url } = await put(image.name, image, { access: 'public' })

					return { url }
				}
			}),
		)

		if (uploads.length > 0) {
			uploads.map((upload, index) => {
				bikes[index].image = upload?.url
			})
		}

		if (id && bikes) {
			const user = await db.createUser(parseInt(id as string), bikes as Bike[])

			if (user) {
				throw redirect(303, '/app/dashboard')
			}
		}
	},
} satisfies Actions

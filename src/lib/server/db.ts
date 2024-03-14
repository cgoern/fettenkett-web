import { PrismaClient, type Bike, type User } from '@prisma/client'

const prisma = new PrismaClient()

export async function userExists(id: number): Promise<User | null> {
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	})

	return user
}

export async function createUser(id: number, bikes: Bike[]): Promise<User> {
	const user = await prisma.user.create({
		data: {
			id: id,
			bikes: {
				create: bikes,
			},
		},
	})

	return user
}

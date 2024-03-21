import { PrismaClient, type Bike, type User, type Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type UserWithBikes = Prisma.UserGetPayload<{
	include: { bikes: true }
}>

export async function getUser(id: number): Promise<UserWithBikes | null> {
	return await prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			bikes: true,
		},
	})
}

export async function createUser(id: number, bikes: Bike[]): Promise<User> {
	return await prisma.user.create({
		data: {
			id: id,
			bikes: {
				create: bikes,
			},
		},
	})
}

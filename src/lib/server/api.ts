import { STRAVA_API_HOST } from '$env/static/private'

const _call = async (endpoint: string, accessToken: string): Promise<any> => {
	const response = await fetch(`${STRAVA_API_HOST}/${endpoint}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	})

	return await response.json()
}

export const getAthlete = async (accessToken: string) => {
	return await _call('/athlete', accessToken)
}

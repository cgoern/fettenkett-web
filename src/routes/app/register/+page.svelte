<script lang="ts">
	import { type Bike } from '@prisma/client'
	import * as format from '$lib/utils/format'

	export let data

	let bikeSelections = data.user?.bikes.map((bike: Bike) => ({
		id: bike.id,
		name: bike.name,
		distance: bike.distance,
		checked: true,
	}))

	$: bikeSelected = bikeSelections.some((selection: HTMLInputElement) => selection.checked)
</script>

{#if data.user}
	<h1>Hello {data.user.name}</h1>
	<form method="POST" action="?/register">
		<input type="hidden" value={data.user.id} name="id" />
		{#if data.user.bikes}
			<fieldset name="bikes">
				<legend>Select the bikes you want to track?</legend>
				{#each bikeSelections as selection}
					<div>
						<input
							type="checkbox"
							value={JSON.stringify({
								id: selection.id,
								name: selection.name,
								distance: selection.distance,
							})}
							name="bike"
							id={selection.id}
							bind:checked={selection.checked}
						/>
						<label for={selection.id}
							>{selection.name} ({format.distance(selection.distance / 1000)})</label
						>
					</div>
				{/each}
			</fieldset>
		{/if}
		<button type="submit" disabled={!bikeSelected}>Register</button>
	</form>
{/if}

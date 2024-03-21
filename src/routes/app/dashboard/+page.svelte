<script>
	import * as format from '$lib/utils/format'
	import Text from '$lib/components/Text.svelte'
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>Dashboard | fettenkett</title>
	<meta name="description" content="fettenkett Dashboard" />
</svelte:head>

<section>
	<Text tag="h1" level="+4" weight="+3">Dashboard</Text>
	{#if $page.data.user}
		<Text tag="h2" level="+3" weight="+2">Your Bikes:</Text>
		<div class="bikes">
			{#each $page.data.user.bikes as bike}
				<div class="bike">
					{#if bike.image}
						<img src={bike.image} alt={bike.name} />
					{/if}
					<Text level="+1" weight="+2">{bike.name}</Text>
					<Text>{format.distance(bike.distance / 1000)}</Text>
				</div>
			{/each}
		</div>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--layout-spacing-0);
	}
	.bikes {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		width: min(30rem, 100%);
		gap: var(--layout-spacing-0);
	}

	.bike {
		background: var(--color-surface-secondary);
		display: flex;
		flex-direction: column;
		gap: var(--layout-spacing-0);
		align-items: center;
		padding: var(--layout-spacing-0);
	}

	img {
		width: 8rem;
		height: 8rem;
		display: block;
		margin: 0;
		object-fit: cover;
		border-radius: 50%;
	}
</style>

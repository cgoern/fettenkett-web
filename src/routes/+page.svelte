<script>
	import { signIn } from '@auth/sveltekit/client'
	import Button from '$lib/components/Button.svelte'
	import Text from '$lib/components/Text.svelte'
</script>

<svelte:head>
	<title>Home | fettenkett</title>
	<meta name="description" content="fettenkett Home" />
</svelte:head>

<div class="home">
	<div class="header">
		<svg class="logo" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M22 25.1562V19.212L13 13.125V6.01562L23.3 10.8298C25.9376 4.47354 32.1552 0 39.5 0C49.2202 0 57 7.83502 57 17.5V34H2V28.4375L22 25.1562ZM33 17.5V23H46V17.5C46 13.8756 43.1451 11 39.5 11C35.8549 11 33 13.8756 33 17.5ZM2 36H57V52.5C57 62.165 49.2202 70 39.5 70C29.7798 70 22 62.165 22 52.5V44.8438L2 41.5625V36ZM33 52.5V47H46V52.5C46 56.1244 43.1451 59 39.5 59C35.8549 59 33 56.1244 33 52.5Z"
			/>
		</svg>
		<Text tag="h1" level="+4" weight="+3">fettenkett</Text>
		<div class="claim">
			<Text level="+1" weight="0">by</Text>
			<Text level="+1" weight="+3">rammelpedal</Text>
		</div>
	</div>
	<Button on:click={() => signIn('strava')} iconLeading="strava" theme="strava"
		>Sign in with Strava</Button
	>
</div>

<style>
	.home {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--layout-spacing-plus-2);
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--layout-spacing-0);
	}

	.claim {
		display: flex;
		gap: var(--layout-spacing-minus-3);
	}

	.logo {
		display: block;
		fill: var(--color-foreground-primary);
		width: 4.375rem;
		height: 4.375rem;
	}
</style>

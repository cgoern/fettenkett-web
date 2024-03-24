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
	<div class="sign-in">
		<div class="header">
			<svg class="logo" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M22 25.1562V19.212L13 13.125V6.01562L23.3 10.8298C25.9376 4.47354 32.1552 0 39.5 0C49.2202 0 57 7.83502 57 17.5V34H2V28.4375L22 25.1562ZM33 17.5V23H46V17.5C46 13.8756 43.1451 11 39.5 11C35.8549 11 33 13.8756 33 17.5ZM2 36H57V52.5C57 62.165 49.2202 70 39.5 70C29.7798 70 22 62.165 22 52.5V44.8438L2 41.5625V36ZM33 52.5V47H46V52.5C46 56.1244 43.1451 59 39.5 59C35.8549 59 33 56.1244 33 52.5Z"
				/>
			</svg>
			<Text tag="h1" level="+5" weight="+3">fettenkett</Text>
			<div class="credits">
				<Text level="+1" weight="0">by</Text>
				<Text level="+1" weight="+3">rammelpedal</Text>
			</div>
		</div>
		<Button on:click={() => signIn('strava')} iconLeading="strava" theme="strava"
			>Sign in with Strava</Button
		>
	</div>
	<div class="claim">
		<Text level="+3" weight="+3" italic
			>Comprehensive bicycle maintenance service ensuring peak performance for every component.</Text
		>
	</div>
</div>

<style>
	.home {
		flex-grow: 1;
		display: grid;
		grid-template-columns: var(--home-grid-template-columns, 1fr);
		grid-template-rows: var(--home-grid-template-rows, 1fr 1fr);
	}

	@media (min-width: 880px) {
		.home {
			--home-grid-template-columns: repeat(2, 1fr);
			--home-grid-template-rows: 1fr;
			--home-trailing-clip-path: polygon(
				0 0%,
				100% 0%,
				100% 100%,
				0% 100%,
				var(--layout-spacing-plus-3) 50%
			);
			--home-trailing-text-align: center;
			--home-trailing-padding: var(--layout-spacing-plus-3) var(--layout-spacing-plus-3)
				var(--layout-spacing-plus-3) calc(var(--layout-spacing-plus-3) * 2);
		}
	}

	.sign-in {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--layout-spacing-plus-2);
		padding: var(--layout-spacing-plus-2);
	}

	.claim {
		background: var(--color-foreground-primary);
		color: var(--color-surface-primary);
		display: grid;
		grid-template-columns: minmax(auto, 480px);
		justify-content: center;
		align-items: center;
		text-align: var(--home-trailing-text-align, center);
		padding: var(
			--home-trailing-padding,
			calc(var(--layout-spacing-plus-2) * 2) var(--layout-spacing-plus-2)
				var(--layout-spacing-plus-2)
		);
		clip-path: var(
			--home-trailing-clip-path,
			polygon(0% 0%, 50% var(--layout-spacing-plus-2), 100% 0%, 100% 100%, 0% 100%)
		);
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--layout-spacing-0);
	}

	.credits {
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

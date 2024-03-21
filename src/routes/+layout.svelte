<script>
	import { signOut } from '@auth/sveltekit/client'
	import { page } from '$app/stores'
	import Button from '$lib/components/Button.svelte'

	import './../styles/app.css'
	import './../styles/colors.css'
	import './../styles/decoration.css'
	import './../styles/layout.css'
	import './../styles/typography.css'
	import './../styles/motion.css'
</script>

{#if $page.data.session && $page.data.user}
	<div>
		{#if $page.data.session.user?.image}
			<img src={$page.data.session.user.image} class="avatar" alt="User Avatar" />
		{/if}
		<Button on:click={() => signOut()}>Sign out</Button>
	</div>
{/if}

<slot />

<style>
	div {
		display: flex;
		gap: var(--layout-spacing-0);
		align-items: center;
		padding: 0 0 var(--layout-spacing-plus-2);
	}
	img {
		width: 5rem;
		height: 5rem;
		object-fit: cover;
		border-radius: 50%;
		margin: 0;
	}
</style>

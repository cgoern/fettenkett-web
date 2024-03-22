<script lang="ts">
	import { enhance } from '$app/forms'
	import { type Bike } from '@prisma/client'
	import * as format from '$lib/utils/format'
	import { page } from '$app/stores'
	import Text from '$lib/components/Text.svelte'
	import Button from '$lib/components/Button.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	import { signOut } from '@auth/sveltekit/client'

	export let data

	let bikes = data.bikes.map((bike: Bike) => ({
		id: bike.id,
		name: bike.name,
		distance: bike.distance,
		checked: true,
		thumbnail: '',
	}))

	$: bikesSelected = bikes.some((selection: HTMLInputElement) => selection.checked)

	function createThumbnail(event: Event, bikeId: string) {
		const input = event.target as HTMLInputElement

		if (input.files) {
			const file = input.files[0]
			const bikeIndex = bikes.findIndex((bike: Bike) => bike.id === bikeId)
			const reader = new FileReader()

			reader.onload = () => {
				bikes[bikeIndex].thumbnail = reader.result
			}

			reader.readAsDataURL(file)
		}
	}
</script>

<svelte:head>
	<title>Register | fettenkett</title>
	<meta name="description" content="fettenkett Register" />
</svelte:head>

<div class="register">
	{#if $page.data.session}
		<div class="header">
			<img src={$page.data.session.user?.image} class="avatar" alt="User Avatar" />
			<Text tag="h1" level="+4" weight="+3">Hi {$page.data.session.user?.name}!</Text>
			<Text tag="h2" level="+1" weight="+2">Select the bike(s) you want to take care of:</Text>
		</div>
		<div class="body">
			<form method="POST" action="?/register" use:enhance enctype="multipart/form-data">
				<input type="hidden" value={$page.data.session.user?.id} name="id" />
				{#if data.bikes}
					<fieldset name="bikes" class="selection">
						{#each bikes as bike}
							<div class="bike" class:hasThumbnail={bike.thumbnail !== ''}>
								<Checkbox
									value={JSON.stringify({ id: bike.id, name: bike.name, distance: bike.distance })}
									name="bike"
									bind:checked={bike.checked}
									meta={format.distance(bike.distance / 1000)}
								>
									{bike.name}
								</Checkbox>
								<div class="thumbnail">
									<label class="upload" for={`image-${bike.id}`}>
										<Text level="-1" weight="+1">Select Image</Text>
									</label>
									<input
										type="file"
										name="image"
										accept="image/*"
										disabled={!bike.checked}
										id={`image-${bike.id}`}
										on:change={(event) => createThumbnail(event, bike.id)}
									/>
									<img class="image" src={bike.thumbnail} alt="Thumbnail" />
								</div>
							</div>
						{/each}
					</fieldset>
				{/if}
				<Button type="submit" disabled={!bikesSelected} theme="main">Get started</Button>
			</form>
			<Button on:click={() => signOut()} theme="base">Logout</Button>
		</div>
	{/if}
</div>

<style>
	.register {
		--button-width: min(10rem, 100%);
		--button-align-self: center;

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

	.avatar {
		width: 7rem;
		height: 7rem;
		object-fit: cover;
		border-radius: 50%;
		margin: 0;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: var(--layout-spacing-0);
		width: min(30rem, 100%);
	}

	.selection {
		appearance: none;
		padding: 0;
		border: 0;
		background: var(--color-surface-secondary);
		border-radius: var(--decoration-corner-plus-1);
		box-shadow: 0 0 0 1px var(--color-outline);
	}

	.bike {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;

		&:not(:last-child) {
			box-shadow: inset 0 -1px 0 0 var(--color-outline);
		}
	}

	.thumbnail {
		display: flex;
		align-items: center;
		gap: var(--layout-spacing-minus-2);
		padding: 0 var(--layout-spacing-minus-2) 0 0;
	}

	.upload {
		--text-cursor: var(--register-upload-cursor, pointer);

		cursor: var(--register-upload-cursor, pointer);
		display: block;
		padding: var(--layout-spacing-minus-1);
		border-radius: var(--decoration-corner-0);
		background: var(--register-upload-background, var(--color-shade));
		color: var(--register-upload-color, var(--color-foreground-primary));
		box-shadow: inset 0 0 0 1px var(--color-outline);

		&:has(+ input[type='file']:disabled) {
			--register-upload-cursor: default;
			--register-upload-color: var(--color-foreground-quaternary);
			--register-upload-background: transparent;
		}
	}

	input[type='file'] {
		width: 0;
		height: 0;
		position: absolute;
		opacity: 0;
		visibility: hidden;
		appearance: none;
	}

	.image {
		margin: 0;
		display: block;
		width: 2rem;
		height: 2rem;
		object-fit: cover;
		transition-property: width, height;
		transition-duration: 0.1s;
		will-change: width, height;
		border-radius: 50%;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--layout-spacing-0);
	}
</style>

<script lang="ts">
	import Text from '$lib/components/Text.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import type { ButtonTheme, ButtonIcon } from './Button'

	export let iconLeading: ButtonIcon = undefined
	export let iconTrailing: ButtonIcon = undefined
	export let theme: ButtonTheme = 'base'
	export let disabled: boolean = false
</script>

<button on:click class={`button ${theme}`} {disabled} {...$$restProps}>
	<div class="overlay"></div>
	{#if iconLeading}
		<Icon name={iconLeading} />
	{/if}
	<div class="title">
		<Text level="-1" weight="+2"><slot /></Text>
	</div>
	{#if iconTrailing}
		<Icon name={iconTrailing} />
	{/if}
</button>

<style>
	.button {
		position: relative;
		appearance: none;
		border: 0;
		box-shadow:
			var(--button-box-shadow-position-1, 0 0 0.0625rem 0)
				var(--button-box-shadow-color-1, var(--color-black-5)),
			var(--button-box-shadow-position-2, 0 0.125rem 0.125rem -0.0625rem)
				var(--button-box-shadow-color-2, var(--color-black-5));
		margin: 0;
		background: var(--button-background);
		color: var(--button-color);
		cursor: var(--button-cursor, pointer);
		padding: var(--layout-spacing-0);
		border-radius: var(--button-border-radius, 0.3125rem);
		display: flex;
		justify-content: center;
		text-align: center;
		gap: var(--layout-spacing-minus-1);
		z-index: 1;
		width: var(--button-width, auto);
		transition-property: background, color, box-shadow;
		transition-duration: 0.1s;
		will-change: background, color, box-shadow;
		outline: none;
		align-self: var(--button-align-self, auto);

		&::before {
			content: '';
			position: absolute;
			inset: 0 0 0 0;
			background-image: linear-gradient(
				180deg,
				var(--button-before-gradient, var(--color-black-5), var(--color-black-10))
			);
			border-radius: calc(var(--button-border-radius, 0.3125rem) + 0.015625rem); /* Fix me */
			mix-blend-mode: var(--button-before-mix-blend-mode, normal);
			z-index: -2;
			display: var(--button-before-display, block);
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0.0625rem 0.0625rem 0.0625rem 0.0625rem;
			background: var(--button-background);
			border-radius: calc(var(--button-border-radius, 0.3125rem) - 0.0625rem);
			z-index: -2;
			display: var(--button-after-display, block);
		}

		&:disabled {
			--button-background: transparent;
			--button-color: var(--color-foreground-quaternary);
			--button-box-shadow-position-1: inset 0 0 0 0.0625rem;
			--button-box-shadow-color-1: var(--color-outline);
			--button-box-shadow-color-2: transparent;
			--button-before-display: none;
			--button-after-display: none;
			--button-cursor: default;
		}
	}

	@media (hover: hover) {
		.button:not(:disabled):hover {
			--button-overlay-opacity: 1;
		}
	}

	.title {
		opacity: var(--button-title-opacity, 1);
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--button-overlay-background);
		z-index: -1;
		mix-blend-mode: var(--button-overlay-mix-blend-mode, normal);
		opacity: var(--button-overlay-opacity, 0);
		transition-property: opacity;
		transition-duration: 0.1s;
		will-change: opacity;
		pointer-events: none;
		border-radius: var(--button-border-radius, 0.3125rem);
	}

	.main {
		--button-background: var(--color-main-solid);
		--button-color: var(--color-on-main-solid);
		--button-overlay-background: var(--color-black-25);
		--button-overlay-mix-blend-mode: soft-light;

		--button-before-mix-blend-mode: soft-light;
		--button-before-gradient: var(--color-black-30), var(--color-black-60);
		--button-box-shadow-color-1: var(--color-black-10);
		--button-box-shadow-color-2: var(--color-black-10);
	}

	.strava {
		--button-background: var(--color-strava-solid);
		--button-color: var(--color-on-strava-solid);
		--button-overlay-background: var(--color-black-5);
		--button-overlay-mix-blend-mode: plus-darker;

		--button-before-mix-blend-mode: plus-darker;
		--button-before-gradient: var(--color-black-5), var(--color-black-10);
		--button-box-shadow-color-1: var(--color-black-10);
		--button-box-shadow-color-2: var(--color-black-10);
	}

	.base {
		--button-background: var(--color-gray-solid);
		--button-color: var(--color-on-gray-solid);
		--button-overlay-background: var(--color-black-5);
	}

	@media (prefers-color-scheme: dark) {
		.button {
			--button-before-gradient: var(--color-white-10), var(--color-white-5);
		}

		.main {
			--button-overlay-background: var(--color-white-5);
			--button-overlay-mix-blend-mode: plus-lighter;
			--button-before-mix-blend-mode: plus-lighter;
			--button-box-shadow-color-1: var(--color-black-80);
			--button-box-shadow-color-2: var(--color-black-80);
		}

		.strava {
			--button-overlay-background: var(--color-white-10);
			--button-overlay-mix-blend-mode: plus-lighter;
			--button-before-mix-blend-mode: plus-lighter;
			--button-box-shadow-color-1: var(--color-black-80);
			--button-box-shadow-color-2: var(--color-black-80);
		}

		.base {
			--button-overlay-background: var(--color-white-5);
			--button-box-shadow-color-1: var(--color-black-70);
			--button-box-shadow-color-2: var(--color-black-70);
		}
	}
</style>

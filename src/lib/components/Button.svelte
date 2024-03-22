<script lang="ts">
	import Text from '$lib/components/Text.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import type { ButtonTheme, ButtonIcon } from './Button'

	export let iconLeading: ButtonIcon = undefined
	export let iconTrailing: ButtonIcon = undefined
	export let theme: ButtonTheme = 'base'
	export let disabled: boolean = false
	export let small: boolean = false
</script>

<button on:click class={`button ${theme}`} class:small {disabled} {...$$restProps}>
	<div class="overlay"></div>
	{#if iconLeading}
		<Icon name={iconLeading} />
	{/if}
	<div class="title">
		<Text level={small ? '-2' : '-1'} weight="+2"><slot /></Text>
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
			var(--button-box-shadow-position-1, 0 0 0.0625rem 0) var(--button-box-shadow-color-1),
			var(--button-box-shadow-position-2, 0 0.125rem 0.125rem -0.0625rem)
				var(--button-box-shadow-color-2);
		margin: 0;
		background: var(--button-background);
		color: var(--button-color);
		cursor: var(--button-cursor, pointer);
		padding: var(--button-padding, var(--layout-spacing-0) var(--layout-spacing-plus-1));
		border-radius: 100vh;
		display: flex;
		justify-content: center;
		text-align: center;
		gap: var(--button-gap, var(--layout-spacing-minus-1));
		z-index: 1;
		width: var(--button-width, auto);
		outline: none;
		align-self: var(--button-align-self, auto);

		&::before {
			content: '';
			position: absolute;
			inset: 0 0 0 0;
			background-image: linear-gradient(180deg, var(--button-before-gradient));
			border-radius: 100vh;
			mix-blend-mode: var(--button-before-mix-blend-mode, multiply);
			z-index: -2;
			display: var(--button-before-display, block);
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0.0625rem 0.0625rem 0.0625rem 0.0625rem;
			background: var(--button-background);
			border-radius: 100vh;
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
		mix-blend-mode: var(--button-overlay-mix-blend-mode, multiply);
		opacity: var(--button-overlay-opacity, 0);
		pointer-events: none;
		border-radius: 100vh;
	}

	.main {
		--button-background: var(--color-main-solid);
		--button-color: var(--color-on-main-solid);
		--button-overlay-background: oklch(var(--color-main-solid-oklch) / 25%);
		--button-before-gradient: oklch(var(--color-main-solid-oklch) / 15%),
			oklch(var(--color-main-solid-oklch) / 30%);
		--button-box-shadow-color-1: var(--color-black-10);
		--button-box-shadow-color-2: var(--color-black-10);
	}

	.strava {
		--button-background: var(--color-strava-solid);
		--button-color: var(--color-on-strava-solid);
		--button-overlay-background: oklch(var(--color-strava-solid-oklch) / 25%);
		--button-before-gradient: oklch(var(--color-strava-solid-oklch) / 25%),
			oklch(var(--color-strava-solid-oklch) / 50%);
		--button-box-shadow-color-1: var(--color-black-10);
		--button-box-shadow-color-2: var(--color-black-10);
	}

	.base {
		--button-background: var(--color-gray-solid);
		--button-color: var(--color-on-gray-solid);
		--button-overlay-background: oklch(var(--color-gray-solid-oklch) / 25%);
		--button-before-gradient: oklch(var(--color-gray-solid-oklch) / 35%),
			oklch(var(--color-gray-solid-oklch) / 70%);
		--button-box-shadow-color-1: var(--color-black-5);
		--button-box-shadow-color-2: var(--color-black-5);
	}

	.small {
		--icon-font-size: var(--typography-font-size-minus-2);
		--button-padding: var(--layout-spacing-minus-1) var(--layout-spacing-0);
		--button-gap: var(--layout-spacing-minus-2);
	}

	@media (color-gamut: p3) {
		.main {
			--button-overlay-background: color(display-p3 var(--color-main-solid-p3) / 25%);
			--button-before-gradient: color(display-p3 var(--color-main-solid-p3) / 15%),
				color(display-p3 var(--color-main-solid-p3) / 30%);
		}

		.strava {
			--button-overlay-background: color(display-p3 var(--color-strava-solid-p3) / 25%);
			--button-before-gradient: color(display-p3 var(--color-strava-solid-p3) / 35%),
				color(display-p3 var(--color-strava-solid-p3) / 70%);
		}

		.base {
			--button-overlay-background: color(display-p3 var(--color-gray-solid-p3) / 25%);
			--button-before-gradient: color(display-p3 var(--color-gray-solid-p3) / 35%),
				color(display-p3 var(--color-gray-solid-p3) / 70%);
		}
	}

	@media (prefers-color-scheme: dark) {
		.button {
			--button-before-mix-blend-mode: screen;
			--button-overlay-mix-blend-mode: screen;
		}

		.main {
			--button-overlay-background: oklch(var(--color-main-solid-oklch) / 35%);
			--button-before-gradient: oklch(var(--color-main-solid-oklch) / 50%),
				oklch(var(--color-main-solid-oklch) / 25%);
			--button-box-shadow-color-1: var(--color-black-80);
			--button-box-shadow-color-2: var(--color-black-80);
		}

		.strava {
			--button-overlay-background: oklch(var(--color-strava-solid-oklch) / 35%);
			--button-before-gradient: oklch(var(--color-strava-solid-oklch) / 70%),
				oklch(var(--color-strava-solid-oklch) / 35%);
			--button-box-shadow-color-1: var(--color-black-80);
			--button-box-shadow-color-2: var(--color-black-80);
		}

		.base {
			--button-overlay-background: oklch(var(--color-gray-solid-oklch) / 15%);
			--button-before-gradient: oklch(var(--color-gray-solid-oklch) / 40%),
				oklch(var(--color-gray-solid-oklch) / 20%);
			--button-box-shadow-color-1: var(--color-black-80);
			--button-box-shadow-color-2: var(--color-black-80);
		}
	}

	@media (prefers-color-scheme: dark) and (color-gamut: p3) {
		.main {
			--button-overlay-background: color(display-p3 var(--color-main-solid-p3) / 35%);
			--button-before-gradient: color(display-p3 var(--color-main-solid-p3) / 50%),
				color(display-p3 var(--color-main-solid-p3) / 25%);
		}

		.strava {
			--button-overlay-background: color(display-p3 var(--color-strava-solid-p3) / 35%);
			--button-before-gradient: color(display-p3 var(--color-strava-solid-p3) / 70%),
				color(display-p3 var(--color-strava-solid-p3) / 35%);
		}

		.base {
			--button-overlay-background: color(display-p3 var(--color-gray-solid-p3) / 15%);
			--button-before-gradient: color(display-p3 var(--color-gray-solid-p3) / 40%),
				color(display-p3 var(--color-gray-solid-p3) / 20%);
		}
	}
</style>

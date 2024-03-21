<script lang="ts">
	import Text from '$lib/components/Text.svelte'
	import Icon from '$lib/components/Icon.svelte'

	export let checked: boolean = false
	export let name: string
	export let value: string
	export let disabled: boolean = false
	export let meta: string | undefined = undefined

	function handleChecked() {
		checked = !checked
	}
</script>

<label class="checkbox" class:checked>
	<input
		class="control"
		type="checkbox"
		{value}
		{name}
		{disabled}
		{checked}
		on:change={handleChecked}
	/>
	<div class="indicator">
		<Icon name={checked ? 'checkmark-on' : 'checkmark-off'} />
	</div>
	<div class="label">
		<Text><slot /></Text>
	</div>
	{#if meta}
		<div class="meta">
			<Text level="-1">{meta}</Text>
		</div>
	{/if}
</label>

<style>
	.checkbox {
		display: flex;
		align-items: center;
		position: relative;
		padding: var(--layout-spacing-0);
		cursor: pointer;
		gap: var(--layout-spacing-0);

		&.checked {
			--checkbox-indicator-color: var(--color-main-solid);
		}

		&:active {
			--checkbox-indicator-scale: 0.8 0.8;
		}
	}

	@media (hover: hover) {
		.checkbox:not(.checked):hover {
			--checkbox-indicator-color: var(--color-main-solid);
		}

		.checkbox.checked:hover {
			--checkbox-indicator-color: var(--color-main-edge);
		}
	}

	.control {
		width: 0;
		height: 0;
		position: absolute;
		opacity: 0;
		visibility: hidden;
		appearance: none;
	}

	.indicator {
		color: var(--checkbox-indicator-color, var(--color-foreground-quaternary));
		scale: var(--checkbox-indicator-scale, 1 1);
		transition-property: scale;
		transition-duration: 0.1s;
		will-change: scale;
	}

	.label {
		flex-grow: 1;
	}

	.meta {
		color: var(--color-foreground-tertiary);

		--text-font-feature-settings: var(--typography-font-feature-settings), 'tnum' 1;
	}
</style>

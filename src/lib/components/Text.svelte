<script lang="ts">
	import type { TextLevel, TextWeight } from './Text'

	export let level: TextLevel = undefined
	export let weight: TextWeight = undefined
	export let tag: string = 'div'
</script>

<svelte:element this={tag} class="text" data-level={level} data-weight={weight} {...$$restProps}>
	<span class="inner">
		<slot />
	</span>
</svelte:element>

<style>
	.text {
		font-family: var(--typography-font-family);
		font-size: var(--text-font-size, var(--typography-font-size-0));
		font-weight: var(--text-font-weight, var(--typography-font-weight-soft));
		font-feature-settings: var(
			--text-font-feature-settings,
			var(--typography-font-feature-settings)
		);
		font-optical-sizing: auto;
		line-height: var(--text-line-height, var(--typography-line-height-0));
		padding-bottom: 1px;
		padding-top: 1px;
		letter-spacing: var(--typography-letter-spacing);
		margin: 0;
		display: block;
	}

	.text::before,
	.text::after {
		content: '';
		display: block;
		height: 0;
	}

	.text::before {
		margin-top: var(--typography-leading-trim);
	}

	.text::after {
		margin-bottom: var(--typography-leading-trim);
	}

	.text[data-weight='0'] {
		--text-font-weight: var(--typography-font-weight-0);
	}

	.text[data-weight='+1'] {
		--text-font-weight: var(--typography-font-weight-plus-1);
	}

	.text[data-weight='+2'] {
		--text-font-weight: var(--typography-font-weight-plus-2);
	}

	.text[data-weight='+3'] {
		--text-font-weight: var(--typography-font-weight-plus-3);
	}

	.text[data-level='-2'] {
		--text-font-size: var(--typography-font-size-minus-2);
		--text-line-height: var(--typography-line-height-minus-2);
	}

	.text[data-level='-1'] {
		--text-font-size: var(--typography-font-size-minus-1);
		--text-line-height: var(--typography-line-height-minus-1);
	}

	.text[data-level='0'] {
		--text-font-size: var(--typography-font-size-0);
		--text-line-height: var(--typography-line-height-0);
	}

	.text[data-level='+1'] {
		--text-font-size: var(--typography-font-size-plus-1);
		--text-line-height: var(--typography-line-height-plus-1);
	}

	.text[data-level='+2'] {
		--text-font-size: var(--typography-font-size-plus-2);
		--text-line-height: var(--typography-line-height-plus-2);
	}

	.text[data-level='+3'] {
		--text-font-size: var(--typography-font-size-plus-3);
		--text-line-height: var(--typography-line-height-plus-3);
	}

	.text[data-level='+4'] {
		--text-font-size: var(--typography-font-size-plus-4);
		--text-line-height: var(--typography-line-height-plus-4);
	}

	.inner {
		display: block;
	}
</style>

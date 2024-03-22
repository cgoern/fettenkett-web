<script lang="ts">
	import type { IconName } from './Icon'

	export let name: IconName = 'placeholder'
</script>

<div class="icon">
	<svg class="glyph">
		<use href={`#glyph-${name}`}></use>
	</svg>
</div>

<style>
	.icon {
		font-size: var(--icon-font-size, var(--typography-font-size-minus-1));
		font-family: var(--typography-font-family);
		align-items: center;
		display: flex;
		height: var(--icon-height, 1cap);
		justify-content: center;
		width: var(--icon-width, 1cap);
		pointer-events: none;
	}

	.glyph {
		fill: var(--icon-glyph-fill, currentColor);
		flex-grow: 0;
		flex-shrink: 0;
		height: var(--icon-glyph-height, 1.5rem);
		width: var(--icon-glyph-width, 1.5rem);
	}
</style>

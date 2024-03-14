<script lang="ts">
	import type { ButtonType } from './Button'

	export let type: ButtonType = 'button'
</script>

<button {type}>
	<slot />
</button>

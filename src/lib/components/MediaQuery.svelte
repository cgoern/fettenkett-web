<!-- <script lang="ts">
	import { onMount } from "svelte";

	export let query: string;

	let matchMedia: MediaQueryList;
	let matchMediaListener;
	let wasMounted = false;
	let matches = false;

	onMount(() => {
		wasMounted = true;
		return () => {
			removeActiveListener();
		};
	});

	$: {
		if (wasMounted) {
			removeActiveListener();
			addNewListener(query);
		}
	}

	function addNewListener(query) {
		matchMedia = window.matchMedia(query);
		matchMediaListener = v => matches = v.matches;
		matchMedia.addEventListener(matchMediaListener);
		matches = matchMedia.matches;
	}

	function removeActiveListener() {
		if (matchMedia && matchMediaListener) {
			matchMedia.removeListener(matchMediaListener);
		}
	}
</script>

<slot {matches} />
 -->

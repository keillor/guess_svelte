<script lang="ts">
	const { message, loading, dismissButton = false }: { message: string; loading: boolean, dismissButton? : boolean } = $props();
</script>

<div class="rounded-2xl bg-white p-3 font-bold shadow-2xl outline-4 outline-red-500">
	<span class="flex flex-row justify-center-safe items-center gap-2">
		{#if loading}
			<svg
				class="animate-spin fill-red-500"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				><path
					d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
					opacity=".25"
				/><path
					d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
					class="spinner_z9k8"
				/></svg
			>
		{/if}
		<span class="text-center text-lg text-red-500">{message}</span>
		<!-- {#if dismissButton}
			<button class='outline bg-gray-400 text-white rounded-md p-1 hover:bg-white hover:text-gray-400 transition-colors'>close</button>
		{/if} -->
	</span>
</div>

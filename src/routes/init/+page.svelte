<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { columns } from '$lib/gameElements/CardSetTable/columns';
	import DataTable from '$lib/gameElements/CardSetTable/data-table.svelte';
	const { data } = $props();
	console.log(data);
	let results = $state(data.sets);
</script>

<div class="flex w-full flex-col items-center">
	<DataTable data={results} {columns} />
</div>

<div class='flex flex-row justify-center'>
  <span>
    Want to see more? <Button
      onclick={async () => {
        results = await data.characterFetch.fetchPage(2);
        console.log('more data function');
      }}>Click to Refresh</Button
    >
  </span>
</div>

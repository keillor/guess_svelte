<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import type { QNA } from '$lib/models/question';
	import { backInOut, bounceIn, circIn, elasticInOut, sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	let { qna, disabled, children, drawerOpen = $bindable() }: {qna: QNA[], disabled: boolean, children: any, drawerOpen: any} = $props();

    let index = $derived(qna.length - 1);
	let selectedQna = $derived(qna[index]);
    
    function handleBack() {
        index = (index - 1 + qna.length) % qna.length;
    }

    function handleNext() {
        index = (index + 1 + qna.length) % qna.length;
    }
</script>

<Drawer.Root bind:open={drawerOpen}>
	<Drawer.Trigger {disabled}>{@render children()}</Drawer.Trigger>
	<Drawer.Content >
		<div class="mx-auto w-full max-w-full sm:max-w-sm md:max-w-md">
			<Drawer.Header>
				<Drawer.Title>Previously Answered Questions!</Drawer.Title>
				<Drawer.Description>
					{#if qna.length > 0}
						<div class='flex flex-col text-lg'>
							{#key selectedQna}
								<div class='flex flex-col' transition:slide>
									<span>#{index + 1}</span>
									<span>
										Question: {selectedQna.question}
									</span>
									<span>
										Answer: {selectedQna.answer}
									</span>
								</div>
							{/key}
						</div>
						<div class='grid grid-cols-2'>
							<Button type='button' onclick={handleBack} class='w-full bg-blue-600 hover:bg-blue-800 rounded-2xl p-3 text-2xl'>Back</Button>
							<Button type='button' onclick={handleNext} class='w-full bg-mint-500 hover:bg-mint-800 rounded-2xl p-3 text-2xl'>Next</Button>
						</div>
					{:else}
						<div>
							<p>No questions yet...</p>
						</div>
					{/if}
					
				</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Drawer.Close>Close</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>

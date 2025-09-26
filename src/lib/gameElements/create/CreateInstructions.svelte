<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import { createInstructionsVisible } from '$lib/stores/userPrefs.svelte';

	function handleCheckChange(checkValue: boolean) {
		if (checkValue) {
			createInstructionsVisible.set('true');
		} else {
			createInstructionsVisible.set('false');
		}
	}
</script>

<Drawer.Root open={$createInstructionsVisible === 'true' ? true : false}>
	<Drawer.Trigger
		class="w-full rounded-sm bg-mint-500 outline-1 transition-colors hover:bg-mint-800 hover:text-white"
		>Instructions</Drawer.Trigger
	>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title class="mb-6 rounded-2xl bg-mint-500 p-3 text-center text-3xl font-bold"
				>How to Create Your Character Set ✨</Drawer.Title
			>
			<Drawer.Description class="mb-6 text-lg leading-relaxed">
				Welcome! Use this page to build a unique set of 24 characters. Follow these simple steps to
				get started: 😉</Drawer.Description
			>
			<ScrollArea>
				<div>
					<div class="flex items-start gap-3">
						<Checkbox
							id="showInstructions"
							onCheckedChange={(value) => handleCheckChange(value)}
							checked={$createInstructionsVisible == 'true' ? true : false}
						/>
						<Label for="showInstructions">Show instructions next time</Label>
					</div>
					<div>
						<div class="space-y-6">
							<h2 class="rounded-2xl bg-purple-500 text-2xl font-semibold">
								1. Name Your Character Set 💅
							</h2>
							<p class="border-l-4 border-purple-500 pl-4">
								Start by giving your collection a name in the <span class="font-bold">Set Name</span
								> input field. This field cannot be left empty. 💁‍♀️
							</p>

							<h2 class="rounded-2xl bg-pink-500 text-2xl font-semibold">
								2. Customize Your Characters 🎨
							</h2>
							<div class="border-l-4 border-pink-500 pl-4">
								You have 24 identical character cards to customize. For each character:
								<ul class="mt-2 list-inside list-disc space-y-2">
									<li>
										<span class="font-bold">Give it a Name:</span> Enter a name for the character in
										the name input field.
									</li>
									<li>
										<span class="font-bold">Ensure Uniqueness:</span> All character names must be unique.
										If you enter a name that is already in use, the name input field will turn red to
										indicate a duplicate. Simply choose a new name to fix this. 🙄
									</li>
									<li>
										<span class="font-bold">Add an Image:</span> Each character must have a unique image.
										You can paste an image URL into the designated field to replace the default image.
										✨
									</li>
								</ul>
							</div>

							<h2 class="rounded-2xl bg-blue-500 text-2xl font-semibold">
								3. Finalizing Your Set 🎉
							</h2>
							<p class="border-l-4 border-blue-500 pl-4">
								Once you have completed all 24 characters with unique names and images, the button
								to save your set will become active. 😉
							</p>
						</div>

						<p class="mt-8 text-center text-sm text-pink-500">
							<span class="italic underline decoration-purple-500">Please note:</span> All character
							names must be unique and all characters must have an image that is not the default one.
							💅
						</p>
					</div>
				</div>
			</ScrollArea>
		</Drawer.Header>
		<Drawer.Footer>
			<Drawer.Close>Close</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>

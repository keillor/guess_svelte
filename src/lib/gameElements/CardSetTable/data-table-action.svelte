<script lang="ts">
 import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
 import { Button } from "$lib/components/ui/button/index.js";
 import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { resolve } from "$app/paths";
 
 let { id }: { id: string } = $props();
</script>
 
<DropdownMenu.Root>
 <DropdownMenu.Trigger>
  {#snippet child({ props })}
   <Button
    {...props}
    variant="ghost"
    size="icon"
    class="relative size-8 p-0"
   >
    <span class="sr-only">Open menu</span>
    <EllipsisIcon />
   </Button>
  {/snippet}
 </DropdownMenu.Trigger>
 <DropdownMenu.Content>
  <DropdownMenu.Group>
      <a href={resolve(`/init/${id}`)}>
          <DropdownMenu.Item>Play With Set</DropdownMenu.Item>
      </a>
      <a href={resolve(`/set/${id}`)}>
          <DropdownMenu.Item>View Set</DropdownMenu.Item>
      </a>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
        Copy Set Id
      </DropdownMenu.Item>
    
 </DropdownMenu.Content>
</DropdownMenu.Root>
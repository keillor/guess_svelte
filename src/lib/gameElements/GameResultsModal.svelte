<script lang="ts">
 import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
 import { buttonVariants } from "$lib/components/ui/button/index.js";
 let { isOpen = $bindable(), playerWon = $bindable() } = $props();
</script>
 
<AlertDialog.Root bind:open={isOpen}>
 <AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
  Show Dialog
 </AlertDialog.Trigger>
 <AlertDialog.Content>
  <AlertDialog.Header>
   <AlertDialog.Title>The results are in...</AlertDialog.Title>
   <AlertDialog.Description>
    {#if playerWon}
    You win!
    {:else}
    you lose!
    {/if}
   </AlertDialog.Description>
  </AlertDialog.Header>
  <AlertDialog.Footer>
   <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
   <AlertDialog.Action>Continue</AlertDialog.Action>
  </AlertDialog.Footer>
 </AlertDialog.Content>
</AlertDialog.Root>


<!-- TODO: implement WINNER / LOSER animation -->
<script lang="ts">
 import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
 import { Rainbow } from 'svelte-loading-spinners';
 import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>
 
<AlertDialog.Root>
 <AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
  Show Dialog
 </AlertDialog.Trigger>
 <AlertDialog.Content>
  <AlertDialog.Header>
   <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
   <AlertDialog.Description>
	<Rainbow color="#9aecc9" />
   </AlertDialog.Description>
  </AlertDialog.Header>
  <AlertDialog.Footer>
   <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
   <AlertDialog.Action>Continue</AlertDialog.Action>
  </AlertDialog.Footer>
 </AlertDialog.Content>
</AlertDialog.Root>
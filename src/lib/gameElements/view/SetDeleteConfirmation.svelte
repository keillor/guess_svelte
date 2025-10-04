<script lang="ts">
    const { children, setId } = $props();
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { CharacterSet } from "$lib/models/CharacterSet.svelte";
	import { toast } from "svelte-sonner";
	import ToastError from "../ToastError.svelte";
	import ToastWait from "../ToastWait.svelte";
	import { goto } from "$app/navigation";
    let open = $state(false);

    //CharacterSet.deleteFromFirebase()
    async function handleClick() {
        //TODO: implement handleClick for triggering a delete. Should close the modal when done;
        console.log(`set id: ${setId}`)
        const result = await CharacterSet.deleteFromFirebase(setId);
        if(!result) {
            toast.custom(ToastError, {
                componentProps: {
                    loading: false,
                    message: 'Error deleting set! Set not deleted'
                }
            })
        } else {
            toast.custom(ToastWait, {
                componentProps: {
					message: "Set deleted. Redirecting to home...",
					loading: false
				}
            })
        }
        open = false;
        setTimeout(() => {goto('/')}, 3000);
    }
</script>

<AlertDialog.Root bind:open={open}>
  <AlertDialog.Trigger>
    {@render children()}
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your character set from the server.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel class='rounded-2xl'>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={handleClick} class='bg-pink-500 hover:bg-pink-800 rounded-2xl'>Delete</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
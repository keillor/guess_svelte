import { writable } from "svelte/store";

// Controls if the instructions drawer on the creation page is visible on page load. 
// The default is true.
const storedCreateInstructionsVisible = localStorage.getItem('createInstructionVisible');
export const createInstructionsVisible = writable(storedCreateInstructionsVisible);
createInstructionsVisible.subscribe(value => {
    localStorage.setItem('createInstructionVisible', value === 'false' ? 'false' : 'true');
})
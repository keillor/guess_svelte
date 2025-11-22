import { collection, getDoc, doc, addDoc, deleteDoc, updateDoc, documentId } from "firebase/firestore";
import { Character } from "./character";
import { db } from "$lib/db/firebaseInit"; // Make sure you have your Firestore db exported here
import { user } from "$lib/db/auth.svelte";
import { toast } from "svelte-sonner";
import ToastWait from "$lib/gameElements/ToastWait.svelte";
import ToastError from "$lib/gameElements/ToastError.svelte";
import { goto } from "$app/navigation";
import { CreateCharacter } from "./CreateCharacter.svelte";
import { resolve } from "$app/paths";

export class CharacterSet {
    characters: Character[];
    setName: string;
    userId: string | undefined;
    docId: string | undefined;
    submitted: string | number;

    constructor(characters: Character[], setName: string) {
        this.characters = $state(characters);
        this.setName = $state(setName);
        this.userId = user.user?.uid;
        this.submitted = $state<string | number>('');
    }

    toJSON() {
        return {
            characters: this.characters.map((c) => c.toJSON()),
            setName: this.setName,
            userId: this.userId
        };
    }

    static fromJSON(data: any, docId: any): CharacterSet {
        // Assumes Character has a fromJSON method
        const characters = (data.characters || []).map((c: any) => CreateCharacter.fromJSON(c));
        const set = new CharacterSet(characters, data.setName);
        set.userId = data.userId;
        set.docId = docId;
        return set;
    }

    static async fromFirebase(id: string): Promise<CharacterSet | null> {
        const ref = doc(collection(db, "sets"), id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return null;
        return CharacterSet.fromJSON(snap.data(), snap.id);
    }
    
    static async deleteFromFirebase(id: string) {
        const ref = doc(collection(db, "sets"), id);
        try {
            await deleteDoc(ref);
        } catch {
            return false;
        }
        return true;
    }

    async saveToFirebase() {
        const data = CharacterSet.fromJSON(this.toJSON(), this.docId);
        const setsCol = collection(db, 'sets');
        const docRef = await addDoc(setsCol, data.toJSON());
        return docRef.id;
    }

    async updateInFirebase() {
        const data = CharacterSet.fromJSON(this.toJSON(), this.docId);
        const ref = doc(collection(db, "sets"), this.docId);
        const docRef = await updateDoc(ref, data.toJSON());
    }

    namesPresent() {
		for(let character of this.characters) {
			if(character.name.trim() == '') {
				return false;
			}
		}
	}

    namesUnique() {
        let names : any = {};
        for(let character of this.characters) {
            if(character.name.trim() in names) {
                return false;
            } else {
                names[character.name.trim()] = false;
            }
        }
        return true;
    }

    urlsPresent() {
        for(let character of this.characters) {
            if(character.url.href == 'http://localhost/') {
                return false;
            }
        }
        return true;
    }

    async handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		this.submitted = toast.custom(ToastWait, {
			componentProps: {
				loading: true,
				message: 'Submitting data...'
			}
		})
		if(this.setName.trim() == '') {
			toast.custom(ToastError, {
				componentProps: {
					message: 'Set name must not be empty',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
		}
		if(this.namesPresent() == false) {
			toast.custom(ToastError, {
				componentProps: {
					message:'All characters must have a name.',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
		}
        if(this.namesUnique() == false) {
            toast.custom(ToastError, {
				componentProps: {
					message:'All characters must have unique names.',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
        }

        if(this.urlsPresent() == false) {
            toast.custom(ToastError, {
				componentProps: {
					message:'All characters must have a valid photo.',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
        }
        let docId = '';
        this.userId = user.user.uid;
        try {
            docId = await this.saveToFirebase();
        } catch (e) {
            console.log(e);
            toast.custom(ToastError, {
                componentProps: {
                    message: "Whoops! There was an error saving your set...",
                    loading: false
                }
            })
            toast.dismiss(this.submitted);
            this.submitted = '';
            return;
        }
		// if checks pass, we can attempt to save to firebase.
        toast.dismiss(this.submitted);
        toast.custom(ToastWait, {
            componentProps: {
                message: "Set Saved!",
                loading: false
            }
        })
        this.submitted = '';
        goto(resolve(`/set/${docId}`))
	}

    async handleUpdate(e: SubmitEvent) {
		e.preventDefault();
		this.submitted = toast.custom(ToastWait, {
			componentProps: {
				loading: true,
				message: 'Submitting data...'
			}
		})
		if(this.setName.trim() == '') {
			toast.custom(ToastError, {
				componentProps: {
					message: 'Set name must not be empty',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
		}
		if(this.namesPresent() == false) {
			toast.custom(ToastError, {
				componentProps: {
					message:'All characters must have a name.',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
		}
        if(this.namesUnique() == false) {
            toast.custom(ToastError, {
				componentProps: {
					message:'All characters must have unique names.',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
        }

        if(this.urlsPresent() == false) {
            toast.custom(ToastError, {
				componentProps: {
					message:'All characters must have a valid photo.',
					loading: false
				}
			})
			toast.dismiss(this.submitted)
			this.submitted = '';
			return;
        }
        let docId = '';
        this.userId = user.user.uid;
        try {
            docId = await this.updateInFirebase();
        } catch (e) {
            console.log(e);
            toast.custom(ToastError, {
                componentProps: {
                    message: "Whoops! There was an error saving your set...",
                    loading: false
                }
            })
            toast.dismiss(this.submitted);
            this.submitted = '';
            return;
        }
		// if checks pass, we can attempt to save to firebase.
        toast.dismiss(this.submitted);
        toast.custom(ToastWait, {
            componentProps: {
                message: "Set Saved!",
                loading: false
            }
        })
        this.submitted = '';
        goto(resolve(`/set/${this.docId}`));
	}
}
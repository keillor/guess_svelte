import { collection, getDoc, doc, addDoc } from "firebase/firestore";
import { Character } from "./character";
import { db } from "$lib/db/firebaseInit"; // Make sure you have your Firestore db exported here
import { user } from "$lib/db/auth.svelte";
import { toast } from "svelte-sonner";
import ToastWait from "$lib/gameElements/ToastWait.svelte";
import ToastError from "$lib/gameElements/ToastError.svelte";
import { goto } from "$app/navigation";

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

    static fromJSON(data: any): CharacterSet {
        // Assumes Character has a fromJSON method
        const characters = (data.characters || []).map((c: any) => Character.fromJSON(c));
        const set = new CharacterSet(characters, data.setName);
        set.userId = data.userId;
        //BUG: set docId correctly...this is a dummy placeholder and WILL FAIL!!!
        //TODO: set docId correctly...this is a dummy placeholder and WILL FAIL!!!
        set.docId = data.docID
        return set;
    }

    static async fromFirebase(id: string): Promise<CharacterSet | null> {
        const ref = doc(collection(db, "sets"), id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return null;
        return CharacterSet.fromJSON(snap.data());
    }

    async saveToFirebase() {
        const data = CharacterSet.fromJSON(this.toJSON());
        const setsCol = collection(db, 'sets');
        const docRef = await addDoc(setsCol, data.toJSON());
        return docRef.id;
    }

    namesPresent() {
		for(let character of this.characters) {
			if(character.name.trim() == '') {
				return false;
			}
		}
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
        goto(`./set/${docId}`)
	}
}
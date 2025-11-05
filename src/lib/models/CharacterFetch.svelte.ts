import { collection, getDoc, getDocs, limit, query, startAfter } from "firebase/firestore";
import { CharacterSet } from "./CharacterSet.svelte";
import { db } from "$lib/db/firebaseInit";

export class CharacterFetch {
    lastVisible: any;
    limit: number;
    directoryRef: any;

    constructor(limit: number, collectionDir: string) {
        this.directoryRef = collection(db, collectionDir);
        this.limit = $state(limit);
        this.lastVisible = null;
    }

    firstFetch() {
        return this.fetch();
    }

    fetchNext() {
        const q = query(this.directoryRef, limit(this.limit), startAfter(this.lastVisible))
    }

    fetchPrevious() {
    }

    async fetch() {
        const q = query(this.directoryRef, limit(this.limit))
        const querySnapshot = await getDocs(q);
        this.lastVisible = querySnapshot.docs.at(querySnapshot.docs.length - 1);
        let results = []
        querySnapshot.forEach((c) => {
            results.push(c.data())
            results.at(results.length - 1)['docId'] = c.id;
        });
        return results;
        //return querySnapshot.docs;

    }
}
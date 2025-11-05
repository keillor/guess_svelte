import { collection, getDoc, getDocs, limit, query, startAfter } from "firebase/firestore";
import { CharacterSet } from "./CharacterSet.svelte";
import { db } from "$lib/db/firebaseInit";

export class CharacterFetch {
    lastVisible: any;
    limit: number;
    directoryRef: any;
    // cache of page -> lastVisible doc snapshot for that page
    pageCursors: Map<number, any>;
    // track what page we are currently on for fetchNext
    currentPage: number;

    constructor(limit: number, collectionDir: string) {
        this.directoryRef = collection(db, collectionDir);
        this.limit = $state(limit);
        this.lastVisible = null;
        this.pageCursors = new Map();
        this.currentPage = 0;
    }

    firstFetch() {
        return this.fetch();
    }

    async fetchNext() {
        // fetch the next page using the last visible snapshot as a cursor
        const q = this.lastVisible ? query(this.directoryRef, limit(this.limit), startAfter(this.lastVisible)) : query(this.directoryRef, limit(this.limit));
        const querySnapshot = await getDocs(q);
        this.lastVisible = querySnapshot.docs.at(querySnapshot.docs.length - 1);
        this.currentPage = (this.currentPage || 0) + 1;
        this.pageCursors.set(this.currentPage, this.lastVisible);

        let results: any[] = [];
        querySnapshot.forEach((c) => {
            const d = c.data() as any;
            d.docId = c.id;
            results.push(d);
        });
        return results;
    }

    async fetchPage(n: number) {
        if (n < 1) throw new Error('page numbers are 1-based');

        // If we already have the cursor for page n-1, use it
        let cursor = null;
        if (n > 1 && this.pageCursors.has(n - 1)) {
            cursor = this.pageCursors.get(n - 1);
        }

        // If we don't have the cursor, progressively fetch pages until we do.
        // This avoids using offset (which is inefficient). For large jumps consider a server-side index.
        let startAtPage = 1;
        if (this.pageCursors.size > 0) {
            startAtPage = Math.max(...Array.from(this.pageCursors.keys())) + 1;
        }

        if (!cursor && n > 1) {
            // fetch from the last known page up to n-1
            let tempCursor = this.pageCursors.get(startAtPage - 1) || null;
            for (let p = startAtPage; p <= n - 1; p++) {
                const q = tempCursor ? query(this.directoryRef, limit(this.limit), startAfter(tempCursor)) : query(this.directoryRef, limit(this.limit));
                const snap = await getDocs(q);
                tempCursor = snap.docs.at(snap.docs.length - 1) || null;
                this.pageCursors.set(p, tempCursor);
            }
            cursor = this.pageCursors.get(n - 1) || null;
        }

        const q = cursor ? query(this.directoryRef, limit(this.limit), startAfter(cursor)) : query(this.directoryRef, limit(this.limit));
        const querySnapshot = await getDocs(q);
        this.lastVisible = querySnapshot.docs.at(querySnapshot.docs.length - 1);
        this.pageCursors.set(n, this.lastVisible);
        this.currentPage = n;

        let results: any[] = [];
        querySnapshot.forEach((c) => {
            const d = c.data() as any;
            d.docId = c.id;
            results.push(d);
        });
        return results;
    }

    async fetch() {
        const q = query(this.directoryRef, limit(this.limit))
        const querySnapshot = await getDocs(q);
        this.lastVisible = querySnapshot.docs.at(querySnapshot.docs.length - 1);
        let results: any[] = [];
        querySnapshot.forEach((c) => {
            const d = c.data() as any;
            d.docId = c.id;
            results.push(d);
        });
        return results;
        //return querySnapshot.docs;

    }
}
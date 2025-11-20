# Guest Who 🙋‍♂️

A guessing game written in Svelte 5 and uses Firebase Firestore to sync game state across clients.
Guest Who is a single-page-application that can be hosted on a static server. 

## Requirements 📋

- Current version of Node (>=24.10.0)
- Firebase Firestore data.

> Note: Users must sign in with a Google Account.

## Getting Started 🏁

- Clone this repository
- `cd` into reppo and `npm install`
- Edit the file at: `src->lib->db->firebaseInit.ts`
    - Replace firebaseConfig object with your own data.
- `npm run dev`

## Implemented Features 🤠

- Pick a character for an opponet to guess.
- Decide turn order
- Ask and answer questions in real time with another player.
- Create a custom set of characters.
    - duplicate name detection
    - edit a set
    - copy a set
    - delete a set
- Join a game
    - via code
    - via link
- Lots of other goodies :)
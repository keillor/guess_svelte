import { expect, test } from "vitest";
import { GuessWhoGame } from "./guessWho.svelte";
import { login } from "./db/auth.svelte";

test('GuessWhoGame: ask first question', async () => {
    await login()
    const game = await GuessWhoGame.loadFromFirestore('Td6LeEV17V76350VCEdI')
    expect(game?.gameId).toBe('Td6LeEV17V76350VCEdI');
})
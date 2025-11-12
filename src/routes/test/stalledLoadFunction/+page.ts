export async function load() {
    await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000)
    })
    return {};
}
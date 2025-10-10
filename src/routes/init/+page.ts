export async function load({ url }) {
    // return a plain object of query params: { a: '1', b: '2' }
    const paramsObj = Object.fromEntries(url.searchParams.entries());
    console.log(paramsObj);
    return {
        url: paramsObj
    };
}
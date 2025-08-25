export class Character {
    constructor(name: string, url: string) {
        this.name = name;
        this.url = new URL(url)
    }
    name: string;
    url: URL;
}
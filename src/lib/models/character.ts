export class Character {
    name: string;
    url: URL;

    constructor(name: string, url: string | URL) {
        this.name = name;
        this.url = typeof url === 'string' ? new URL(url) : url;
    }

    toJSON() {
        return {
            name: this.name,
            url: this.url.href
        };
    }

    static fromJSON(data: any): Character {
        return new Character(data.name, data.url);
    }
}
export class CreateCharacter {
    name: string;
    url: URL;

    constructor(name: string, url: string | URL) {
        this.name = $state(name);
        this.url = $state(new URL(url));
    }

    toJSON() {
        return {
            name: this.name,
            url: this.url.href
        };
    }

    static fromJSON(data: any): CreateCharacter {
        return new CreateCharacter(data.name, data.url);
    }
}
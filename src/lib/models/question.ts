export class QNA {
    question: string;
    answer: string;

    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }

    toJSON() {
        return {
            question: this.question,
            answer: this.answer,
        };
    }

    static fromJSON(data: any): QNA {
        return new QNA(data.question, data.answer);
    }
}
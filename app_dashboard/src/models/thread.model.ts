import { Thread } from "../services/blue-delta-sdk/index";

export class ThreadModel implements Thread {
    constructor(
        public threadId: string,
        public name?: string,
        public thumb?: string,
        public layer?: string
    ){}
}
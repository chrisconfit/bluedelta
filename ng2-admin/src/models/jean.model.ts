import { Measurement, Button, Fabric, Thread, Jean } from "../services/blue-delta-sdk/index";



export class JeanModel implements Jean {
    constructor(
        public jeanId: string,
        public measurement?: Measurement,
        public thread?: Thread,
        public fabric?: Fabric,
        public Button?: Button
    ){}
}
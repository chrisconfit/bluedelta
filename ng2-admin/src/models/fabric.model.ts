import { Fabric } from "../services/blue-delta-sdk/index";

export class FabricModel implements Fabric {
    constructor(
        public fabricId: string,
        public name?: string,
        public weight?: number,
        public description?: string,
        public materials?: string,
        public supplier?: string
    ){}
}
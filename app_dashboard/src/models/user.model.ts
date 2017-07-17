import { User, Jean } from "../services/blue-delta-sdk/index";
import { Address } from "../services/blue-delta-sdk/model/Address";

export class UserModel implements User {
    identityId: string
    email?: string;
    phoneNumber?: string;
    addresses?: Address[];
    jeans?: Jean[];

    constructor(
        identityId: string,
        email?: string,
        phoneNumber?: string,
        addresses?: Address[],
        jeans?: Jean[]
        ) {
            this.identityId = identityId;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.addresses = addresses;
            this.jeans = jeans;
        }
}
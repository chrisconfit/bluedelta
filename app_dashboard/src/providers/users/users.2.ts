import { Injectable } from '@angular/core';
import { User, Address } from "../../services/blue-delta-sdk/index";
import {Jean} from "../orders/orders.2";

@Injectable()
export class UsersProvider {

    constructor() {

    }

    userAddressUnique(user: User, address: Address): boolean {
        let res = (user.addresses.indexOf(address) === -1);
        return res;
    }

    addAddressToUserAddresses(user: User, newAddress: Address, uniqueAddressValidator): void {
        if (!uniqueAddressValidator(user, newAddress)) return;
        user = { ...user, addresses: [ user.addresses, newAddress ] };
    }

    validEmailFormat(emailAddress: string): boolean {
        function hasAtSymbol(emailToTest: string): boolean {
            return (emailToTest.split('').indexOf('@') !== -1);
        }
        function hasValidExtension(emailToTest: string): boolean {
            return /(\.[a-zA-Z0-9]{1,5})/.test(emailToTest);
        }
        return (hasAtSymbol(emailAddress) && hasValidExtension(emailAddress));
    }

    setUserEmail(user: User, newEmail: string, emailValidator): void {
        if (!emailValidator(newEmail)) return;
        user = { ...user, email: newEmail };
    }

    setUserFirstName(user: User, newFirstName: string): void {
        user = { ...user, firstName: newFirstName };
    }

    setUserLastName(user: User, newLastName: string): void {
        user = { ...user, lastName: newLastName };
    }

    setUserGender(user: User, newGender: string): void {
        user = { ...user, gender: newGender };
    }

    setUserReferral(user: User, newReferral: string): void {
        user = { ...user, referral: newReferral };
    }

    setUserVendorsUsed(user: User, newVendorsUsed: string): void {
        user = { ...user, vendorsUsed: newVendorsUsed };
    }

    setUserPhoneNumber(user: User, newPhoneNumber: string): void {
        user = { ...user, phoneNumber: newPhoneNumber };
    }

    //This won't be needed since we're going to reference a users jeans from orders... TBD
    addJeanToUserJeans(user: User, newJean: Jean): void {

    }

}


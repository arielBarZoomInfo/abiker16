import { CreditCardModel } from "./credit-card.model";


export class UserModel {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    creditCard?:CreditCardModel;
}
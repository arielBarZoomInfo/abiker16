import { IUserModel } from "@app/_models";
export interface ILogin{
    hasUser: boolean;
    authUser: boolean;
    isCard:boolean;

}
export interface  IPersistency{
    get ready():boolean;
    open():boolean;
    close():void;

    setUser$(user:IUserModel):Promise<boolean>;
    //updateUser$(user:UserModel):Promise<boolean>;
    getUser$(sysname: string) : Promise<IUserModel | undefined>;
    deleteUser$(sysname: string): Promise<boolean>;
    listUsers$(): Promise<IUserModel[]>;
    //  hasUser$(sysname: string) : Promise<boolean>;
    login$(sysname: string,password: string ) : Promise<ILogin>;
       // lastUser: UserModel |  undefined;

    // get lastUser() : UserModel | undefined;   
    // set lastUser(user:UserModel | undefined);
};
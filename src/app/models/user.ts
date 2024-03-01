export class User {
    username?: string;
    password?: string;
    email?:string;
    isLoggedIn?:boolean = false;

    constructor(username?: string, password?: string, email?:string , 
        isLoggedIn?: boolean){
        this.username = username;
        this.password = password;
        this.email = email;
        this.isLoggedIn = isLoggedIn;
    }
}
// export interface User {
//     id: number;
//     userName: string;
//     isAdmin: boolean;
// }
import { Injectable } from '@angular/core';
import {  collection, deleteDoc, doc, getDoc,getDocs,serverTimestamp,setDoc, updateDoc } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { UserModel, IUserModel } from '@app/_models/user.model';
import {ILogin, IPersistency} from './persistency.interface';
import { NonNullAssert } from '@angular/compiler';
// ///bikebox2023
// const firebaseConfig = {
//   apiKey: "AIzaSyCG2ZvGHgPFgf8xehvTmdscMv0k3HF1M9I",
//   authDomain: "bikebox2023.firebaseapp.com",
//   projectId: "bikebox2023",
//   storageBucket: "bikebox2023.appspot.com",
//   messagingSenderId: "128992210775",
//   appId: "1:128992210775:web:6f600ca4cc33cf6bfa5812",
//   measurementId: "G-S10ZFQCE6S"
// };


///biker-16
const firebaseConfig = {
  apiKey: "AIzaSyC6LXDZz3KTnzxBJMye4CjjgOC28HZcjiM",
  authDomain: "biker16-a7653.firebaseapp.com",
  projectId: "biker16-a7653",
  storageBucket: "biker16-a7653.appspot.com",
  messagingSenderId: "1008785288285",
  appId: "1:1008785288285:web:0e13d525f9c5fdd50bf1b4"
};


interface IUserNet{
    password: string;
    name: string;
    email:string;
    phone:string;
    //!!! tokef in format DD/YY
    tokef:string;
    
    token : string ;
    date:number;
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements  IPersistency{

  wasOpen:boolean = false;

  private fireapp?: FirebaseApp;
  private firestore ?: Firestore;
  public lastUser: UserModel |  undefined;

  get ready():boolean{return !!this.firestore}

  constructor() {

  }
  // Sync Methoid
  open():boolean{
    // let c = serverTimestamp() 
     if(!this.wasOpen){
      // debugger;
       this.wasOpen = true;
       try { 
         // Initialize Firebase
            this.fireapp  = initializeApp(firebaseConfig);
            this.firestore = getFirestore(this.fireapp);
          // Initialize Cloud Firestore and get a reference to the service
          console.log(this.firestore?.toJSON ?? 'error FireBase');
        } catch (error) {

         //this.store =undefined;
         console.error(error);
         
       }
     }
 
     return !!this.firestore ;
  }
 
  close() {
    this.lastUser = undefined;
  }
  




  async setUser$(iuser:IUserModel):Promise<boolean>{
    if(!this.ready){
      console.error( `Firebase isn't connected`);
      return false;
    }
    const user = new UserModel(iuser);
    let ret:boolean=user.isNew;
    if(this.firestore){
      const docRef0 = doc(this.firestore, "users", user.sysname);
     
      if(user.updated == 0){
        
        let d =  await setDoc(docRef0 , {
          sysname: user.sysname,
          password: user.password,
          name: user.name,
          email:user.email,
          phone:user.phone,
          //!!! tokef in format DD/YY
          tokef:user.tokef,
          updated: serverTimestamp()
      
        });
      //  user.updated = new Date().getTime();
        
      } else {

           ///!!!!!!!!!!!  set update 
        await updateDoc(docRef0 , {
          // sysname: user.sysname,
          password: user.password,
          //  name: user.name,
          email:user.email,
          phone:user.phone,
        //!!! tokef in format DD/YY
          tokef:user.tokef,
          updated: serverTimestamp()
      
        });
    
        user.updated = new Date().getTime();
        this.lastUser = user as UserModel;
      }
      
    }
    
    return ret;
  }
 
  async getUser$(sysname: string) : Promise<UserModel | undefined>{
    //debugger;
    if(!this.ready){
      console.error( `Firebase isn't connected`);
      return undefined;
    }
    //return last stored user
    if(this?.lastUser?.sysname == sysname) return this?.lastUser;
    let iuser : UserModel | undefined = undefined;
    if(this.firestore){
      const docRef = doc(this.firestore, "users",sysname);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        iuser =  new UserModel(docSnap.data());
        // console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.error("No such document!");
      }
    } 
    this.lastUser = iuser;
    return iuser;
  }

  async deleteUser$(sysname: string) : Promise<boolean>{
    //debugger;
    if(!this.ready){
      console.error( `Firebase isn't connected`);
      return false;
    }
    //return last stored user
    
    this.lastUser = undefined;
    if(this.firestore){
      const docRef = doc(this.firestore, "users",sysname);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        await deleteDoc(docRef);
        console.error(`${sysname}  document deleted`);
        return true;
        
      } else {
        // docSnap.data() will be undefined in this case
        console.error(`No ${sysname}  document!`);
      }
    } 
   
    return false;
  }

 
  async login$(sysname: string, password: string): Promise<ILogin> {
    if(!this.ready){
      console.error( `Firebase isn't connected`);
      return {hasUser:false,authUser:false,isCard:false};
    }

    const user = await this.getUser$(sysname) ;
    const hasUser: boolean = !!user;
    const authUser: boolean = user?.password === password;

    return {hasUser,authUser,isCard:false};
  }

 
  async listUsers$(): Promise<UserModel[]> {
    //debugger;
    if(!this.ready){
      console.error( `Firebase isn't connected`);
      return[];
    }
   
    let ret:UserModel[] = [];
    if(this.firestore){
      const collRef = await collection(this.firestore,'users');
      const collSnap = await getDocs(collRef);
      ret = collSnap.docs.map(
        doc=>{ 
          const u = new UserModel(doc.data());
          const ui = u as UserModel;
          return u;
        })
  
   }
    
     return ret;
  }


  // get Now():string{
  //   const d = new Date();
  //   return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()} `+
  //   `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  // }


}



import { Injectable } from '@angular/core';
import { DocumentData, doc, getDoc,setDoc } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { UserModel, WideUserModel } from '@app/_models/user.model';
const firebaseConfig = {
  apiKey: "AIzaSyC6LXDZz3KTnzxBJMye4CjjgOC28HZcjiM",
  authDomain: "biker16-a7653.firebaseapp.com",
  projectId: "biker16-a7653",
  storageBucket: "biker16-a7653.appspot.com",
  messagingSenderId: "1008785288285",
  appId: "1:1008785288285:web:0e13d525f9c5fdd50bf1b4"
};

interface IUserFire{
    password: string;
    name: string;
    email:string;
    //!!! tokef in format DD/YY
    tokef:string;
    
    token : string ;
    date:Date;
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  wasOpen:boolean = false;

  app?: FirebaseApp;
  store! : Firestore;
  get isStore() {return !!this.store}

  constructor() { }

  async createDb(){
    if(!this.wasOpen){
      this.wasOpen = true;
      try { 
        // Initialize Firebase
        this.app  = initializeApp(firebaseConfig);


        if(this.app){
          this.store = getFirestore(this.app);
        }
        // Initialize Cloud Firestore and get a reference to the service
        console.log(this.store?.toJSON ?? 'error FireBase');
        
      } catch (error) {

        //this.store =undefined;
        console.error(error);
        
      }
    }

    return !!this.store ;
  }

  // get storeJson() {return this.store?.toJSON;}
  //  getDoc(){
  //   let docRef = doc(this.store, "cities", "SF");
  //   const docSnap = await getDoc(docRef);
    
    
  // }

  count:number = 0;
  async storeUser(user:UserModel){
    await this.createDb();
   const doc0 = doc(this.store, "users", user.sysName);
    await setDoc(doc0 , {
      sysName: user.sysName,
      password: user.password,
      name: user.name,
      email:user.email,
      //!!! tokef in format DD/YY
      tokef:user.tokef,
      date: this.Now
  
    });
    return doc.toString();
    
  }
  async retrieveUser(sysName: string) {
    debugger;
    await this.createDb();
    const docRef = doc(this.store, "users",sysName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.error("No such document!");
      return {};
    }
    
     return docSnap.data();
     
   }
 
 

  get Now():string{
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()} `+
    `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  }


}



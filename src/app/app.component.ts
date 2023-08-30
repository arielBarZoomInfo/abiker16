import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersAccountService, GUser ,GPage} from './_services';
import { UserModel } from './_models';
import { GKeybLanGlobal  as G} from '@app/_globals/keyb-lang.global';
import { TLangNames } from './_interfaces/interfaces';
import { Subscription, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { epg  } from '@app/_interfaces/interfaces';
import { environment } from '@environments/environment';
import { FirebaseService } from './_services/firebase.service';
import { Firestore, doc, getDoc } from 'firebase/firestore';
 



@Component({ 
    selector: 'app-root', 
    templateUrl: 'app.component.html' 
})
export class AppComponent  implements OnInit, OnDestroy{
    env=environment;
    epg = epg;
   // get user() {return GUser};
    user:UserModel | undefined;
    get page() {return GPage};
    ref = G.ref;
    readonly subs:Subscription[] = [];

    constructor(private userSvc: UsersAccountService,
        private fire:FirebaseService,
        private http: HttpClient ) {
        this.subs.push(this.userSvc.user$.subscribe(x => this.user = x));
    }

    
  
    public get IsKeyb() : boolean {
        return  G.KeyboardVisible;
    }
    public set IsKeyb(v : boolean) {
        G.KeyboardVisible = v;
    }
    

      ngOnDestroy(): void {
        this.subs.forEach(u=>u.unsubscribe());
        
    }
    ngOnInit(): void {
        this.IsKeyb = true;
        
    }

    async gotoExit$() {
       
        await this.userSvc.gotoExit$();
    }

    toShowKeyb(){
        if(!this.IsKeyb)
            this.IsKeyb = true;
    }
    toHideKeyb(){
        if(this.IsKeyb)
            this.IsKeyb = false;

    }
    setLang(lang:TLangNames){
        G.setLang(lang);
    }
  

    async toFireSave(){
      
       
        if(!this.fire.wasOpen){
            const ft = await this.fire.createDb();
          
            console.log(this.fire.store?.toJSON ?? 'error FireBase');
    
        }
        if(!!this.fire.store){
            let avi = this.AviKohen;
            let str = await this.fire.storeUser(avi);
            console.log(str);
          

         }

    
    }    
    async toFireGet(){
        const ft = await this.fire.createDb();
       
    
        const docRef = doc(this.fire.store, "cities", "SF");
        const docSnap = await getDoc(docRef);

       
       
        if(!this.fire.wasOpen){
            const ft = await this.fire.createDb();
          
            console.log(this.fire.store?.toJSON ?? 'error FireBase');
    
        }
        if(!!this.fire.store){
              
            let data = await this.fire.retrieveUser(this.AviKohen.sysName);
            console.log(data);
         }

    
    }
    get AviKohen(){
        let m:any = {};
                
     
        m.firstName='Avi' ;
        m.lastName = 'Cohen';
        m.sysName = 'avi1cohen';
        m.password = '11111111';
        m.passport = '999999998';
        m.email = 'avi1cohen@gmail.com';
        m.phone = '05451111111';
        m.address = 'Hahistadrut 1/1 Petah Tikva  , Israel';
        m.ravkav = '111';
        m.imagreeTerms = true;
        m.imagreePolicy = true;
        let wideUser: UserModel =  new UserModel(m);
        return wideUser;
    
      }
    async toGo(){
        try {
          //  debugger;
            // const data:any[]  = await lastValueFrom(this.http.get<any[]>('assets/employees.json', { responseType:'json' }));

            //      console.log(data)
            
        } catch (error) {
            console.error(error);
        }
      //  this.save(new Date().toTimeString(),'/kuku.txt');
      

    }
    // save(text: string, filename:string) {
    //     const blob  = new Blob([text], { type: 'text/plain;charset=utf-8' });
       
    //     try {
    //       this.fs.save(blob, filename);
    //     }
    //     catch (e)
    //     {
    //       alert(e);
    //     }
    // }
    save( data:string,filename:string) {
        const nav = (window.navigator as any);
        const blob = new Blob([data], {type: 'text'});

        if(nav.msSaveOrOpenBlob) {
            (window.navigator as any).msSaveBlob(blob, filename);
        }
        else{
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }

}
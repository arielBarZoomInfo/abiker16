import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { first } from 'rxjs/operators';

import { UsersAccountService, AlertService } from '@app/_services';
import { GKeybLanGlobal as G } from '../../_globals/keyb-lang.global';
import { UserModel } from '@app/_models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html' 
})
export class LoginComponent implements OnInit ,AfterViewInit,OnDestroy{
    form!: FormGroup;
    loading = false;
    submitted = false;
    private subs:Subscription[] = [];
    constructor(
        private formBuilder: FormBuilder,
        // private route: ActivatedRoute,
        // private router: Router,
        private userSvc: UsersAccountService,
        private alertSvc: AlertService
    ) {
        this.subs.push(
            G.KeyboardEnter$.subscribe(intr=>this.onExitInput(intr))
          )
      
     }
      ngAfterViewInit(): void {
        //throw new Error('Method not implemented.');
    }

    ngOnInit() {
        this.alertSvc.clear();
        this.form = this.formBuilder.group({
            sysname: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.subs.forEach(subs=>subs.unsubscribe());
    }

     onExitInput(sysname:string){
            console.warn(`LoginComponent::onExitInput(${sysname})`);
    }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    get sysUser() { return this.f['sysUser'].value.toString(); }
    get password() { return this.f['password'].value.toString(); }

    async onSubmit() {
        
        this.loading = true;
        this.alertSvc.clear();
        //debugger;
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid ) {
            return;
        }
        this.loading = true;
        await this._onSubmit$();   
        this.loading = false;  
        this.toUpdateCard = false;
        this.toRegistrate = false;
             
                   
  
    }
    toUpdateCard: boolean = false;
    toRegistrate: boolean = false;
    toLogout:boolean = true;
 
    async _onSubmit$(){
       // debugger;
        this.toUpdateCard = false;
        this.toRegistrate = false;
        try {
            
            const sysname = this.f['sysname'].value;
            const password =  this.f['password'].value;
            const iuser = await this.userSvc.getUser$(sysname);
            const user = !!iuser ? new UserModel(iuser) : undefined;
            if(!user){
                //TBD to registrate
                this.alertSvc.warn(
                    `Your account isn't exists \n You have to registrate it`,
                    {autoClose:true,keepAfterRouteChange:false});
                this.toRegistrate = true;
                let usr = new UserModel();
                usr.sysname = sysname;
                usr.password = password;
              //  this.userSvc.saveUser$(usr);
                
                
                await this.userSvc.gotoRegistrate$();
                return;
               
            } else  if(user?.password !== password){
                this.alertSvc.warn(
                    `Did you forget the password?`,
                    {autoClose:true});
                    await this.userSvc.gotoRegistrate$();
                   //TBD retirieve the password .... 

            } else {
                if(!user.IsAuthorized){
                    user.token = 'OK';
                }

                this.toUpdateCard = true;
              //  if(!user.IsCardValid) {
                    this.toUpdateCard = true;
                    this.alertSvc.warn(
                        `You may to update paying source`,
                        {autoClose:true,keepAfterRouteChange:false});
                 await this.userSvc.gotoCreditCard$();
                 return;
            }
                    
                    //await this.userSvc.gotoRegistrate$();

                // }
                // else {
                //     this.alertSvc.info(`Your account OK`,
                //         {autoClose:true,keepAfterRouteChange:false});
                // }


           // }

                         
   
        } catch (error) {
            console.error(error);
             // get return url from query parameters or default to home page
            // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            // this.router.navigateByUrl(returnUrl);
        }
        this.loading = false;

    }

    async gotoRegistrate(){
        this.alertSvc.clear();
        await this.userSvc.gotoRegistrate$();
    }
    async gotoUpdateCard(){
        this.alertSvc.clear();
        await this.userSvc.gotoRegistrate$();
    }
    async gotoExit(){
        this.alertSvc.clear();
        await this.userSvc.gotoExit$();
    }
}
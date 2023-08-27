import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { first } from 'rxjs/operators';

import { UsersAccountService, AlertService } from '@app/_services';
import { err } from '@myndmanagement/text-mask/core/conformToMask';
import { UserModel } from '@app/_models';

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html' 
})
export class LoginComponent implements OnInit ,AfterViewInit{
    form!: FormGroup;
    loading = false;
    submitted = false;
    constructor(
        private formBuilder: FormBuilder,
        // private route: ActivatedRoute,
        // private router: Router,
        private userSvc: UsersAccountService,
        private alertSvc: AlertService
    ) { }
    ngAfterViewInit(): void {
        //throw new Error('Method not implemented.');
    }

    ngOnInit() {
        this.alertSvc.clear();
        this.form = this.formBuilder.group({
            sysName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    async onExitInput(sysName:string){
            //alert(`onExitInput(${name})`);
    }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    get sysUser() { return this.f['sysUser'].value.toString(); }
    get password() { return this.f['password'].value.toString(); }

    async onSubmit() {
        
 
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
                   
  
    }
    toUpdateCard: boolean = false;
    toRegistrate: boolean = false;
    toLogout:boolean = true;
 
    async _onSubmit$(){
        debugger;
        this.toUpdateCard = false;
        this.toRegistrate = false;
        try {
            
            const sysName = this.f['sysName'].value;
            const password =  this.f['password'].value;
            const user = await this.userSvc.login$(sysName,password);
            if(!user){
                //TBD to registrate
                this.alertSvc.warn(
                    `Your account isn't exists \n You have to registrate it`,
                    {autoClose:true,keepAfterRouteChange:false});
                this.toRegistrate = true;
                let usr = new UserModel();
                usr.sysName = sysName;
                usr.password = password;
                this.userSvc.saveUser$(usr);
                return;
                
               // await this.userSvc.gotoRegistrate$();
               
            } else  if(user?.password !== password){
                this.alertSvc.warn(
                    `Did you forget the password?`,
                    {autoClose:true});
                   //TBD retirieve the password .... 

            } else {
                if(!user.IsAuthorized){
                    user.token = 'OK';
                }


                if(!user.IsCardValid) {
                    this.toUpdateCard = true;
                    this.alertSvc.warn(
                        `You have to update paying source`,
                        {autoClose:true,keepAfterRouteChange:false});
                    
                    //await this.userSvc.gotoRegistrate$();

                }
                else {
                    this.alertSvc.info(`Your account OK`,
                        {autoClose:true,keepAfterRouteChange:false});
                }


            }

                         
   
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
}
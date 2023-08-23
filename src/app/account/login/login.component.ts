import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { first } from 'rxjs/operators';

import { UsersAccountService, AlertService } from '@app/_services';
import { err } from '@myndmanagement/text-mask/core/conformToMask';

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html' 
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userSvc: UsersAccountService,
        private alertSvc: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            sysName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertSvc.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this._onSubmit$();                  
                   
  
    }
    toUpdateCard: boolean = false;
    toRegistrate: boolean = false;
    toLogout:boolean = true;
 
    async _onSubmit$(){
        this.toUpdateCard = false;
        this.toRegistrate = false;
        try {
            this.loading = true;
            const sysName = this.f['sysName'].value;
            const password =  this.f['password'].value;
            const user = await this.userSvc.login$(sysName,password);
            if(!user){
                //TBD to registrate
                this.alertSvc.info(
                    `Your account isn't exists \n You have to registrate it`,
                    {autoClose:true,keepAfterRouteChange:false});
                this.toRegistrate = true;
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

    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UsersAccountService, AlertService } from '@app/_services';
import { lastValueFrom } from 'rxjs';
import { UserModel } from '@app/_models';

@Component({ 
    templateUrl: 'add-edit.component.html',
    selector: 'and-add-edit-component',
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
   sysName?: string ;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userSvc: UsersAccountService,
        private alertSvc: AlertService
    ) { }

    ngOnInit() {
       // this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            sysName: ['', Validators.required],
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.sysName ? [Validators.required] : [])]]
        });
        this.title = 'Add Edit User';
     
        this.title = ' User';
        this._ngOnInit$();
     
    }
    async _ngOnInit$(){
        if (this.sysName) {
            try {
                this.loading = true;
                const user = await this.userSvc.getUser(this.sysName);
                if(user){
                    this.form.patchValue(user);
                    this.loading = false;
                }
        
            } catch (error) {
                this.alertSvc.error('' + error);
                this.submitting = false;
            }
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    

    async onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertSvc.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        try {
            const user = await this.saveUser$();
            this.alertSvc.success('User saved', { keepAfterRouteChange: true });
        } catch (error) {
            this.alertSvc.error('' + error);
            this.submitting = false;

        }
   
    }

    async saveUser$(): Promise<UserModel> {
        // create or update user based on id param
    //    const user =  this.id
    //         ? await this.userSvc.saveUser$(new UserModel(this.form.value))
    //         : await this.userSvc.register$(this.form.value);
    //     return  user;
        const user =  new UserModel(this.form.value);
        return user;
    }
}
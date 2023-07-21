import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {GKeybLanGlobal as G} from '@app/_globals'

import { AccountService, AlertService } from '@app/_services';
import { LangValidator } from '@app/_helpers/lang.validators';
import { TLangNames } from '@app/_interfaces/interfaces';
import { IUserDetailsFieldsData, USER_DATA_MULTI } from './register.data';
import { ILANG_DESCR } from '@app/keyboard/keyb-data/keyb.data';
import { Subscription } from 'rxjs';

@Component({ 
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']

 })
export class RegisterComponent implements OnInit ,OnDestroy{
    form!: FormGroup;
    loading = false;
    submitted = false;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }
  

    public set Lang(v:TLangNames) {
      if(this.first || v != this._Lang){
        this.first = false;
        this._Lang = v;
        this._onLangChange(v);
      }
    }
  
    private _Lang : TLangNames = 'en';
    public get () : TLangNames {
      return this._Lang;
    }
    private subs:Subscription[] = [];
    flds !: IUserDetailsFieldsData;
  
    private first:boolean = true;

    ngOnInit() {
        this.subs.push(G.Lang$.subscribe(lang=>this.Lang = lang));
        this._createRegisterForm();
        // this.form = this.formBuilder.group({
        //     firstName: ['', LangValidator.required('firstName')],
        //     lastName: ['', LangValidator.required('lastName')],
        //     username: ['', LangValidator.required('username')],
        //     password: ['', [LangValidator.required('password'),
        //                     LangValidator.minLength('password',6)]],
        //     email: ['', [LangValidator.required('email'),
        //                  LangValidator.email('email')  ]],
        //     phone: ['', LangValidator.required('phone')],
        //     address: ['', LangValidator.required('address')]

       // });
    }
    ngOnDestroy(): void {
      this.subs.forEach(s=>s.unsubscribe());
    }
  

    private _createRegisterForm() {
      this.form =  new FormGroup({
        firstName: new FormControl<string>('', [
          LangValidator.required("firstName")
        ]),
        lastName: new FormControl<string>('', [
          LangValidator.required("lastName")
        ]),
        userName: new FormControl<string>('', [
          LangValidator.required("userName")
        ]),

        passport: new FormControl('', [
              LangValidator.required("passport"),
              LangValidator.number("passport",9,9)
            ]),
        email: new FormControl('', [
            LangValidator.required("email"),
            LangValidator.email("email")
           ]),
        phone:  new FormControl('', [
            LangValidator.required("phone"),
            LangValidator.number("phone",7,12)
          ]),
          address:  new FormControl<string>('', [
            LangValidator.required("address")
          ]),
          ravkav:  new FormControl<string>('', [
           // LangValidator.required("address")
          ]),

      //  ravkav: new FormControl('',[]),
        imagreeTerms: new FormControl<boolean>(false,[
          LangValidator.requiredTrue("imagreeTerms")
        ]),
        imagreePolicy: new FormControl<boolean>(false,[
          LangValidator.requiredTrue("imagreePolicy")
        ]),
      });
     
           
    }
  
  
    OnSliderChange(evt:any,ctrlName:string){ //'imagreePolicy'

      const c = this.f[ctrlName] as FormControl;
      c.markAsTouched({onlySelf:true});
      const checked = !!evt?.target?.checked;
      if(c.value != checked){
        c.setValue(checked);
      }
      console.log(`OnSliderChange:(${ctrlName})=${c.value}`)
      //console.log(c.name,c.touched);
     
    }
    private _onLangChange(v : TLangNames){
      //this change language for validation strings
     // LangValidator.Lang = v;
      /// To event !!!
      this.flds = USER_DATA_MULTI[this._Lang] as IUserDetailsFieldsData;//{...USER_DATA_MULTI[this._Lang]};
      console.log(`Set Lang ${v}:${ILANG_DESCR[v].name}`);
      this._validateMe();
  
    }
    private _validateMe() {

      for (let controlName in this.form?.controls) {
        this.f[controlName]?.updateValueAndValidity();
      }
    }

  
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
  // c(ctrlName:string) { return this.f[ctrlName] as FormControl; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
    getClasses(cname:string) {
      const fc = this.f[cname] as FormControl;
  
      const c =  {
  
        'is-invalid': !!fc?.touched && !!fc?.errors, 
        'is-valid': !!fc?.valid ,
       // 'is-active': cname === this.active
      }
      return c;
    }  
  
}


  // getClasses(cname:string) {
    //   const fc = this.f[cname];
  
    //   const ret =  {
  
    //     'is-invalid': !!fc?.touched && !!fc?.errors, 
    //     'is-valid': !!fc?.valid ,
    //    // 'is-active': cname === this.active
    //   }
    //   return ret;
    // }  
    // getClasses2(cname:string) {
    //   const fc = this.f[cname];
  
    //   return {
  
    //     'is-invalid': !!fc?.touched && !!fc?.errors, 
    //     'is-valid': !!fc?.valid 
    //   }
    // }
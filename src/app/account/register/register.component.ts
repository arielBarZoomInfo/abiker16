import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {GKeybLanGlobal as G} from '@app/_globals'

import { UsersAccountService, AlertService, GUser } from '@app/_services';
import { LangValidator } from '@app/_helpers/lang.validators';
import { epg, IEFM, TLangNames } from '@app/_interfaces/interfaces';
import { IUserDetailsFieldsData, USER_DATA_MULTI } from './register.data';
import { ILANG_DESCR } from '@app/keyboard/keyb-data/keyb.data';
import { Subscription } from 'rxjs';
import { UserModel, WideUserModel } from '@app/_models';
import { environment } from '@environments/environment';

const TO_TEST_USER = environment.toTestUsers;

@Component({ 
  
  selector: 'and-register',
 
  templateUrl: 'register.component.html',
  styleUrls:  ['register.component.scss']

 })
export class RegisterComponent implements OnInit ,OnDestroy{
//IEFM<UserModel>{
    readonly env = environment;
    form!: FormGroup;
    loading = false;
    submitted = false;
    //flags = this.userSvc.flags;


    constructor(
        // private route: ActivatedRoute,
        // private router: Router,
        private userSvc: UsersAccountService,
        private alertSvc: AlertService
    ) { }
  get user() {return GUser;}
  

  model?: UserModel | undefined;
  get itsOK(): boolean {
    return this.form.valid;
   // throw new Error('Method not implemented.');
  }
  

    public set Lang(v:TLangNames) {
        
     // if( v != this._Lang){
        this._Lang = v;
        this._onLangChange(v);
     // }
     
    }
  
    private _Lang : TLangNames = G.Lang;
    public get Lang() : TLangNames {
      return this._Lang;
    }
    private subs:Subscription[] = [];
    flds !: IUserDetailsFieldsData;
  
   
    ngOnDestroy(): void {
      this.subs.forEach(s=>s.unsubscribe());
      G.KeyboardVisible = false;
    }

    ngOnInit() {
       G.KeyboardVisible = true;
        this.subs.push(G.Lang$.subscribe(lang=>this.Lang = lang));
        this.Lang = G.Lang;
      this._createRegisterForm();

    }
    


    private _createRegisterForm() {
      //debugger;
      //If was Login
      let _sysName='';
      let _password='';
      let __user = this.userSvc.userValue;
      
      if(__user){
        _sysName = __user.sysName;
        _password=__user.password;
      }
      

      this.form =  new FormGroup({
        firstName: new FormControl<string>('', [
          LangValidator.required("firstName")
        ]),
        lastName: new FormControl<string>('', [
          LangValidator.required("lastName")
        ]),
        sysName: new FormControl<string>(_sysName, [
          LangValidator.required("sysName")
        ]),
        password: new FormControl<string>(_password, [
          LangValidator.required("password")
        ]),
       
        passport: new FormControl('', [
          LangValidator.required("passport"),
          LangValidator.teudatZehut("passport"),
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
  
    async getAviKohen(){
      this.form.reset();
      try {
        const  wideUser = await this.userSvc.retrieveWideUser$(false);
        this._updateForm(wideUser);
      
      } catch (error) {
        
      }
       
        //this.userSvc.retrieveUsers$

      
   

    }
    async getRandomUser(){
      this.form.reset();
      try {
        const  wideUser = await this.userSvc.retrieveWideUser$(true);
        this._updateForm(wideUser);
      
      } catch (error) {
        
      }

    }
    _updateForm(wideUser: WideUserModel | undefined){
      if(!!wideUser){

 
        this.f['firstName'].setValue(wideUser.firstName) ;
        this.f['lastName'].setValue(wideUser.lastName) ;
        this.f['sysName'].setValue(wideUser.sysName) ;
        this.f['password'].setValue(wideUser.password) ;
        this.f['passport'].setValue(wideUser.passport) ;
        this.f['email'].setValue(wideUser.email) ;
        this.f['phone'].setValue(wideUser.phone) ;
        this.f['address'].setValue(wideUser.address) ;
        this.f['ravkav'].setValue(wideUser.ravkav) ;
        this.f['imagreeTerms'].setValue(true) ;
        this.f['imagreePolicy'].setValue(true) ;
      }
   

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
     // this._Lang = v;
      this.flds = USER_DATA_MULTI[this._Lang] as IUserDetailsFieldsData;//{...USER_DATA_MULTI[this._Lang]};
      console.log(`Set Lang ${v}:${ILANG_DESCR[v].name}`);
      this._validateMe();
  
    }
    private _validateMe() {
   //   try {
        if(this.form){
          this.form.markAllAsTouched();

          for (let controlName in this.form?.controls) {
            const c = this.f[controlName] as FormControl;
            if(c){
              c.markAsTouched();
              c.updateValueAndValidity();
            }
          
          }        
  
        }
  //    } catch (error) {
        
  //    }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    get valid() {return this.form.valid;}
  // c(ctrlName:string) { return this.f[ctrlName] as FormControl; }

  getClasses(cname:string) {
    const fc = this.f[cname] as FormControl;

    const c =  {

      'is-invalid': !!fc?.touched && !!fc?.errors, 
      'is-valid': !!fc?.valid ,
      // 'is-active': cname === this.active
    }
    return c;
  }  

  async onSubmit() {
    this.submitted = true;
    

    // reset alerts on submit
    this.alertSvc.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        this._validateMe();
        return;
    }

    try {
      this.loading = true;
      const model:UserModel =  new UserModel(this.form.value);
      this.model = model;
      await this.userSvc.saveUser$(model);
      this.loading = false;
      // this.userSvc.flags.fVisa = true;
      this.alertSvc.success('Registration successful', 
        { keepAfterRouteChange: true });
      this.userSvc.gotoCreditCard$(model);
        // this.router.navigate(['../credit-card'], { relativeTo: this.route });

      
    } catch (error) {
      this.alertSvc.error('Submit Registration' + error);
        
    }
    G.KeyboardVisible = false;

  

      
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
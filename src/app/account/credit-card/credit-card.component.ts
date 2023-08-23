///yarn add @myndmanagement/text-mask
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersAccountService, AlertService } from '@app/_services';
import { Subscription } from 'rxjs';
import { GKeybLanGlobal as G } from '@app/_globals'

// import { luhnValidator } from 'src/app/_helpers/luhn/luhn.validator';
import { TLangNames } from '@app/_interfaces/interfaces';
import { CREDIT_DATA_MULTI, ICreditCardFieldsData } from './credit.card.data';
import { LangValidator } from '@app/_helpers/lang.validators';
import { CreditCardModel } from '@app/_models';


const TO_LOG = true;



@Component({
  selector: 'and-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent  
  implements OnInit, OnDestroy, AfterViewInit{
    title = 'CreditCardValidation';

    //#region Lang
    private _Lang !: TLangNames ;// = GlobalLangPipe$.value;;
    public get Lang() : TLangNames {
      return this._Lang;
    }
    @Input()
    public set Lang(v : TLangNames) {
      if( this._Lang != v){
        this._Lang = v;
        this._onLangChange(v);
       }
       
    }
    //#endregion
     active:string = '';
    paymentForm !: FormGroup;

    model:CreditCardModel = <CreditCardModel>{}
  
    isSubmitted:boolean = false;
    cardValidate:boolean = false;
    cardDetailsValidate:boolean = false;
    cardType:string = "Visa";

    readonly maskCardNum = [
      /\d/, /\d/, /\d/, /\d/, '-', 
      /\d/, /\d/, /\d/, /\d/, '-', 
      /\d/, /\d/, /\d/, /\d/, '-', 
      /\d/, /\d/, /\d/, /\d/
    ];
    readonly maskPassportNum  = [
      /\d/, /\d/, /\d/, /\d/, /\d/, 
      /\d/, /\d/, /\d/, /\d/
    ];
    
    readonly maskTokefNum = [
      /\d/, /\d/,  '/',
    //  '2','0',
       /\d/, /\d/
    ];
    readonly maskCvvNum = [
      /\d/, /\d/, /\d/
    ];
    
    subs: Subscription[] = [];
    
    public constructor(   
      private userSvc: UsersAccountService,
      private alertSvc: AlertService
     ) { 
      this.subs.push(
        G.Lang$.subscribe(lan=>{this.Lang = lan;})
      );

    }
    flds !: ICreditCardFieldsData;

    ngOnInit() {   
      this._onLangChange(G.Lang,false);// don't validate
      this.IntializePaymentForm();
      G.KeyboardVisible = true;
    }
  
    // ngOnDestroy(){

    // }
 
    private _onLangChange(v : TLangNames, toValidate:boolean = true){
      //this change language for validation strings
     // LangValidator.Lang = v;
      /// To event !!!
  
      this.flds = CREDIT_DATA_MULTI[v] as  ICreditCardFieldsData;//{...USER_DATA_MULTI[this._Lang]};
      if(TO_LOG){
        console.log(`Set Lang ${v}}`);
      }
     
      this._validateMe();
      return v;
  
    }


    private _validateMe() {

      for (let controlName in this.paymentForm?.controls) {
        this.c(controlName)?.updateValueAndValidity();
      }
    }
    ngOnDestroy(): void {
      this.subs.forEach(sub=>sub.unsubscribe());
      G.KeyboardVisible = false;
    }
   
  
    ngAfterViewInit(): void {
     
    }
   
    c(controlName:string) : FormControl{
      const ctrl = this.paymentForm.controls[controlName];
      return ctrl as FormControl;
    } 
  //#region IntializePaymentForm
  IntializePaymentForm() {
    this.paymentForm = new FormGroup({ 

      ownerName: new FormControl<string>("",[
          LangValidator.required("ownerName")
        ]), 

      ownerLastName: new FormControl<string>("", [
         LangValidator.required("ownerLastName")
        ]) ,
          
      passport:   new FormControl<string>("", [
        LangValidator.required("passport"),
       //LangValidator.minLength("passport",9),
        LangValidator.teudatZehut("passport"),
      //  
      ]) ,

      cardNumber: new FormControl<string>("", [
        LangValidator.required("cardNumber"),
        LangValidator.creditCardLuhn("cardNumber")
        
      ]),

      tokef: new FormControl<string>("02/27", [
        LangValidator.required("tokef"),
        LangValidator.cardExpired('tokef')
      ]),
      
      cvv: new FormControl<string>("XXX", [
        LangValidator.required("cvv"),
        LangValidator.minLength("cvv",3)
      ]),
        
    });

    
  }
  get f() {
    return this.paymentForm.controls;
  }
  getClasses(cname:string) {
    const fc = this.f[cname] as FormControl;

    const c =  {

      'is-invalid': !!fc?.touched && !fc?.valid , 
      'is-valid': !!fc?.valid ,
     // 'is-active': cname === this.active
    }
    return c;
  }  

  //#endregion
 
  
  ctrl(ctrl:string):FormControl  {
    return (this.paymentForm && this.paymentForm.get(ctrl)) as FormControl;
  }

  //#endregion

  tokef2date():boolean{
    if(this.model.tokef && this.model.tokef.includes('/')){
      const arr = this.model.tokef.split('/');
      if(arr.length >= 2)
      {
        let m = +(arr[0].toString());
        m = (m >= 1 && m <= 12)? m: 1;
        this.model.cardMonth = m.toString();
        let y = +(arr[1].toString()) % 100;
        this.model.cardYear = (y + 2000).toString();
        return true;
      }
    }
    return false;

  }
  
  SaveCardDetails(){    
    
    const hash = this.paymentForm.value;
    this.model = {...hash};
    debugger;
    
    Object.entries(hash).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);
    });

    this.isSubmitted= true;
    const ft = this.tokef2date();

    if(ft && this.paymentForm.valid){
      this.cardType = 'Visa';//this.getCardType(this.paymentmodel.cardNumber)
      this.cardValidate =this.validateCCcard(+(this.model.cardMonth ?? '0'),
       + (this.model?.cardYear ?? '0'))
      if(this.cardValidate)
        this.cardDetailsValidate = true;
    }
    else{
      this.cardDetailsValidate = false;
    }
      
  

    console.log(this.model, this.cardType,this.cardValidate)
  }
  
  ClearCardDetails(){
    this.model = <CreditCardModel>{};
    this.paymentForm.reset();
  }

  
  
  validateCCcard(month:number, year:number) {
    debugger;
    let ptDatePattern = "^((0[1-9])|(1[0-2]))/([0-9]{4})$";
    let datevalue = month + "/" + year;
    if (datevalue.match(ptDatePattern)) return true;
    else {
      let todayDate = new Date();
      // const year = Number(value.substr(2, 4));
      // const month = Number(value.substr(0, 2));
      let controlDate = new Date(year, month - 1, 1, 23, 59, 59);
      let dateCompare = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1,
        0,
        0,
        0
      );
      //  let controlDate = new Date(control.value);
      if (dateCompare > controlDate) {
        return true;
      }
    }

    return false;
  }
    
  
}

// export interface IMonth {
//   text: string,
//   value: string,
// }

// export interface IYear {
//   text: string,
//   value: string,
// }
// export interface IMonth {
//   text: string,
//   value: string,
// }

// export interface IYear {
//   text: string,
//   value: string,
// }
 //#region Set MonthLsit Yeras
  //   GetMonths() {
  //     for (let i = 1; i <= 12; i++) {
  //       this.month = <IMonth>{};
  //       if(i.toString().length == 1)
  //       {
  //         this.month.text = "0"+i.toString();
  //         this.month.value = "0"+i.toString();
  //       }
  //       else
  //       {
  //         this.month.text = i.toString();
  //         this.month.value = i.toString();
  //       }
        
  //       this.monthlist.push(this.month);
  //     }
  //   }
  //   GetYears() {
  //     let year = new Date().getFullYear();
  //     for (let i = year; i <= year + 10; i++) {
  //       this.year = <IYear>{};
  //       this.year.text = i.toString();
  //       this.year.value = i.toString();
  //       this.years.push(this.year);
  //     }
  //   }
  // //#endregion
  //#region Card Mask fns
    // cardMaskFunction(rawValue: string): Array<RegExp> {
    //   const card = null;//getValidationConfigFromCardNo(rawValue);
    //   if (card) {
    //     return card.mask;
    //   }
    //   return [/\d/];
    // }
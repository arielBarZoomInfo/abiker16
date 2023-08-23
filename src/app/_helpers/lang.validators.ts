import { AbstractControl,FormGroup,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { TLangNames,TLang } from '../_interfaces/interfaces';
import { GKeybLanGlobal as G} from '../_globals/keyb-lang.global';
//import { GetGlobalLang } from '../keyb-data/keyb.data';


const TO_LOG = false;
export function nullValidator(control: AbstractControl): ValidationErrors|null {
    return null;
}
export const luhnCheck = (cardNumber: string): boolean => {
  
     if (!cardNumber?.length) {
         return false;
     }
       // Remove all except digits from card number.
     cardNumber = cardNumber.replace(/\D/g, '')
    
     if(cardNumber=='1111111111111111'){
        //TRICK!!!
        return true;
     }
 
     // 1. Remove last digit;
     const lastDigit = Number(cardNumber[cardNumber.length - 1]);
   
     // 2. Reverse card number
     const reverseCardNumber = cardNumber
                               .slice(0, cardNumber.length - 1)
                               .split('')
                               .reverse()
                               .map(x => Number(x));
     let sum = 0;
   
     // 3. + 4. Multiply by 2 every digit on odd position. Subtract 9 if digit > 9
     for (let i = 0; i <= reverseCardNumber.length - 1; i += 2) {
         reverseCardNumber[i] = reverseCardNumber[i] * 2;
         if (reverseCardNumber[i] > 9) {
             reverseCardNumber[i] = reverseCardNumber[i] - 9;
         }
     }
   
     // 5. Make the sum of obtained values from step 4.
     sum = reverseCardNumber.reduce((acc, currValue) => (acc + currValue), 0);
   
     // 6. Calculate modulo 10 of the sum from step 5. and the last digit. If it's 0, you have a valid card number :)
     return ((sum + lastDigit) % 10 === 0);
}

function hasValidLength(value: any): boolean {
    // non-strict comparison is intentional, to check for both `null` and `undefined` values
    return value != null && ( typeof value === 'number' || typeof value.length === 'number');
}
  
function teudatZehutValidator(id:string)
{
   // debugger;
    if (isNaN(+id) || id.length !== 9 ) {  // Make sure ID is formatted properly
        return false;
    }
    let sum = 0, incNum = 0;
    for (let i = 0; i < id.length; i++) {
        incNum = Number(id[i]) * ((i % 2) + 1);  // Multiply number by 1 or 2
        sum += (incNum > 9) ? incNum - 9 : incNum;  // Sum the digits up and add to total
    }
     const s = sum % 10;
     console.log('@@@',id,s);

    return (s === 0);
}
  
function isEmptyInputValue(value: any): boolean {
    /**
     * Check if the object is a string or array before evaluating the length attribute.
     * This avoids falsely rejecting objects that contain a custom length attribute.
     * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
     */
    const b = value == null ||
        ((typeof value === 'string' || Array.isArray(value))
        && value.length === 0);
    return b;
  }

export class LangValidator{
    
   // static  _Lang : TLangNames = 'en';
    static get Lang() : TLangNames {
        return G.Lang ;
    }
    // static  set Lang(v : TLangNames) {
    //     LangValidator._Lang = v;
    // }
    
    
    constructor(){

    }

    private static _addMsgLang(controlName:string, 
        errName:string, 
        msg:string, 
        errs:ValidationErrors = {},
        errNameOld:string = ''){

        const ret:any = {};
        ret[errName] = {};

        if(!!errNameOld){
            ret[errName].value = {...errs[errNameOld]};
            delete ret[errNameOld];
        } else {
            ret[errName].value = {...errs[errName]};
        }

        ret[errName].lang = msg;

        if(TO_LOG  ){
            console.log(`err:${controlName}.${errName}.lang = ${msg}`);
        }
        return ret;

    }
    static required(controlName: string): ValidatorFn {

       
        const _patternLangs: TLang<string> = {

        en: `"${controlName}" field must be filled`,
        //dg: `"${controlName}" field must be filled`,
        ru: `Поле "${controlName}" должно быть заполнено`,
        he: `"${controlName}" יש למלא את השדה`,
        ar: `"${controlName}" يجب ملء حقل `

        }
        //{'required': true}
        return (control: AbstractControl) : ValidationErrors | null => {
            const errs  = Validators.required(control);
            if(!!errs && errs['required']){
                const pathFn = () => _patternLangs[this.Lang];
                const msg = pathFn();
                const ret = LangValidator._addMsgLang(controlName,'required',msg,errs);
                return ret;
                
            } else {
                return null;
            }
        }

     }


    static requiredTrue(controlName: string): ValidatorFn {

    
    const _patternLangs: TLang<string> = {

        en: `"${controlName}" field must be checked`,
        //dg: `"${controlName}" field must be checked`,
        ru: `Поле "${controlName}" должно быть отмечено`,
        he: `"${controlName}" יש לסמן את השדה`,
        ar: `"${controlName}" يجب تحديد الحقل`

    }
    //{'required': true}
    return (control: AbstractControl) : ValidationErrors | null => {
        const errs  = Validators.requiredTrue(control);
        
        if(!!errs && errs['required']){
            const pathFn = () => _patternLangs[this.Lang];
            const msg = pathFn(); 
            const ret = LangValidator._addMsgLang(controlName,'requiredTrue',msg,errs,'required');
            return ret;

            
            
        } else {
            return null;
        }
    }

    }

    static email(controlName: string): ValidatorFn {

        //const errName = 'email';
        const _patternLangs: TLang<string> = {

            en: `Enter valid email format for field: "${controlName}"`,
            //dg: `Enter valid email format for field: "${controlName}"`,
            ru: `Введите правильный email формат для поля "${controlName}"`,
            he: `"${controlName}"  הזן את פורמט הדוא"ל הנכון עבור השדה `,
            ar: `"${controlName}" أدخل تنسيق البريد الإلكتروني الصحيح للحقل `

        }
        //
        return (control: AbstractControl) : ValidationErrors | null => {
           //// {email: true}
            let errs  = Validators.email(control);
            if(!!errs && errs['email']){
                const pathFn = () => _patternLangs[this.Lang];
                const msg = pathFn(); 
                const ret = LangValidator._addMsgLang(controlName,'email',msg,errs);
                return ret;
 
                               
            } else {
                return null;
            }
        }
    }
    static number(controlName: string,
        minDigits:number = 7,maxDigits:number=12): ValidatorFn {
        
        // const name = controlName;
        maxDigits = (minDigits > maxDigits)? minDigits : maxDigits;
      
         const patternRegex = (minDigits === maxDigits )?
         `^[0-9]{${minDigits}}$`
         :`^[0-9]{${minDigits},${maxDigits}}$`;
        
             // const name = controlName;
        const _patternLangs: TLang<string> = {

            en: `Enter valid number ${minDigits}-${maxDigits} digits acceptable only : "${controlName}"`,
            ru: `Введите правильный номер только ${minDigits}-${maxDigits} цифр допустимы : "${controlName}"`,
            he: `"${controlName}" : נא להזין מספר חוקי רק ספרות ${minDigits}-${maxDigits} חוקיות `,
            ar: `"${controlName}" : الرجاء إدخال رقم صالح فقط $ {minDigits} - $ {maxDigits} رقم صالحة`,
            //dg: `Enter valid number ${minDigits}-${maxDigits} digits acceptable only : "${controlName}"`,

        }

                
           return (control: AbstractControl): ValidationErrors|null => {
                if (isEmptyInputValue(control.value)) {
                       return nullValidator;
                  //   // don't validate empty values to allow optional controls
               }

               let errs  = Validators.pattern(patternRegex)(control);
               
               if(!!errs && errs['pattern']){
                    const pathFn = () => _patternLangs[this.Lang];
                    const msg = pathFn(); 
                    const ret = LangValidator._addMsgLang(controlName,'number',msg,errs,'pattern');
    
                    return ret;
                   
               } else {
                   return null;
               }
            };
    }

    static pattern(controlName: string,patternRegex:string|RegExp): ValidatorFn {

        const _patternLangs: TLang<string> = {

            en: `Enter valid format for field: "${controlName}"`,
            //dg: `Enter valid format for field: "${controlName}"`,
            ru: `Введите правильный формат для поля: "${controlName}"`,
            he: `"${controlName}" : הזן את פורמט הנכון עבור השדה `,
            ar: `"${controlName}" : أدخل التنسيق الصحيح للحقل`

        }

        return (control: AbstractControl): ValidationErrors|null => {
            if (isEmptyInputValue(control.value)) {
                return nullValidator;
           //   // don't validate empty values to allow optional controls
        }

        // {'pattern': {'requiredPattern': regexStr, 'actualValue': value}};
        let errs  = Validators.pattern(patternRegex)(control);
        
        if(!!errs && errs['pattern']){
            const pathFn = () => _patternLangs[this.Lang];
            const msg = pathFn(); 
            const ret = LangValidator._addMsgLang(controlName,'pattern',msg,errs);
            return ret;
            
        } else {
            return null;
        }
     };
    }
    static  minLength(controlName:string,minLength: number): ValidatorFn {

        const errName = 'minLength';
        const _patternLangs: TLang<string> = {
    
            en: `${controlName}" value must be more than ${minLength}`,
            //dg: `${controlName}" value must be more than ${minLength}`,
            ru: `Значение ${controlName}" должно быть больше ${minLength}.`,
            he: `${minLength}"-חייב להיות יותר מ `+ `${controlName} הערך של`,
            ar: `${minLength}"-يجب أن يكون أكثر من`+ ` ${controlName} قيمة ال`

        }
    


        return (control: AbstractControl): ValidationErrors|null => {
            if (isEmptyInputValue(control.value && !hasValidLength(control))  ) {
            // don't validate empty values to allow optional controls
            // don't validate values without `length` property
                return null;
            }
            let errs  = Validators.minLength(minLength)(control);
           
            //// {minlength: {requiredLength: 3, actualLength: 2, msg: "bckg"}}
            if(!!errs && errs['minlength']){
                const pathFn = () => _patternLangs[this.Lang];
                const msg = pathFn(); 
                const ret = LangValidator._addMsgLang(controlName,'minlength',msg,errs);
                return ret;
    
            } else {
                return null;
            }
          
        };
   }
   static  maxLength(controlName:string,maxLength: number): ValidatorFn {
     
        const _patternLangs: TLang<string> = {

            en: `${controlName}" value must be less than ${maxLength}`,
            //dg: `${controlName}" value must be less than ${maxLength}`,
            ru: `Значение ${controlName}" должно быть меньше ${maxLength}.`,
            he: `${maxLength}"-חייב להיות פחות מ `+ `${controlName} הערך של`,
            ar: `يجب أن تكون قيمة ${controlName} "أقل من ${maxLength}`

        }

        return (control: AbstractControl): ValidationErrors|null => {
            if (isEmptyInputValue(control.value && !hasValidLength(control))  ) {
            // don't validate empty values to allow optional controls
            // don't validate values without `length` property
                return null;
            }
            let errs  = Validators.maxLength(maxLength)(control);
        
            //// {maxlength: {requiredLength: 3, actualLength: 2, msg: "bckg"}}
                
            if(!!errs && errs['maxLength'] ){
                const pathFn = () => _patternLangs[this.Lang];
                const msg = pathFn(); 
             
                const ret = LangValidator._addMsgLang(controlName,'maxLength',msg,errs);
                return ret;

                         } else {
                return null;
            }
        }
   }

   static  teudatZehut(controlName:string): ValidatorFn {
    
        const _patternLangs: TLang<string> = {

            en: `Wrong Israel ID value`,
            //dg: `Wrong Israel ID value`,
            ru: `Ошибка ввода удостоверениа личности.`,
            he: `שגיאה בהזנת תאודת הזהות`,
            ar: `خطأ في إدخال بطاقة الهوية`

        }

        return (control: AbstractControl): ValidationErrors|null => {
            if (isEmptyInputValue(control.value && !hasValidLength(control))  ) {
            // don't validate empty values to allow optional controls
            // don't validate values without `length` property
                return null;
            }
            let ft  = teudatZehutValidator(control.value);
        
            let value=  control?.value ?? '';
            //// {maxlength: {requiredLength: 3, actualLength: 2, msg: "bckg"}}
                
            if(!ft ){
                const pathFn = () => _patternLangs[this.Lang];
                const msg = pathFn(); 
            
                const ret = LangValidator._addMsgLang(controlName,'teudatZehut',
                    msg,{teudatZehut:false,value:value});
                return ret;

            } else {
                return null;
            }
        }
    }


    static  creditCardLuhn(controlName:string): ValidatorFn {
      
        const _patternLangs: TLang<string> = {

            en: `Wrong credit card number`,
            //dg: `Wrong credit card number`,
            ru: `Неверный номер кредитной карты`,
            he: `מספר כרטיס אשראי שגוי`,
            ar: `رقم بطاقة الائتمان غير صحيح`
        }

        return (control: AbstractControl): ValidationErrors|null => {
            if (isEmptyInputValue(control.value && !hasValidLength(control))  ) {
            // don't validate empty values to allow optional controls
            // don't validate values without `length` property
                return null;
            }
            let ft  = luhnCheck(control.value);
        
            //// {maxlength: {requiredLength: 3, actualLength: 2, msg: "bckg"}}
                
            if(!ft ){
                const pathFn = () => _patternLangs[this.Lang];
                const msg = pathFn(); 
            
                const ret = LangValidator._addMsgLang(controlName,'teudatZehut',
                    msg,{teudatZehut:false});
                return ret;

            } else {
                return null;
            }
        }
    }

    

    static cardExpired(controlName:string): ValidatorFn {

     
        return (control: AbstractControl): ValidationErrors|null => {

            if (isEmptyInputValue(control.value && !hasValidLength(control))  ) {
                // don't validate empty values to allow optional controls
                // don't validate values without `length` property
                    return null;
            }
            
             const _patternFormatLangs: TLang<string> = {

                en: `Date format , have been MM/YY`,
                //dg: `Date format , have been MM/YY`,
                ru: `Дата должна иметь формат MM/YY `,
                he: `MM/YY התאריך חייב להיות בפורמט`,
                ar: `يجب أن يكون التاريخ بتنسيق MM / YY`
            }
    
    
         
            const _patternExpiredLangs: TLang<string> = {
    
                en: `Credit card date expired`,
                //dg: `Credit card date expiredh}`,
                ru: `Срок действия кредитной карты истек.`,
                he: `תוקף הכרטיס האשראי נגמר`,
                ar: `انتهت صلاحية بطاقة الائتمان`
    
            }
            
            const tokef:string = control.value?.toString() ?? '';
            const pathFormatFn = () => _patternFormatLangs[this.Lang];
            const msgFormat = pathFormatFn(); 
             
            let arr:string[] = []
         
    
            if(tokef.length < 5 || tokef[2] != '/' || (arr = tokef.split('/')).length < 2) {
                    
                return LangValidator._addMsgLang(controlName,'dateFormat',msgFormat);
            } 

         
            let month = +(arr[0].toString());


            if(month < 1 && month > 12) {
                    
                return LangValidator._addMsgLang(controlName,'dateFormat',msgFormat);
            } 
       
            const  pathExpiredFn = () => _patternExpiredLangs[this.Lang];
            const msgExpired = pathExpiredFn(); 

                
            let year = +(arr[1].toString()) % 100;
                year = (year + 2000);
            const dateNow = new Date();
            const dateTokef = new Date(year,month - 1, 1,23,59,59);
            if(dateNow.getTime() > dateTokef.getTime()){
                return LangValidator._addMsgLang(controlName,'dateExpired',msgExpired);
            }

            return null;

        }
   }




}
 

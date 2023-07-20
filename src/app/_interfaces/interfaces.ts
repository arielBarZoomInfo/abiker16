//import { ElementRef } from "@angular/core";
//import { FormControl } from "@angular/forms";

export type TLangNames = 'en' | 'ru' | 'he' | 'ar';
export type TLangNames2 = TLangNames | 'dg' ;
export type TDirection = 'ltr' | 'rtl';
export interface ILang{
    lang: TLangNames;
    name:string;
    descr?:string;

};
export type TLang<T = string> = Record<TLangNames,T >;
export interface ITMultiLang<T = string>{
    en:T;
    ru:T;
    he:T;
    ar:T;
    
};

export interface IInputFields{
    id?:string;
    name:string;
    type?: string;
    label: string;
    placeholder: string;
  
};


export interface IButtons{
    return:string;
    exit:string;
    continue:string;
    registration:string;
    
};

// export interface IForKeyboard{
//     sendKeyboardChar(ch:string): void;
//     set Target(tar: EventTarget | null) ;
//     get Target() : EventTarget | null;
//     get Lang(): ILang;
    
// }

export interface IInputFieldsMulti{
    name:string;
    label: ITMultiLang<string>;
    placeholder:  ITMultiLang<string>;
    invalidFeedback?: ITMultiLang<string>;
}
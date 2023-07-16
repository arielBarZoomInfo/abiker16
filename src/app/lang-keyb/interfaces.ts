import { ElementRef } from "@angular/core";
import { FormControl } from "@angular/forms";

export type TLangNames = 'en' | 'ru' | 'he' | 'ar' | 'dg';
export type TDirection = 'ltr' | 'rtl';
export interface ILang{
    lang: TLangNames;
    name:string;
    descr?:string;

};
export interface ITMultiLang<T = string>{
    en:T;
    ru:T;
    he:T;
    ar:T;
    
}


export interface IButtons{
    return:string;
    exit:string;
    continue:string;
    registration:string;
    
    };
export interface ILang{
    langId: string;
    name:string;
    descr?:string;
    btns:IButtons;
  

};
export interface IForKeyboard{
    sendKeyboardChar(ch:string): void;
    set Target(tar: EventTarget | null) ;
    get Target() : EventTarget | null;
    get Lang(): ILang;
    
    }
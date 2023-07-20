//import * as I from '../interfaces/interfaces'



import { BehaviorSubject } from "rxjs";
import { ILang,  TLang, TLangNames } from "@app/_interfaces/interfaces"
//export const GLangNamesArray:string[] = ['en','he','ru','ar'];

export const LANG_BUTTONS :  Record<string,TLang> = {
    return:       {en:'Back',ru:'Возврат',he:'חזור',ar:'يعود'},
    exit:         {en:'Exit',ru:'Выход',he:'יציאה',ar:'مخرج'},
    continue:     {en:'Next',ru:'Далее',he:'המשך',ar:'بجوار'},
    registration: {en:'Registration',ru:'הראשמה',he:'חזור',ar:'تسجيل'},
 }


export const ILANG_DESCR: Record<TLangNames, ILang>  = {
    en: {  lang:'en',  name:'English'},
    he: {  lang:'he',  name:'עברית'},
    ru: {  lang:'ru',  name:'Русский'},
    ar: {  lang:'ar',  name:'عربي'},
  

}

export const LANG_DESCR_ARR : ILang[] = [
    ILANG_DESCR['en'],
    ILANG_DESCR['he'],
    ILANG_DESCR['ru'],
    ILANG_DESCR['ar']
   
    
]
// export const RefKeybVisible : {visible:boolean}= {visible:true};


// //To template binding
// export const RefGlobalLang : {ilang:ILang}= {ilang:ILANG_DESCR['en']};
// //export const RefAlternateLang : {ilang:ILang | undefined} = {ilang:undefined};
// export const RefKeyboardLang : {ilang:ILang} = {...RefGlobalLang};

// //export function  getGlobalCurLang() :  ILang  { return  RefGlobalLang.ilang;}
// //!!!! Lang Global
// export const KeybLangPipe$ : BehaviorSubject<TLangNames> 
//        = new BehaviorSubject<TLangNames>( 'en');

// export const GlobalLangPipe$ : BehaviorSubject<TLangNames> 
//        = new BehaviorSubject<TLangNames>( 'en');
// export function GetGlobalLang() {return GlobalLangPipe$.value};

// let _alternateLan:  TLangNames | '' = '';

// export function SetGlobalLang(lang:TLangNames){
//     if(RefGlobalLang.ilang.lang != lang){
//         RefGlobalLang.ilang = ILANG_DESCR[lang];
//         GlobalLangPipe$.next(lang);
//         console.log(`set Global Lang ${RefGlobalLang.ilang.name}`);
//         SetAlternateLng( _alternateLan);
//     }
 
// }

// export function SetAlternateLng(alternateLang:TLangNames | '' = ''){
//     const oldAlternateLang = RefKeyboardLang.ilang.lang;
    
//     RefKeyboardLang.ilang = (alternateLang) ? ILANG_DESCR[alternateLang] 
//                                    : RefGlobalLang.ilang;

//     _alternateLan = alternateLang;
//     if(oldAlternateLang != RefKeyboardLang.ilang.lang){
//         console.log(`set Alter Lang ${RefKeyboardLang.ilang.name}`);
//         KeybLangPipe$.next(RefKeyboardLang.ilang.lang)
//     }

// }


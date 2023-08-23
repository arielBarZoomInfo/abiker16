import { IInputFields,  TDirection,  TLangNames } from "@app/_interfaces/interfaces";


export interface IUserDetailsFieldsData{
   lang: TLangNames;
   direction:TDirection;
   title:string;
   title2:string;
   firstName:IInputFields;
   lastName:IInputFields;
   sysName:IInputFields;
   password:IInputFields;
   passport:IInputFields;
   email:IInputFields;
   address:IInputFields;
   phone:IInputFields;
   ravkav:IInputFields;
   iamagree:IInputFields;
  // labelCh1?:string,
   pay : {
         terms:{
            ref:string;
            text:string;
         },
         policy:{
            ref: string;//
            text: string;
      
         },
      }
   
};
//{  en:'', ru:'',he:'',ar:''}
/*
           {
               name:'';
               label: {  en:'', ru:'',he:'',ar:''},
               placeholder:  {  en:'', ru:'',he:'',ar:''},
               invalidFeedback?://{  en:'', ru:'',he:'',ar:''};
           }
*/
  

const REGISTR_EN : IUserDetailsFieldsData = {
   lang:'en',
   direction:'ltr',
   title:'Register for the bicycle parking system',
   title2:'To use the parking lot services, please fill in the following details',
   firstName: {
     name: 'firstName',
     //type: 'text',
     label:'First name',
     //required: true,//default true
     //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
     placeholder:'First name ',
   
  },   
  lastName: {
      name: 'lastName',
      //type: 'text',
      label:'Last name',
      //required: true,//default true
      //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
      placeholder:'last name',
      

   },
   sysName: {
      name: 'sysName',
      //type: 'text',
      label:'User name',
      //required: true,//default true
      //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
      placeholder:'unique user name',
      

   },
   passport:{
      name: 'passport',
      //type: 'text',
      label:'ID number.',
      //required: true,//default true
      //pattern: '[0-9]{9}',
      placeholder:'ID number',
  //invalidFeedback:'Fill in a field with 9 digits',
   },   
   password:{
      name: 'password',
      //type: 'text',
      label:'Password.',
      //required: true,//default true
      //pattern: '[0-9]{9}',
      placeholder:'password',
   //invalidFeedback:'Fill in a field with 9 digits',
   },
   email:{
      name: 'email',
      //type: 'text',
      label:'email',
      //required: true,//default true
      //pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
      placeholder:'',
     //invalidFeedback:'Fill the mandatory field',
   },
   address:{
      name: 'address',
      //type: 'text',
      label:'Address',
      //required: true,//default true
      //pattern: '',
      placeholder:'',
     //invalidFeedback:'current residental address field is mandatory',
   },
   phone:{
      name: 'phone',
      //type: 'text',
      label: 'Phone #' ,
      //required: false,//default true
      //pattern: '[0-9]{9,16}',
      placeholder:'Your phone number , digits only',
     //invalidFeedback:'Fill the mandatory field',
  
   },
   ravkav:{
      name: 'ravkav',
      //type: 'text',
      label:'Rav Kav No:',
      //required: false,//default true
      //pattern: '',
      placeholder:'',
     //invalidFeedback:'',
  
   },
   iamagree:{
      name: 'iamagree',
      //type: 'text',
      label:'I am agree with',
      //required: true,//default true
      //pattern: '',
      placeholder:'',
     //invalidFeedback:'',
  
   },

   pay : {
      terms:{
         ref:'/en/registration/payment/terms',//
         text:'Terms of use'
      },
      policy:{
         ref:'/en/registration/payment/policy',//
         text:'Privacy policy'
      },
   }      
};
const REGISTR_RU : IUserDetailsFieldsData = {
   lang:'en',
   direction:'ltr',
   title:'Зарегистрируйтесь в системе парковки велосипедов',
   title2:'Чтобы воспользоваться услугами системы, пожалуйста, заполните следующие данные',
  
  
   firstName: {
     name: 'firstName',
     //type: 'text',
     label:'Имя',
     //required: true,//default true
     //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
     placeholder:'Введите имя ',
   
  },   
   lastName: {
     name: 'lastName',
     //type: 'text',
     label:'Фамилия',
     //required: true,//default true
     //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
     placeholder:'Введите фамилию',
     
  
  },
  sysName: {
      name: 'lastName',
      //type: 'text',
      label:'Имя пользователя',
      //required: true,//default true
      //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
      placeholder:'уникальное имя пользователя',
      

   },
 
   password:{
      name: 'password',
      //type: 'text',
      label:'Пароль.',
      //required: true,//default true
      //pattern: '[0-9]{9}',
      placeholder:'пароль',
   //invalidFeedback:'Fill in a field with 9 digits',
   },


  passport:{
      name: 'passport',
      //type: 'text',
      label:'Удостоверение',
      //required: true,//default true
      //pattern: '[0-9]{9}',
      placeholder:'Удостоверение личности',
      
   },
   email:{
      name: 'email',
      //type: 'text',
      label:'Электронная почта',
      //required: true,//default true
      //pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
      placeholder:'Введите адрес электроннoй почты',
      
    },
   address:{
      name: 'address',
      //type: 'text',
      label:'Адрес проживания',
      //required: true,//default true
      //pattern: '',
      placeholder:'Введите ваш адрес проживания',
      
  
   },
   phone:{
      name: 'phone',
      //type: 'text',
      label: 'Номер телефона' ,
      //required: true,//default true
      //pattern: '[0-9\+\-]{10,15}',
      placeholder:'Введите номер телефона',
      
  
   },
   ravkav:{
      name: 'ravkav',
      //type: 'text',
      label:'Номер "Рав Кав"',
      //required: false,//default true
      //pattern: '',
      placeholder:'Введите номер "Рав Кав"',
     //invalidFeedback:'',
  
   },
   iamagree:{
      name: 'iamagree',
      //type: 'text',
      label:'я согласен/на',
      //required: true,//default true
      //pattern: '',
      placeholder:'',
     
  
   },

   pay : {
      terms:{
         ref:'/en/registration/payment/terms',//
         text:'Условия эксплуатации'
      },
      policy:{
         ref:'/en/registration/payment/policy',//
         text:'политика конфиденциальности'
      },
   }      
};  
const REGISTR_HE : IUserDetailsFieldsData = {
   lang:'he',
   direction:'rtl',
   title:'הרשמה למערכת חניון אופניים',
   title2:'כדי להשתמש בשירותי החניון אנא מלא את הפרטים הבאים',


   firstName: {
     name: 'firstName',
     //type: 'text',
     label:'שם פרטי',
     //required: true,//default true
     //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
     placeholder:'חובה למלא שמ פרטי' 
   
  },   
   lastName: {
     name: 'lastName',
     //type: 'text',
     label:'שם משפחה',
     //required: true,//default true
     //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
     placeholder:'חובה למלא שמ משפחה',
   },
   sysName: {
      name: 'lastName',
      //type: 'text',
      label:'שם משתמש',
      //required: true,//default true
      //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
      placeholder:'שם המשתמש חייב להיות ייחודי במערכת',
      

   },
   password:{
      name: 'password',
      //type: 'text',
      label:'סיסמה',
      //required: true,//default true
      //pattern: '[0-9]{9}',
      placeholder:'תמלא/ה סיסםה',
   //invalidFeedback:'Fill in a field with 9 digits',
   },


   passport:{
      name: 'passport',
      //type: 'text',
      label:'מספר ת.ז.',
      //required: true,//default true
      //pattern: '[0-9]{9}',
      placeholder: 'מספר תעדת זהות או דרכון',
     //invalidFeedback:'תמלא שדה ב 9 ספרות',
   },
 
   email:{
      name: 'email',
      //type: 'text',
      label:'אימייל',
      //required: true,//default true
      //pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
      placeholder: 'אימייל חובה',
     //invalidFeedback:'תמלא שדה חובה',
   },
   address:{
      name: 'address',
      //type: 'text',
      label:'כתובת מגורים',
      //required: true,//default true
      //pattern: '',
      placeholder: 'כתובת מגורים',
     //invalidFeedback:'תמלא שדה חובה',
   },
   phone:{
      name: 'phone',
      //type: 'text',
      label:'מספר טלפון',
      //required: true,//default true
      //pattern: '[0-9\+\-]{10,15}',
      placeholder: '',
     //invalidFeedback:'תמלא שדה חובה',
   },
   ravkav:{
      name: 'ravkav',
      //type: 'text',
      label:'מספר רב קו',
      //required: false,//default true
      //pattern: '',
      placeholder: '',
     //invalidFeedback:'',
   },
   iamagree:{
      name: 'iamagree',
      //type: 'text',
      label:'אני מסכים ל',
      //required: true,//default true
      //pattern: '',
      placeholder: '',
     //invalidFeedback:''
   },
  
   pay : {
      terms:{
         ref:'/he/registration/payment/terms',//
         text:'תנאי השימוש'
      },
      policy:{
         ref:'/he/registration/payment/policy',//
         text:'מדיניות הפרטיות'
      },
   }
};

const REGISTR_AR : IUserDetailsFieldsData = {
   lang:'ar',
   direction:'rtl',
   title:'التسجيل في نظام وقوف الدراجات الهوائية',
   title2:'لاستخدام خدمات موقف السيارات ، يرجى ملء التفاصيل التالية' ,
   firstName: {
     name: 'firstName',
     //type: 'text',
     label:'اسم شخصي',
     //required: true,//default true
     //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
     placeholder:'يجب عليك إدخال الاسم الأول',
   
  },   
  lastName: {
   name: 'lastName',
   //type: 'text',
   label:'اسم عائلة',
   //required: true,//default true
   //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
   placeholder:'يجب أن تملأ الاسم الأخير',
 },
 sysName: {
   name: 'lastName',
   //type: 'text',
   label:'اسم المستخدم',
   //required: true,//default true
   //pattern: '^[a-zA-Z\u0590-\u05FF\-\' ]+$',
   placeholder:'اسم مستخدم فريد',
 },
 password:{
   name: 'password',
   //type: 'text',
   label:'كلمة المرور',
   //required: true,//default true
   //pattern: '[0-9]{9}',
   placeholder:'كلمة المرور',
//invalidFeedback:'Fill in a field with 9 digits',
},

passport:{
      name: 'passport',
      //type: 'text',
      label:'رقم الهويه.',
      //required: true,//default true
      //pattern: '[0-9]{9}',
      placeholder: 'بطاقة الهوية أو رقم جواز السفر',
     //invalidFeedback:'املأ الحقل بـ 9 أرقام',
   },
   email:{
      name: 'email',
      //type: 'text',
      label:'بريد إلكتروني',
      //required: true,//default true
      //pattern: '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$',
      placeholder: 'email',
     //invalidFeedback:'املأ الحقل بتنسيق البريد الإلكتروني',
   },
   address:{
      name: 'address',
      //type: 'text',
      label:'عنوان السكن',
      //required: true,//default true
      //pattern: '',
      placeholder: '',
     //invalidFeedback:'املأ الحقل المطلوب',
   },
   phone:{
      name: 'phone',
      //type: 'text',
      label:'رقم الهاتف',
      //required: true,//default true
      //pattern: '[0-9\+\-]{10,15}',
      placeholder: '',
     //invalidFeedback: 'املأ الحقل المطلوب',
   },
   ravkav:{
      name: 'ravkav',
      //type: 'text',
      label: "رقم \"Rav Kav\"",
      //required: false,//default true
      //pattern: '',
      placeholder: '',
     //invalidFeedback:'املأ الحقل بـ 9 أرقام',
   },
   iamagree:{
      name: 'iamagree',
      //type: 'text',
      label:'أوافق على',
      //required: true,//default true
      //pattern: '',
      placeholder: '',
     //invalidFeedback:''
   },
  
   pay : {
      terms:{
         ref:'/ar/registration/payment/terms',//
         text:'תנאי השימוש'
      },
      policy:{
         ref:'/ar/registration/payment/policy',//
         text:'מדיניות הפרטיות'
      },
   }
};
export interface IUserDetailsFieldsMulti{
   en:IUserDetailsFieldsData;
   ru:IUserDetailsFieldsData;
   he:IUserDetailsFieldsData;
   ar:IUserDetailsFieldsData;
   
}
//IUserDetailsFieldsMulti = //

export const  USER_DATA_MULTI:Record<TLangNames,IUserDetailsFieldsData > =
{
  en: REGISTR_EN,
   ru: REGISTR_RU,
  he: REGISTR_HE,
  ar: REGISTR_AR,
  
}
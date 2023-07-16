import { BehaviorSubject, Observable, Subscription } from "rxjs";

export class TSubject<T>{ 
    private _subject$!:BehaviorSubject<T>;
    constructor(default0:T){
      this._subject$ = new BehaviorSubject<T>(default0);
    }
  
    public get subject$():Observable<T> { 
      return this._subject$.asObservable()
    }
  
    subArr:Subscription[] = [];
  
    public subscribe(fn:(arg:T)=>void): void | undefined {
      let sub:Subscription | undefined = undefined;
        try {
          sub = this._subject$.subscribe(fn);
          if(sub){
            this.subArr.push(sub);
          }
        } catch (error) {
          console.log(`TSubject<T>:attach error (${error})`)
        }
      
      
    }
  
    public destroy(){
      this.subArr.forEach(sub=>sub?.unsubscribe());
      this.subArr = [];
    }
   
    public get value() : T {
      return this._subject$.value;
    }
    public newNext(v : T): T{
      if(v != this.value){
        this.next(v);
      }
      return v;
      
    }
    public next(v : T) {
      this._subject$.next(v);
    }
    
  
  }
  
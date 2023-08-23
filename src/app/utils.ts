export function tokef2Date(tokef:string){
    do{
        if(tokef.length !== 5 && tokef[2] !== '/' ) break;
        let arr : string[]= tokef.split('/') ?? [];
        if(arr.length < 2) 
            break;
        let month = +arr[0];
        let year = +arr[1];
        month--;
        if(month < 0 || month > 11) 
            break;
                   
             year = (year + 2000);
        const d:Date = new Date(year,month);
        return d;
        
       // return year <= d.getFullYear() && month <= d.getMonth();


    }while(false);
    
    return undefined;
}
export function tokefIsActual(tokef:string){

    if(tokef.length !== 5 && tokef[2] !== '/' ) 
        return false;;
    let arr : string[]= tokef.split('/') ?? [];
    if(arr.length < 2) 
        return false;
    let month = +arr[0];
    let year = (+arr[1] % 100) + 2000;
        month--;
    if(month < 0 || month > 11) 
        return false;
    const d = new Date();
    
    return year >= d.getFullYear() && month >= d.getMonth();

}


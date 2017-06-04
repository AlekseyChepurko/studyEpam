/**
 * Created by Алексей on 03.06.2017.
 */

export default class Async {
    static getJson(url,callback=undefined){
        return fetch(url).then((response)=> response.json()).then((res)=>{
            return callback === undefined
                ? res
                : typeof callback === "function"
                    ? callback(res)
                    : ()=>{throw "Callback must be a function"}
                ;
        });
    }
}

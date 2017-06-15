/**
 * Created by Алексей on 03.06.2017.
 */
/**
 * Get JSON from url using fetch. After fetch resolving calls callback
 * @param {string} url
 * @param {function} callback
 * @returns {Promise.<TResult>}
 */
export default function getJSON(url,callback=undefined){
    return fetch(url).then((response)=> response.json()).then((res)=>{
        return callback === undefined
            ? res
            : typeof callback === "function"
                ? callback(res)
                : ()=>{throw "Callback must be a function"}
            ;
    });
}

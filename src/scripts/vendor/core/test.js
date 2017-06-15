/**
 * Created by Алексей on 04.06.2017.
 */

export default function test(testName,res,expected){
    if (res === expected)
        return console.log(`%c OK! - ${testName}`, 'color: green;');
    return console.log(`%c Failure - ${testName}: Expected ${expected} given ${res}`, 'color: red; font-weight: bold;');
}
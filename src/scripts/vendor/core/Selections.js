/**
 * Created by Алексей on 02.06.2017.
 */


export const selectFirst = (selector, element=document)=> element.querySelector(selector);
export const select = (selector, element=document)=> element.querySelectorAll(selector);
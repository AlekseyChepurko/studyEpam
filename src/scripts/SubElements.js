/**
 * Created by Алексей on 02.06.2017.
 */

import {classes} from './core/classes'

export const sub_elements = (function () {

    const open = function (el){
        classes.add(el.nextElementSibling, "active");
    };

    const close = function (el){
        classes.remove(el.parentNode, "active")
    };

    return{
        open: open,
        close: close
    }
}());
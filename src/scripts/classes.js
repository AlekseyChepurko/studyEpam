/**
 * Created by Алексей on 02.06.2017.
 */


export const classes = (function(){

    const add = function (cur,classToAdd) {
        const currentClasses = cur.className;
        if (currentClasses.indexOf(classToAdd) > -1)
            return;
        cur.className += ' '+classToAdd;
    };

    const remove = function (cur,classToRemove) {
        cur.className = cur.className.replace(' '+classToRemove, "");
    };

    const toggle = function (cur, className){
        const i = cur.className.indexOf(className);
        if (i > -1)
        {
            remove(cur, className);
            return;
        }

        add(cur, className);
    };

    return{
        add: add,
        remove: remove,
        toggle: toggle
    }
}());
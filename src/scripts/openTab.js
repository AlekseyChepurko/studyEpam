/**
 * Created by Алексей on 02.06.2017.
 */

import {select, selectFirst} from './core/Selections'

export const openTab = function (evt, tabName) {
    select(".tabcontent").forEach((item)=>{
        item.style.display = "none"
    });

    select(".tablink").forEach(item => {
        item.className = item.className.replace(" active", "")
    });

    selectFirst(`#${tabName}`).style.display = "block";
    evt.target.className += " active";
};
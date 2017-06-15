/**
 * Created by Алексей on 15.06.2017.
 */

import {classes} from 'Vendor/core/classes'
import {selectFirst, select} from 'Vendor/core/Selections'
import {sub_elements} from 'Vendor/core/SubElements'
import  Table from 'Vendor/Table/Table'
import {openTab} from 'Vendor/core/openTab'
import getJSON from 'Vendor/core/Async'
import {render} from 'Vendor/core/Component'

export default function CommonInit(testData, tabId){
    if(process.env.NODE_ENV !== 'production') {
        const tests = require('Vendor/core/Component.test');
        tests.run();
    }

    getJSON(testData,(tables)=>{

        tables.forEach((table)=>{
            let res = new Table({
                data:{
                    title: table.title,
                    header: table.header,
                    body: table.body,
                },
                attributes: {
                    class: "ololo"
                }
            });
            render(res, selectFirst(`.tabcontent#${tabId}`));
        });
    });


    select("nav.tab>button").forEach((tab) => {
        tab.addEventListener('click', (e)=>{
            e.preventDefault();
            openTab(e, e.target.getAttribute("for"))
        })
    });

    selectFirst("#defaultOpen").click();

    select(".to_show").forEach(item => {
        item.addEventListener('click', (e)=> {
            sub_elements.open(e.currentTarget);
        })
    });

    select(".btn__close_subElement").forEach(item=>{
        item.addEventListener('click', e=>{
            sub_elements.close(e.currentTarget);
        })
    });

    selectFirst("#fullscreen").addEventListener('click', (e)=>{
        const elem = e.target;
        const html = selectFirst("html");
        if (elem.requestFullscreen) {
            html.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            html.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            html.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            html.webkitRequestFullscreen();
        }
    }) ;

    selectFirst(".adaptive_menu__toogler").addEventListener('click', e => {
        classes.toggle(e.target, "active");
        classes.toggle(selectFirst(".adaptive_menu__wrap"), "active");
    });

    select(".dropdown").forEach(item => {
        item.addEventListener('click', e=>{
            classes.toggle(e.currentTarget, "active");
        })
    });
}
/**
 * Created by Алексей on 18.03.2017.
 */
import {classes} from './classes'
import {sub_elements} from './SubElements'
import {selectFirst, select} from './Selections'
import {openTab} from './openTab'

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
    // console.log("hi");
    // const e = new Event("keydown");
    // e.key="F11";
    // e.keyCode=122;
    // e.which=e.keyCode;
    // e.altKey=false;
    // e.ctrlKey=true;
    // e.shiftKey=false;
    // e.metaKey=false;
    // // e.bubbles=true;
    // console.log(document.dispatchEvent(e));
    // // console.log(e);
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

selectFirst("#nav_menu__togler").addEventListener('click', e => {
    classes.toggle(e.target.parentElement, "active");
});

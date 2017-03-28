/**
 * Created by Алексей on 18.03.2017.
 */


function openTab(evt, tabName) {
 
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// document.getElementById("defaultOpen").click();


var classes = (function(){
    var add = function (cur,classToAdd) {
        var currentClasses = cur.className;
        if (currentClasses.indexOf(classToAdd) > -1)
            return;
        cur.className += ' '+classToAdd;
    }

    var remove = function (cur,classToRemove) {
        cur.className = cur.className.replace(' '+classToRemove, "");
    }

    var toggle = function (cur, className){
        var i = cur.className.indexOf(className);
        if (i > -1)
        {
            remove(cur, className);
            return;
        }

        add(cur, className);
    }

    return{
        add: add,
        remove: remove,
        toggle: toggle,
    }
}());

var sub_elements = (function () {

    var open = function (el){
        classes.add(el.nextElementSibling, "active");
    }

    var close = function (el){
        classes.remove(el.parentNode, "active")
    }

    return{
        open: open,
        close: close,
    }
}());


var toShows = document.getElementsByClassName("to_show"),
    l = toShows.length;

for (var i = 0; i < l; i++ )
{
    toShows[i].onclick = function () {
        sub_elements.open(this);
    }
}
var closeBtns = document.getElementsByClassName("btn__close_subElement"),
    bl = closeBtns.length;
for (var i = 0; i < bl; i++ )
{
    closeBtns[i].onclick = function () {
        sub_elements.close(this);
    }
}


var fullBtn = document.getElementById("fullscreen").onclick = function(){

    var elem = this;
    var html = document.getElementsByTagName("html")[0];
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
    // var e = new Event("keydown");
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
};

var adaptiveMenu = document.getElementsByClassName("adaptive_menu__wrap")[0];
var adaptiveToggler = document.getElementsByClassName("adaptive_menu__toogler")[0].onclick = function()
{
    classes.toggle(this, "active");
    classes.toggle(adaptiveMenu, "active");
};

var dropDownItems = document.getElementsByClassName("dropdown");
var dropDownCount = dropDownItems.length;
console.log(dropDownCount);
for (var i=0; i<dropDownCount; i++)
{
    dropDownItems[i].onclick = function()
    {
        classes.toggle(this, "active");
    }
}
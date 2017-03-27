/**
 * Created by Алексей on 18.03.2017.
 */
function initMap() {

    // Create an array of styles.
    var icons = {
        info: {
            icon: '/img/info_icon.png'
        }
    }
    var styles =
        [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#2cff00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "2"
                    },
                    {
                        "gamma": "1.90"
                    },
                    {
                        "weight": "1.48"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "lightness": "-25"
                    },
                    {
                        "saturation": "10"
                    },
                    {
                        "gamma": "3.47"
                    },
                    {
                        "weight": "1.78"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#cdcdcd"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "saturation": "-14"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(43.0, 11.0),
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        disableDefaultUI: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


    function addMarker(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
    }

    var features = [
        {
            position: new google.maps.LatLng(47.483457, -106.765580),
            type: 'info'
        }, {
            position: new google.maps.LatLng(40.760128, -87.784489),
            type: 'info'
        }, {
            position: new google.maps.LatLng(63.817852, 36.329238),
            type: 'info'
        }, {
            position: new google.maps.LatLng(46.126233, 33.885631),
            type: 'info'
        }, {
            position: new google.maps.LatLng(51.002536, 15.168916),
            type: 'info'
        }, {
            position: new google.maps.LatLng(57.364324, 25.540009),
            type: 'info'
        }, {
            position: new google.maps.LatLng(43.120048, 123.450164),
            type: 'info'
        }
    ];

    for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
    }

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

}


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

document.getElementById("defaultOpen").click();


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
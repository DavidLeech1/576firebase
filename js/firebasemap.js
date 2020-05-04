var map;
var markers=[];

// Initialize Firebase();
var config = {
    apiKey: "AIzaSyCdB0eGkYnWevu0ulZkJA_aOTRkty5ApNw",
    authDomain: "firetest-2eff9.firebaseapp.com",
    databaseURL: "https://firetest-2eff9.firebaseio.com",
    projectId: "firetest-2eff9",
    storageBucket: "firetest-2eff9.appspot.com",
    messagingSenderId: "767045370468",
    appId: "1:767045370468:web:724a9e2566b04e5c3d5571",
    measurementId: "G-QTCZ8NLCFH"
};
firebase.initializeApp(config);

const auth = firebase.auth();

// create map
function initMap() {
    var myLatLng = { lat: 43.0731, lng: -89.4012 };

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 11,
        center: myLatLng
    });


}

//Test connection to the Firestore
var db = firebase.firestore();

//run once at refresh to display the markers
var checkedValue = $('.messageCheckbox:checked').val();
db.collection("stores")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            var latitude = doc.data().lat;
            var longitude = doc.data().long;
            var name = doc.data().name;

            // custom icon based on availability
            var Customicons = {
                low: {
                    icon: 'img/low.png'
                },
                high: {
                    icon: 'img/high.png'
                },
                none: {
                    icon: 'img/none.png'
                }
            };
            // reading specific data from Firebase database
            var water = doc.data().water;
            var dairy = doc.data().dairy;
            var cleaning = doc.data().cleaning;
            var paper = doc.data().paper;
            var meat = doc.data().meat;
            var bread = doc.data().bread;
            var produce = doc.data().produce;

            var address = doc.data().Address;



            // display availability based on the product type that is checked
            if (checkedValue == "water") {
                var producttype = water;
            }
            if (checkedValue == "bread_grain") {
                var producttype = bread;
            }
            if (checkedValue == "dairy_products") {
                var producttype = dairy;
            }
            if (checkedValue == "meat_seafood") {
                var producttype = meat;
            }
            if (checkedValue == "paper_products") {
                var producttype = paper;
            }
            if (checkedValue == "produce") {
                var producttype = produce;
            }
            if (checkedValue == "cleaning_products") {
                var producttype = cleaning;
            }


            var icon = Customicons[producttype] || {};

            // create the marker info window text
            var contentString = "<p>" + "<b>" + "Store Name: " + "</b>" + name + "<br />" +
                "<b>" + "Address: " + "</b>" + address + "<br />" +
                "<b>" + "Dairy: " + "</b>" + dairy + "<br />" +
                "<b>" + "Bread & Grains: " + "</b>" + bread + "<br />" +
                "<b>" + "Fresh Produce: " + "</b>" + produce + "<br />" +
                "<b>" + "Meat & Seafood: " + "</b>" + meat + "<br />" +
                "<b>" + "Bottled Water: " + "</b>" + water + "<br />" +
                "<b>" + "Paper Products: " + "</b>" + paper + "<br />" +
                "<b>" + "Cleaning Products: " + "</b>" + cleaning + "<br />" +
                "</p>";
            // marker infowindow
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            // Add the markers to the map
            var marker = new google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                icon: icon.icon,
                map: map,
                title: name
            });
            markers.push(marker);
            console.log(markers);
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            })


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Run each time a box is checked or a drop down list is changed
// This updates the markers that are displayed
function changecheck() {
    var checkedValue = $('.messageCheckbox:checked').val();

    // remove all the existing markers
    setMapOnAll(null);
    markers=[];
    console.log(markers);

    // runs through each store in the database and adds a marker
    db.collection("stores")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var latitude = doc.data().lat;
                var longitude = doc.data().long;
                var name = doc.data().name;

                var Customicons = {
                    low: {
                        icon: 'img/low.png'
                    },
                    high: {
                        icon: 'img/high.png'
                    },
                    none: {
                        icon: 'img/none.png'
                    }
                };
                var water = doc.data().water;
                var dairy = doc.data().dairy;
                var cleaning = doc.data().cleaning;
                var paper = doc.data().paper;
                var meat = doc.data().meat;
                var bread = doc.data().bread;
                var produce = doc.data().produce;

                var address = doc.data().Address;
                var type = doc.data().type;

                //checkedValue = "bread_grain";
                console.log(checkedValue);
                console.log(bread);

                if (checkedValue == "water") {
                    var producttype = water;
                }
                if (checkedValue == "bread_grain") {
                    var producttype = bread;
                }
                if (checkedValue == "dairy_products") {
                    var producttype = dairy;
                }
                if (checkedValue == "meat_seafood") {
                    var producttype = meat;
                }
                if (checkedValue == "paper_products") {
                    var producttype = paper;
                }
                if (checkedValue == "produce") {
                    var producttype = produce;
                }
                if (checkedValue == "cleaning_products") {
                    var producttype = cleaning;
                }
                console.log(producttype);

                var icon = Customicons[producttype] || {};

                var contentString = "<p>" + "<b>" + "Store Name: " + "</b>" + name + "<br />" +
                    "<b>" + "Address: " + "</b>" + address + "<br />" +
                    "<b>" + "Dairy: " + "</b>" + dairy + "<br />" +
                    "<b>" + "Bread & Grains: " + "</b>" + bread + "<br />" +
                    "<b>" + "Fresh Produce: " + "</b>" + produce + "<br />" +
                    "<b>" + "Meat & Seafood: " + "</b>" + meat + "<br />" +
                    "<b>" + "Bottled Water: " + "</b>" + water + "<br />" +
                    "<b>" + "Paper Products: " + "</b>" + paper + "<br />" +
                    "<b>" + "Cleaning Products: " + "</b>" + cleaning + "<br />" +
                    "</p>";

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                // What store is selected from the dropdown list
                var storenameselection = document.getElementById("store_label_one");
                var storenameselectionresult = storenameselection.options[storenameselection.selectedIndex].value;
                console.log(storenameselectionresult);
                // What store type is selected
                var storetypeselection = document.getElementById("store_type_one");
                var storetypeselectionresult = storetypeselection.options[storetypeselection.selectedIndex].value;
                console.log(storetypeselectionresult);


                // Only adds markers if the user has selected all stores or a specific store
                if ((storenameselectionresult=="All" || storenameselectionresult==name) && (storetypeselectionresult=="All" || storetypeselectionresult==type)) {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: latitude,
                            lng: longitude
                        },
                        icon: icon.icon,
                        map: map,
                        title: name
                    });
                    markers.push(marker);
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    })
                }

            });
            console.log(markers);
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
// updates the firebase database based on the report that is filled out
function updateFirebase(){

    // get the availability of each product from the report
    var ele = document.getElementsByName("water");
        for (var i = 0, length = ele.length; i < length; i++) {
        if (ele[i].checked) {
            var newwaterlevel=ele[i].value;
            console.log(newwaterlevel);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele1 = document.getElementsByName("dairy_products");
    for (var i = 0, length = ele1.length; i < length; i++) {
        if (ele1[i].checked) {
            var newdairy=ele1[i].value;
            console.log(newdairy);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele2 = document.getElementsByName("bread_grain");
    for (var i = 0, length = ele2.length; i < length; i++) {
        if (ele2[i].checked) {
            var newbread=ele2[i].value;
            console.log(newbread);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele3 = document.getElementsByName("produce");
    for (var i = 0, length = ele3.length; i < length; i++) {
        if (ele3[i].checked) {
            var newproduce=ele3[i].value;
            console.log(newproduce);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele4 = document.getElementsByName("meat_seafood");
    for (var i = 0, length = ele4.length; i < length; i++) {
        if (ele4[i].checked) {
            var newmeat=ele4[i].value;
            console.log(newmeat);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele5 = document.getElementsByName("paper_products");
    for (var i = 0, length = ele5.length; i < length; i++) {
        if (ele5[i].checked) {
            var newpaper=ele5[i].value;
            console.log(newpaper);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele6 = document.getElementsByName("cleaning_products");
    for (var i = 0, length = ele6.length; i < length; i++) {
        if (ele6[i].checked) {
            var newcleaning=ele6[i].value;
            console.log(newcleaning);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    // Get the name of the store to be updated
    var storename = document.getElementById("store_label");
    var storenameresult = storename.options[storename.selectedIndex].value;


    // Update the Firebase database with the info from the report
    db.collection('stores').doc(storenameresult).update({
        water: newwaterlevel,
        dairy: newdairy,
        bread: newbread,
        produce: newproduce,
        meat: newmeat,
        paper: newpaper,
        cleaning: newcleaning
    })

    // Wait one second then reload the map with updated info
    setTimeout(location.reload.bind(location), 1000);
    return false;

}



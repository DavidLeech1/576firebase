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


function initMap() {
    var myLatLng = { lat: 43.0731, lng: -89.4012 };

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 11,
        center: myLatLng
    });


}

/*
function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        dairy: dairy1,
        water: water1,
        name: body,
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('stores').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/stores/' + newPostKey] = postData;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}
**/

//Test connection to the Firestore
var db = firebase.firestore();

var checkedValue = $('.messageCheckbox:checked').val();
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


            //console.log(water);
            //console.log(latitude);
            //console.log(longitude);
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








function changecheck() {
    var checkedValue = $('.messageCheckbox:checked').val();
    //alert(checkedValue);

    console.log(markers);


/*
    //NEED TO ADD CODE TO CLEAR ALL MARKERS
    function clearMarkers(){
        setMapOnAll(null);
    }
    function deleteMarkers(){
        clearMarkers();
        markers=[];
    }**/
    setMapOnAll(null);
    markers=[];
    console.log(markers);


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


                //console.log(water);
                //console.log(latitude);
                //console.log(longitude);

                var storenameselection = document.getElementById("store_label_one");
                var storenameselectionresult = storenameselection.options[storenameselection.selectedIndex].value;
                console.log(storenameselectionresult);

                var storetypeselection = document.getElementById("store_type_one");
                var storetypeselectionresult = storetypeselection.options[storetypeselection.selectedIndex].value;
                console.log(storetypeselectionresult);



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

function updateFirebase(){
//    const fb=firebase.database().ref()
//    water = document.getElementsByName("water").value
    //function myfunction(water){

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
        //console.log(ele.length);
    //}

    /*
    var storename = document.getElementsByName("store_label");
    for (var i = 0, length = storename.length; i < length; i++) {
        if (storename[i].selected) {
            var storeupdate= storename[i].value;
            var q = storeupdate.toString();
            console.log(q);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }**/
    var storename = document.getElementById("store_label");
    var storenameresult = storename.options[storename.selectedIndex].value;
    //alert(storenameresult);


    db.collection('stores').doc(storenameresult).update({
        water: newwaterlevel,
        dairy: newdairy,
        bread: newbread,
        produce: newproduce,
        meat: newmeat,
        paper: newpaper,
        cleaning: newcleaning
    })
    //var hellop = "hellothere";
    //console.log(hellop);
    //location.reload();
    setTimeout(location.reload.bind(location), 1000);
    return false;

}

//db.collection('stores').doc('ALDI').update({
//    water: 'low'
//})

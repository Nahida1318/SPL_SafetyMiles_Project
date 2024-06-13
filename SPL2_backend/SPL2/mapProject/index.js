var map = L.map('map')

map.setView([23.7457455, 90.4237244], 13)

let policeData = []

async function getPoliceData() {
    const response = await fetch("http://localhost:5001/api/incident/all");
    policeData = await response.json();
    console.log(policeData);

    for (let i = 0; i < policeData.length; i++) {
        let data = policeData[i]
        let coords = [data['latitude'], data['longitude']]
        L.marker(coords).addTo(map);
        L.marker(coords, {
            icon: L.divIcon({
                html: data['incident'],
                className: 'text-below-marker',
            })
        }).addTo(map);
    }
}

getPoliceData()

let marker, circle;

navigator.geolocation.getCurrentPosition((position) => {

    const lat = position.coords.latitude
    const lng = position.coords.longitude
    const accuracy = position.coords.accuracy

    map.setView([lat, lng], 13);

    if (marker) {
        map.removeLayer(marker)
        map.removeLayer(circle)
    }

    // marker = L.marker([lat, lng]).addTo(map);
    // circle = L.circle([lat, lng], {
    //     color: 'red',
    //     fillColor: '#f03',
    //     fillOpacity: 0.5,
    //     radius: accuracy
    // }).addTo(map);


}, (error) => {
    console.log(error)
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




// navigator.geolocation.watchPosition((position) => {

//     const lat = position.coords.latitude
//     const lng = position.coords.longitude
//     const accuracy = position.coords.accuracy


//     if (marker) {
//         map.removeLayer(marker)
//         map.removeLayer(circle)
//     }

//     marker = L.marker([lat, lng]).addTo(map);
//     circle = L.circle([lat, lng], {
//         color: 'red',
//         fillColor: '#f03',
//         fillOpacity: 0.5,
//         radius: accuracy
//     }).addTo(map);


// }, (error) => {

//     console.log(error)
// })

var pointA = L.latLng(23.7428301, 90.4263129);
var pointB = L.latLng(23.794057, 90.2910214);
// var routeControl = L.Routing.control({
//     waypoints: [
//         pointA,
//         pointB
//     ]
// }).addTo(map);


// routeControl.on('routesfound', function (e) {
//     var routes = e.routes;
//     var route = routes[0];
//     var waypoints = route.coordinates;

//     console.log(waypoints);
// });

// Define waypoints (replace with your actual points)
var pointA = L.latLng(23.7428301, 90.4263129);
var pointB = L.latLng(23.794057, 90.2910214);



routeControl = L.Routing.control({
    waypoints: [
        pointA,
        pointB
    ],
    routeWhileDragging: true,
    showAlternatives: true,
    router: new L.Routing.GraphHopper('65a6ed8f-3edf-44ca-a7cf-a83806334864'),
}).addTo(map);

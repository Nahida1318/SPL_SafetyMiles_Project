var map = L.map('map')

navigator.geolocation.getCurrentPosition((position) => {

    const lat = position.coords.latitude
    const lng = position.coords.longitude
    const accuracy = position.coords.accuracy

    map.setView([lat,lng], 13);


}, (error) => {
    console.log(error)
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



let marker, circle;

navigator.geolocation.watchPosition((position) => {

    const lat = position.coords.latitude
    const lng = position.coords.longitude
    const accuracy = position.coords.accuracy
    console.log(lat,lng,accuracy)

    if(marker) {
        map.removeLayer(marker)
        map.removeLayer(circle)
    }

    marker = L.marker([lat, lng]).addTo(map);
    circle = L.circle([lat, lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: accuracy
    }).addTo(map);


}, (error) => {

    console.log(error)
})

// // Define waypoints (replace with your actual points)
// var pointA = L.latLng(23.7428301,90.4263129);
// var pointB = L.latLng(23.794057,90.2910214);

// // Create a routing control
// L.Routing.control({
//     waypoints: [
//         pointA,
//         pointB
//     ]
//     routeWhileDragging: true
// }).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(23.7428301,90.4263129),
        L.latLng(23.794057,90.2910214)
    ]
  }).addTo(map);
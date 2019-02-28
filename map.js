'use strict'

console.log ('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV5cHJpZ292IiwiYSI6ImNqc280aHdoajBqMzY0NG41ODRwOG0wZnAifQ.9UHLZRigw6UorfQZwQe4uw'

let map = new mapboxgl.Map({
   
    container: 'map',
   	style: 'mapbox://styles/mapbox/streets-v10',
    center: [-73.96024,40.80877],
    zoom: 12,

})

let navigation = new mapboxgl.NavigationControl({
	
	showCompass: false

})

map.addControl (navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
	
	maxWidth: 80,
	unit: 'imperial'

})

map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl ({
	
	positionOptions: {
		enableHighAccuracy: true
	},
	trackUserLocation: true,
	showUserLocation: true,
	fitBoundsOptions: {
	}
})

map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event){
	
	let lng = event.coords.longitude
	let lat = event.coords.latitude

	console.log('geolocated:', lng, lat)

	document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event){
	
	let lng = event.lngLat.lng
	let lat = event.lngLat.lat

	console.log("clicked:", lng, lat)

	document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let data = [
    {
        location: [-73.95154,40.72379],
        content: 'Forma: Yummy new pasta place.'
    },
    {
        location: [-73.95789,40.71992],
        content: 'Cheeseboat: Hearty Georgian food.' 
    },
    {
        location: [-73.95676,40.72233],
        content: 'Westlight: Cocktail bar with nice views.'
    },
    {
    	location: [-73.96079, 40.71894],
    	content: 'House of Small Wonder: Petite brunch eatery.'
    },
    {
    	location:[-73.96196, 40.71388],
    	content: 'Vanessa Dumpling House: Hand-made dumplings! <br /><img src="https://b.zmtcdn.com/data/pictures/1/16790881/04c4ac305149db1415ab8f18f42c6bc2.jpg" />'
    },
    ]

data.forEach(function(d) {

	let marker = new mapboxgl.Marker()    
	marker.setLngLat(d.location)
	marker.addTo(map)  

	let popup = new mapboxgl.Popup()
	popup.setHTML(d.content)
	marker.setPopup(popup)

})



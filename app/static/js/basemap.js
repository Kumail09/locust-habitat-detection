var map = L.map("map", {
    attributionControl: false,
}).setView([28, 60], 5);

L.control.scale({position: 'bottomright'}).addTo(map);
map.options.minZoom = 2;
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en',{
    maxZoom: 20,
    noWrap: false,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    noWrap: false,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    noWrap: false,
    subdomains:['mt0','mt1','mt2','mt3']
});

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    noWrap: false,
    subdomains:['mt0','mt1','mt2','mt3']
});

var searchLayerGroup = L.layerGroup();


var baseMaps = {
  "Street": googleStreets,
  "Hybrid": googleHybrid,
  "Terrain": googleTerrain,
  "Satellite": googleSat,
};

var LayerControl = L.control.layers(baseMaps).addTo(map);

function getColor(d) {
            var max = 150;
            var min = 10;
            var green = Math.floor(Math.random() * (max - min + 1)) + min;
    return "rgb(0," + green + ",0)";}


function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 0.7,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
}
var pakshp;

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}




async function addshp(geoserver_url, styleInfo, name){
    const data = await fetch(geoserver_url).then((response) => response.json())
    .then((data) => {
    return data;})
    var lyr = await L.geoJson(data, {style: styleInfo, onEachFeature:function(feature, layer) {
                // layer.on('click', function(){
                //     var doc = document.getElementById('home');
                //     doc.getElementsByTagName('p')[1].innerHTML = htmlfraud});

            if (feature.properties && feature.properties.NAME_2) {
                layer.bindPopup(feature.properties.NAME_2, {closeButton: false, offset: L.point(0, 0)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
            }
            else if (feature.properties && feature.properties.CNTRY_NAME){
                layer.bindPopup(feature.properties.CNTRY_NAME, {closeButton: false, offset: L.point(0, 0)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
            }
        },
        }).addTo(map);
        searchLayerGroup.addLayer(lyr );
        if(name){LayerControl.addOverlay(lyr, name)};
    

}

pakshp = addshp(
    "http://localhost:8585/geoserver/fyp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fyp%3APAK_adm2&maxFeatures=50&outputFormat=application%2Fjson",
    style, 'Pakistan');

var linekash = addshp('http://localhost:8585/geoserver/fyp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fyp%3ALineNew&maxFeatures=50&outputFormat=application%2Fjson',
    {   weight: 2,
        opacity: 0.7,
        color: 'red',
        dashArray: '3',
    });


var region = addshp("http://localhost:8585/geoserver/fyp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fyp%3AEth_Ken_Som_Uga&maxFeatures=50&outputFormat=application%2Fjson",
    style, 'Study Region');



map.on('click', function(e){
    var doc = document.getElementById('home');
    console.log(doc);

})


map.removeLayer(searchLayerGroup)

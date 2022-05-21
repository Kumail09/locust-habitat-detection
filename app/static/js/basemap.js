var map = L.map("map", {
    attributionControl: false,
}).setView([34, 100], 2);

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

var baseMaps = {
  "Street": googleStreets,
  "Hybrid": googleHybrid,
  "Terrain": googleTerrain,
  "Satellite": googleSat,
};

var LayerControl = L.control.layers(baseMaps).addTo(map);
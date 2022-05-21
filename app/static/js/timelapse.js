var map = L.map('map', {
    zoom: 7,
    center: [30, 70],
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: "2020-06-01/2021-06-01",
        period: "PT1H"
    },
    timeDimensionControl: true,
});

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


var LayerControl = L.control.layers(baseMaps);


var wmsUrl = "http://localhost:8585/geoserver/ps/wms?"
var wmsLayer = L.tileLayer.wms(wmsUrl, {
    layers: 'fyp:Maxent-Pakistan',
    format: 'image/png',
    transparent: true,
    // attribution: 'SOCIB HF RADAR | sea_water_velocity'
});

// Create and add a TimeDimension Layer to the map
var tdWmsLayer = L.timeDimension.layer.wms(wmsLayer);
tdWmsLayer.addTo(map);


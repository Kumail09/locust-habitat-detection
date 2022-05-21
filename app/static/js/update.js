/**Add layers (Maxent/Ahp) from Geoserver */
var maxent_pk = null;
var maxent_sa = null;


function addModelLyrs(month, year, type){
    
    var base_url = `http://localhost:8585/geoserver/fyp/wms?&time=${year}-${month}-01`
    // var base_url = `http://localhost:8585/geoserver/fyp/wms?`
    
    if (map.hasLayer(maxent_pk)){
        map.removeLayer(maxent_pk);
        console.log('Removed');
    }
        maxent_pk = L.tileLayer.wms(base_url, {
            layers: 'fyp:Maxent-Pakistan',
            format: 'image/png',
            transparent: true,
            attribution: "Maxent model @ Pakistan"
            }).addTo(map);            

    if (map.hasLayer(maxent_sa)){
        map.removeLayer(maxent_sa)
        console.log('Removed');
    }
        maxent_sa = L.tileLayer.wms(base_url, {
            layers: 'fyp:Maxent-StudyArea',
            format: 'image/png',
            transparent: true,
            attribution: "Maxent model @ Study Region"
            }).addTo(map);

    }

$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
 
$(function() {
    $('#update-form').submit(function() {
        var result = $('#update-form').serializeObject();
        console.log(result);
        addModelLyrs(result.month, result.year, 1)
        return false;
    });
});
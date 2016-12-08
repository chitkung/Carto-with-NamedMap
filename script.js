var map;

function initMap() {

    var mapOptions = {
        center: new google.maps.LatLng(13.723906977109397, 100.6330113463595),
        zoom: 8
    };

    //Call element
    var map_canvas = document.getElementById("map-canvas");
    //Create maps with option
    map = new google.maps.Map(map_canvas, mapOptions);

    createCartoLayout(map);
    google.maps.event.addListener(map, "idle", function (event) {

    });
}

function createCartoLayout(map) {

    //For nectec_test_namedmap.json
    var userName = "nectec-admin";
    var templateName = "nectec_test_namedmap";
    var layerName = "agri_province_boundary";

    //For agrimap_web_namedmap_template.json
    //    var userName = "nectec-agrimap";
    //    var templateName = "agrimap_web_namedmap";
    //    var layerName = "agri_province_boundary";

    var layerSource = {
        user_name: userName,
        type: "namedmap",
        named_map: {
            name: templateName,
            layers: [{
                layer_name: layerName
            }]
        }
    };


    cartodb.createLayer(map, layerSource).done(function (cartoDBLayer) {

        var css = "#untitle{ polygon-fill: #94bc0f; polygon-opacity: 0; line-color: #000000; line-width: 2.2; line-opacity: 0.5; }";

        var sql = "SELECT * FROM agri_province_boundary";
        var index = 0;

        cartoDBLayer.setParams("css_layer", css);
        cartoDBLayer.setParams("sql_statement", sql);

        map.overlayMapTypes.clear();
        map.overlayMapTypes.setAt(index, cartoDBLayer);
    });
}

google.maps.event.addDomListener(window, 'load', initMap);
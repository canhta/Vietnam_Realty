/*!
 * GMap
 * Copyright (c) qvsinh@yahoo.com
 * 
 */


var inputPostMapId = 'googleMap';
var inputMapBoxSearchHtmlId = 'searchMapAddress';
var mapContainerHtmlId = 'mapContainer';
var defaultLat = 21.028711;
var defaultLon = 105.852456;
var defaultZoom = 20;

		
		
function searchAddress(){
    
    if($('#'+inputMapBoxSearchHtmlId).val()!='' && $('#'+inputMapBoxSearchHtmlId).val()!=' '){
        showAddress($('#'+inputMapBoxSearchHtmlId).val());
    }
}
		
function loadMap() {
    if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById(mapContainerHtmlId));
       // map.addControl(new GSmallMapControl());
        //dong nay dung de keo dai cai zoom ra
        map.addControl(new GLargeMapControl());
        map.addControl(new GMapTypeControl());
        var center = new GLatLng(defaultLat,defaultLon);
        map.setCenter(center, defaultZoom);
        geocoder = new GClientGeocoder();
        var marker = new GMarker(center, {
            draggable: true
        });
        map.addOverlay(marker);
        var message = center.lat().toFixed(5) + ',' + center.lng().toFixed(5);
        document.getElementById(inputPostMapId).value = message;
        GEvent.addListener(marker, "dragend", function() {
            var point = marker.getPoint();
            map.panTo(point);
            var message = point.lat().toFixed(5) + ',' + point.lng().toFixed(5);
            document.getElementById(inputPostMapId).value = message;
        });
        GEvent.addListener(map, "moveend", function() {
            map.clearOverlays();
            var center = map.getCenter();
            var marker = new GMarker(center, {
                draggable: true
            });
            map.addOverlay(marker);
            var message = center.lat().toFixed(5) + ',' + center.lng().toFixed(5);
            document.getElementById(inputPostMapId).value = message;
            GEvent.addListener(marker, "dragend", function() {
                var point =marker.getPoint();
                map.panTo(point);
                var message = point.lat().toFixed(5) + ',' + point.lng().toFixed(5);
                document.getElementById(inputPostMapId).value = message;
            });
        });
    }
}
		
function showAddress(address) {
    var map = new GMap2(document.getElementById(mapContainerHtmlId));
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());
    if (geocoder) {
        geocoder.getLatLng(
            address,
            function(point) {
                if (!point) {
                    alert("Xin loi, Khong biet " + address + ' o dau!');
                    var message = defaultLat + ',' + defaultLon;
                    document.getElementById(inputPostMapId).value = message;

                    map.clearOverlays()
                    map.setCenter(point, 14);
                    var marker = new GMarker(point, {
                        draggable: true
                    });
                    map.addOverlay(marker);

                    GEvent.addListener(marker, "dragend", function() {
                        var pt = marker.getPoint();
                        map.panTo(pt);
                        var message = pt.lat().toFixed(5) + ',' + pt.lng().toFixed(5);
                        document.getElementById(inputPostMapId).value = message;
                    });


                    GEvent.addListener(map, "moveend", function() {
                        map.clearOverlays();
                        var center = map.getCenter();
                        var marker = new GMarker(center, {
                            draggable: true
                        });
                        map.addOverlay(marker);
                        var message = center.lat().toFixed(5) + ',' + center.lng().toFixed(5);
                        document.getElementById(inputPostMapId).value = message;
                        GEvent.addListener(marker, "dragend", function() {
                            var pt = marker.getPoint();
                            map.panTo(pt);
                            var message = pt.lat().toFixed(5) + ',' + pt.lng().toFixed(5);
                            document.getElementById(inputPostMapId).value = message;
                        });

                    });
                } else {
                    var message = point.lat().toFixed(5) + ',' + point.lng().toFixed(5);
                    document.getElementById(inputPostMapId).value = message;

                    map.clearOverlays()
                    map.setCenter(point, 14);
                    var marker = new GMarker(point, {
                        draggable: true
                    });
                    map.addOverlay(marker);

                    GEvent.addListener(marker, "dragend", function() {
                        var pt = marker.getPoint();
                        map.panTo(pt);
                        var message = pt.lat().toFixed(5) + ',' + pt.lng().toFixed(5);
                        document.getElementById(inputPostMapId).value = message;
                    });


                    GEvent.addListener(map, "moveend", function() {
                        map.clearOverlays();
                        var center = map.getCenter();
                        var marker = new GMarker(center, {
                            draggable: true
                        });
                        map.addOverlay(marker);
                        var message = center.lat().toFixed(5) + ',' + center.lng().toFixed(5);
                        document.getElementById(inputPostMapId).value = message;
                        GEvent.addListener(marker, "dragend", function() {
                            var pt = marker.getPoint();
                            map.panTo(pt);
                            var message = pt.lat().toFixed(5) + ',' + pt.lng().toFixed(5);
                            document.getElementById(inputPostMapId).value = message;
                        });

                    });

                }
            }
            );
    }
}
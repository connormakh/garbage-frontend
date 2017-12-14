import {Directive, Input} from "@angular/core";
import {GoogleMapsAPIWrapper} from "@agm/core";
// import {google} from "@agm/core/services/google-maps-types";
declare var google: any;

@Directive({
  selector: 'ngx-map-directions'
})
export class MapDirectionsDirective {
  @Input() origin;
  @Input() destination;
  @Input() waypoints;
  @Input() ind;
  private infoWindow = null

  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}

  randomColor() {
    var colors = ['red', 'blue', 'pink', 'purple', 'brown']
    return "#"+((1<<24)*Math.random()|0).toString(16);
  }

  ngOnInit(){
    if (this.origin != null) {
      console.log(this.waypoints)
      var waypointString = []
      for (let wpt of this.waypoints.slice(1)) {
        waypointString.push({location: {lat: wpt[0], lng:wpt[1]}, stopover: true})
      }
      this.gmapsApi.getNativeMap().then(map => {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(map);
        directionsDisplay.setOptions({
          polylineOptions: {
            strokeColor: this.randomColor(),
            strokeOpacity: 2.0,
            strokeWeight: 10
          }
        })
        directionsService.route({
          origin: this.origin[0] +"," +this.origin[1] +"",
          destination: this.destination[0]+"," +this.destination[1],
          waypoints: waypointString ,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            console.log(response)
            directionsDisplay.setDirections(response);

              var path = directionsDisplay.getDirections().routes[0].overview_path;
              var eventLine = new google.maps.Polyline({
                path: path,
                visible: true,
                strokeOpacity: 0,
                zIndex: 1000
              });
              eventLine.setMap(map);
              google.maps.event.addListener(eventLine, 'mouseover', function(e) {
                if (this.infoWindow != null) {
                  this.infoWindow.close();
                }
                this.infoWindow = new google.maps.InfoWindow();
                this.infoWindow.setPosition(e.latLng);
                this.infoWindow.setContent("Route");
                this.infoWindow.open(map);
              });

              google.maps.event.addListener(eventLine, 'mouseout', function(e) {
                if (this.infoWindow != null) {
                  this.infoWindow.close();
                }
              });

          } else {
            // window.alert('Directions request failed due to ' + status);
          }
        });

      });
    }

  }
}

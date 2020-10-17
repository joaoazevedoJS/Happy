import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg'

function mapIcon(x: number = 0, y: number = 0) {
  return Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [x, y]
  })
}

export default mapIcon
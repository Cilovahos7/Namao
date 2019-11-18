import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../services/data.service';

import { LoadingController, MenuController, PopoverController, IonSlides } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';

declare var mapboxgl:any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit, OnInit{

  constructor(private aFAuth: AngularFireAuth, private servicio: DataService,
    private loadingController: LoadingController, private router: Router, private menuCtrl: MenuController,
    private popo:PopoverController) {}

loading: any;

ngOnInit() {
// this.presentLoading('Iniciando...');

// setTimeout(() => {
//   this.loading.dismiss();
// }, 1500);

}

async presentLoading(message: string) {
this.loading = await this.loadingController.create({
message,
translucent: true,
cssClass: 'custom-class custom-loading'
// duration: 1000
});
return this.loading.present();

}

toggleMenu() {
this.menuCtrl.toggle();
}

async mostrarPopo(evento) {
const popover = await this.popo.create({
component: PopoverComponent,
event: evento,
translucent: true
});
return await popover.present();
}

ngAfterViewInit(){

  mapboxgl.accessToken = 'pk.eyJ1IjoibmFtYW8iLCJhIjoiY2syaHlzNWR0MWF5MjNjcDBsZjEwN254ayJ9.wtuNoltshUqJFvxbuy8qJw';
 
  
  const places = {
    "type": "FeatureCollection",
    "features": [{
    "type": "Feature",
    "properties": {
    "icon": "restaurant"
    },
    "geometry": {
    "type": "Point",
    "coordinates": [-75.57146361715063, 6.302418637954631]
    }
    }, {
    "type": "Feature",
    "properties": {
    "icon": "bar"
    },
    "geometry": {
    "type": "Point",
    "coordinates": [-75.56915666615181, 6.302461909947922]
    }
    }, {
    "type": "Feature",
    "properties": {
    "icon": "bar"
    },
    "geometry": {
    "type": "Point",
    "coordinates": [-75.56684464745452, 6.301390093194712]
    }
    }, {
    "type": "Feature",
    "properties": {
    "icon": "bar"
    },
    "geometry": {
    "type": "Point",
    "coordinates": [-75.57047462965687, 6.300361165783329]
    }
    }, {
    "type": "Feature",
    "properties": {
    "icon": "restaurant"
    },
    "geometry": {
    "type": "Point",
    "coordinates": [-75.56780555935218, 6.304032116403704]
    }
    },
    {
    "type": "Feature",
    "properties": {
    "icon": "restaurant"
    },
    "geometry": {
    "type": "Point",
    "coordinates": [-75.5660144302432, 6.302724140299176]
    }
    }]
    };
     
    const layerIDs = []; // Will contain a list used to filter against.
    const filterInput = document.getElementById('filter-input');
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-75.56872899797011, 6.30108984746613],
    zoom: 15.5
    });
     
    map.on('load', function() {
    // Add a GeoJSON source containing place coordinates and information.
    map.addSource('places', {
    "type": "geojson",
    "data": places
    });
     
    places.features.forEach(function(feature) {
      const symbol = feature.properties['icon'];
      const layerID = 'poi-' + symbol;
     
    // Add a layer for this symbol type if it hasn't been added already.
    if (!map.getLayer(layerID)) {
    map.addLayer({
    "id": layerID,
    "type": "symbol",
    "source": "places",
    "layout": {
    "icon-image": symbol + "-15",
    "icon-allow-overlap": true,
    "text-field": symbol,
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": 11,
    "text-transform": "uppercase",
    "text-letter-spacing": 0.05,
    "text-offset": [0, 1.5],
    
    },
    "paint": {
    "text-color": "#202",
    "text-halo-color": "#fff",
    "text-halo-width": 2
    },
    "filter": ["==", "icon", symbol]
    });
     
    layerIDs.push(layerID);
    }
    });
     
    filterInput.addEventListener('keyup', function(e) {
    // If the input value matches a layerID set
    // it's visibility to 'visible' or else hide it.
    const value = e.target.value.trim().toLowerCase();
    layerIDs.forEach(function(layerID) {
    map.setLayoutProperty(layerID, 'visibility',
    layerID.indexOf(value) > -1 ? 'visible' : 'none');
    });
    });
    });

}
}





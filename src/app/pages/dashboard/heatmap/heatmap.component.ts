// import { Component, ViewEncapsulation } from '@angular/core';
// import { MapsAPILoader } from '@agm/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// declare var google: any;
//
// const GREEN_GRADIENT = 'GREEN_GRADIENT';
// const BLUE_GRADIENT = 'BLUE_GRADIENT';
//
// const GRADIENTS = Object.freeze({
//   [GREEN_GRADIENT]: null,
//   [BLUE_GRADIENT]: [
//     'rgba(0, 255, 255, 0)',
//     'rgba(0, 255, 255, 1)',
//     'rgba(0, 191, 255, 1)',
//     'rgba(0, 127, 255, 1)',
//     'rgba(0, 63, 255, 1)',
//     'rgba(0, 0, 255, 1)',
//     'rgba(0, 0, 223, 1)',
//     'rgba(0, 0, 191, 1)',
//     'rgba(0, 0, 159, 1)',
//     'rgba(0, 0, 127, 1)',
//     'rgba(63, 0, 91, 1)',
//     'rgba(127, 0, 63, 1)',
//     'rgba(191, 0, 31, 1)',
//     'rgba(255, 0, 0, 1)'
//   ]
// });
//
//
// const ROADMAP_TYPE = 'ROADMAP_TYPE';
// const TERRAIN_TYPE = 'TERRAIN_TYPE';
//
//
// const TYPES = Object.freeze({
//   [ROADMAP_TYPE]: 'roadmap',
//   [TERRAIN_TYPE]: 'terrain'
// });
//
//
// const DAY_STYLES = 'DAY_STYLES';
// const NIGHT_STYLES = 'NIGHT_STYLES';
//
// const STYLES = Object.freeze({
//   [DAY_STYLES]: null,
//   [NIGHT_STYLES]: null
// });
//
// @Component({
//   selector: 'heatmap',
//   templateUrl: './heatmap.component.html',
//   styleUrls: ['./heatmap.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class HeatmapComponent  {
//   data;
//
//   blue = BLUE_GRADIENT;
//   green = GREEN_GRADIENT;
//
//   roadmap = ROADMAP_TYPE;
//   terrain = TERRAIN_TYPE;
//
//   day = DAY_STYLES;
//   night = NIGHT_STYLES;
//
//
//
//   get gradient() {
//     return GRADIENTS[this.form.get('gradient').value];
//   }
//
//   get type() {
//     return TYPES[this.form.get('type').value];
//   }
//
//   get styles() {
//     return STYLES[this.form.get('styles').value];
//   }
//
//
//   form: FormGroup;
//
//   // constructor(
//   //   fn: FormBuilder,
//   //   private _apiLoader: MapsAPILoader,
//   // ) {
//   //   this._apiLoader.load()
//   //     .then(() => {
//   //       this.data = locationsCount.map(({lat, lon, count}: any) => ({location: new google.maps.LatLng(+lat, +lon),  weight: +count}))
//   //     })
//
//
//     this.form = fn.group({
//       gradient: GREEN_GRADIENT,
//       type: TERRAIN_TYPE,
//       styles: DAY_STYLES
//     });
//
//     this.form.valueChanges
//       .subscribe(changes => {
//         console.log(changes)
//       });
//
//   }
//
// }

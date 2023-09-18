import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent {
  planets: any[] = [];
  apiUrl = 'https://swapi.dev/api/planets/';

  constructor(private http: HttpClient) {}

  getPlanets() {
    this.http.get<any>(this.apiUrl).subscribe(data => {
      this.planets = data.results;
    });
  }
}

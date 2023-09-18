import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
})
export class PlanetListComponent implements OnInit {
  planets: any[] = [];
  selectedPlanet: any;
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPlanets();
  }

  getPlanets() {
    this.http.get('https://swapi.dev/api/planets/').subscribe((data: any) => {
      this.planets = data.results;
    });
  }

  searchPlanet() {
    const searchTerm = this.searchText.toLowerCase();
    if (searchTerm.trim() === '') {
      this.selectedPlanet = null;
    } else {
      const closestMatch = this.planets.find((planet) =>
        planet.name.toLowerCase().includes(searchTerm)
      );

      if (closestMatch) {
        this.getPlanetDetails(closestMatch);
      } else {
        this.selectedPlanet = null;
      }
    }
  }

  getPlanetDetails(planet: any) {
    this.http.get(planet.url).subscribe((data: any) => {
      this.selectedPlanet = data;
    });
  }
}

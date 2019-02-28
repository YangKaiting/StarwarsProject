import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const baseURL = 'https://swapi.co/api/';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private http: HttpClient) { }


  AllCategory() {
    return (
      this.http.get(baseURL).toPromise()
    );
  }

}

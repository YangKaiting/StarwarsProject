import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Dexie from 'dexie';
import { NgNavigatorShareService } from 'ng-navigator-share';

const baseURL = 'https://swapi.co/api/';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private db: Dexie;
  constructor(private navigator: NgNavigatorShareService, private http: HttpClient) {
    this.db = new Dexie('starwarsDb');
    this.db.version(1).stores({
      // ++id
      starwarsDb: 'id,comment'
    })
  }

  AllCategory() {
    return (
      this.http.get(baseURL).toPromise()
    );
  }

  AllItem(category: string, page: number) {
    return (
      this.http.get(`${baseURL}${category}/?page=${page}`).toPromise()
    );
  }

  GetItem(category: string, id: string) {
    return (
      this.http.get(`${baseURL}${category}/${id}`).toPromise()
    );
  }

  addCommentToDexie(id: string, comment: string): Promise<any> {
    return (
      this.db.table('starwarsDb').put({
        id: id,
        comment: comment
      })
    );
  }

  getCommentFromDexie(id: string): Promise<Comment[]> {
    return (this.db.table('starwarsDb').where('id').equals(id).first());
  }

  share(url: string) {
    return (this.navigator.share({
      title: 'star wars',
      text: 'character info',
      url: url,
    })
      .then((res) => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error))
    );
  }

}

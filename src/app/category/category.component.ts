import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../starwars.service';
import { Category } from '../model/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private svc: StarWarsService) { }

  categories: Category[] = [];

  ngOnInit() {
    this.svc.AllCategory()
      .then((result) => {

        for (let k of Object.keys(result)) {
          // console.log(`key: ${k} - value: ${result[k]}`);
          this.categories.push({
            name: k,
            url: result[k]
          });
        }

      })
      .catch((error) => console.log(error));

  }

  showInfo(url) {
    console.log(url);
  }

}

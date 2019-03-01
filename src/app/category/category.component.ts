import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../starwars.service';
import { Category } from '../model/Category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private svc: StarWarsService, private router: Router) { }

  categories: Category[] = [];

  ngOnInit() {
    this.svc.AllCategory()
      .then((result) => {
        for (let k of Object.keys(result)) {
          this.categories.push({
            name: k,
            url: result[k]
          });
        }

      })
      .catch((error) => console.log(error));

  }

  showInfo(name) {
    console.log(name);
    this.router.navigate(['/item', name]);
  }

}

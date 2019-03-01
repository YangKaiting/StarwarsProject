import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StarWarsService } from '../starwars.service';
import { Detail } from '../model/Detail';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private sub: any;
  category: string;
  id: string;
  imageURL: string;
  commentValue: string;
  details: Detail[] = [];

  constructor(private location: Location, private svc: StarWarsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.category = params['category'];
      this.id = params['id'];
      let queryC = this.category;
      if (queryC.toLowerCase() === "people") {
        queryC = "characters";
      }
      this.imageURL = `https://starwars-visualguide.com/assets/img/${queryC}/${this.id}.jpg`;
      console.log(this.imageURL);
      console.log(`${this.category} -> ${this.id}`);

      this.getItemInfo();
      this.readComment(this.category, this.id);
    });
  }

  private getItemInfo() {
    this.svc.GetItem(this.category, this.id)
      .then(result => {
        // read result here...
        for (let param of Object.keys(result)) {
          if (param == 'created' || param == 'edited' || param == 'url')
            continue;

          if (param == 'homeworld') {
            this.details.push({
              key: param,
              value: [result[param]]
            })
            continue;
          }

          this.details.push({
            key: param,
            value: result[param]
          })
        }

        console.log(this.details);
      })
      .catch(err => console.log(err));
  }

  onSubmit(form: NgForm) {
    let tempId = `${this.category}_${this.id}`;
    let tempComment = form.value['myComment'];

    this.svc.addCommentToDexie(tempId, tempComment)
      .then((result) => {
        console.info('Inserted >> ', result);
      })
      .catch(err => console.log(err));
  }

  private readComment(category: string, id: string) {
    this.svc.getCommentFromDexie(`${category}_${id}`)
      .then((result) => {
        console.log(result);
        if (result === undefined) {
          this.commentValue = undefined;
        }
        else {
          this.commentValue = result['comment'];
        }
      })
      .catch(err => console.log(err));
  }

  isArray(val) {
    return (val instanceof Array);
  }

  share() {
    // this.svc.share(this.router.url);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

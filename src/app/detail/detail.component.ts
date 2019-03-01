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
            let tempArr: Array<string> = result[param].split('/').filter(el => el != "");
            this.svc.GetItem(tempArr[tempArr.length - 2], tempArr[tempArr.length - 1])
              .then((res) => {
                let tempObj = {
                  key: res['title'] == null ? res['name'] : res['title'],
                  category: tempArr[tempArr.length - 2],
                  id: tempArr[tempArr.length - 1]
                };

                this.details.push({
                  key: param,
                  value: [tempObj]
                })
                console.log(tempObj);

              })
              .catch((err) => console.log(err));
            continue;
          }

          // convert to object array
          if (result[param] instanceof Array == false) {
            this.details.push({
              key: param,
              value: result[param]
            })
          } else {

            let resArr = [];
            for (let url of result[param]) {
              let tempArr: Array<string> = url.split('/').filter(el => el != "");
              this.svc.GetItem(tempArr[tempArr.length - 2], tempArr[tempArr.length - 1])
                .then((res) => {
                  let tempObj = {
                    key: res['title'] == null ? res['name'] : res['title'],
                    category: tempArr[tempArr.length - 2],
                    id: tempArr[tempArr.length - 1]
                  };

                  resArr.push(tempObj);
                })
                .catch((err) => console.log(err));
            }

            // add to the array
            this.details.push({
              key: param,
              value: resArr
            })
            console.log(resArr);
          }


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
        window.alert('succeeded')
      })
      .catch(err => {
        console.log(err);
        window.alert('failed')
      });
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
    let tempUrl = `https://57chi.github.io/star-wars${this.router.url}`;
    this.svc.share(tempUrl)
      .then(res => window.alert('succeeded'))
      .catch(res => window.alert('failed'));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

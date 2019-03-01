import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarWarsService } from '../starwars.service';
import { PageEvent } from '@angular/material';
import { Item } from '../model/Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  private sub: any;
  category: string;

  len: number;
  items: Item[] = [];

  constructor(private svc: StarWarsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.category = params['category'];
      console.log('read from route:', this.category);

      // read json here...
      this.readItem(1);
    });
  }

  public getServerData(event?: PageEvent) {
    // console.log(event);
    this.readItem(event.pageIndex + 1);
    return event;
  }

  private readItem(pg: number) {
    // clear the record
    this.items = [];
    this.svc.AllItem(this.category, pg)
      .then(result => {
        console.log(result);
        this.len = result['count'];

        // read result here...
        let arr = <Array<Object>>(result['results']);

        for (let o of arr) {
          this.items.push({
            key: o['name'] == null ? o['title'] : o['name'],
            value: o['url']
          });
        }
        console.log(this.items);
      })
      .catch(error => console.log(error));
  }

  showInfo(url: string) {
    let tempArr = url.split('/').filter(el => el != "");
    if (tempArr.length >= 2) {
      this.router.navigate(['/detail',
        tempArr[tempArr.length - 2],
        tempArr[tempArr.length - 1]]
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

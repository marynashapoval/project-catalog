import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const parseJSON = (res: any) => (res.json ? res.json() : res);
const checkStatus = (res: any) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  return parseJSON(res).then((res: any) => {
    throw res;
  });
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products = [];
  showHeader = false;
  searchText!: string;
  data!: any;
  constructor() { }

  dataChanged(event: any) {
    this.products = this.data.filter((x: any) => x.title.toLowerCase(event).includes(event) && event !== '');
    this.products = [...this.products];
    event !== '' ? this.showHeader = true : this.showHeader = false;
  }

  async ngOnInit() {
    this.data = await fetch(environment.apiUrl + '/products', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
      .then(checkStatus)
      .then(parseJSON);
  }

}

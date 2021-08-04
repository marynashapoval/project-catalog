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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = [];
  error = null;

  constructor() { }

  async ngOnInit() {
    try {
      const data = await fetch(environment.apiUrl + '/products', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      })
        .then(checkStatus)
        .then(parseJSON);
      this.products = data;
    } catch (error) {
      this.error = error;
    }
  }

}

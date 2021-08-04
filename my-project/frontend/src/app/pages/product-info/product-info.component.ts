import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  productInfo: any;
  productImage = [];
  productSpecifications = [];
  showRelatedProducts = false;
  relatedProducts = [];
  relatedProductImage = [];
  productId!: number;
  error = null;

  constructor(private activeRoute: ActivatedRoute) { }

  async ngOnInit() {
    try {
      this.productId = +this.activeRoute.snapshot.params.id;
      const data = await fetch(environment.apiUrl + '/products/' + this.productId, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      })
        .then(checkStatus)
        .then(parseJSON);
      this.productInfo = data;
      this.productImage = data.image;
      this.productSpecifications = data.specifications;
      this.relatedProducts = data.relatedProducts;
      this.relatedProducts.length !== 0 ? this.showRelatedProducts = !this.showRelatedProducts : this.showRelatedProducts;
    } catch (error) {
      this.error = error;
    }
  }

}

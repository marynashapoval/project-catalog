import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = [];
  categoryId!: number;
  showCategoryProducts = false;
  categoryProducts = [];
  error = null;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router) { }

  productNavigation(productId: number) {
    this.router.navigateByUrl('products/product-info/' + productId);
  }

  async ngOnInit() {
    try {
      this.categoryId = +this.activeRoute.snapshot.params.id;
      if (this.categoryId && this.categoryId > 0) {
        this.showCategoryProducts = !this.showCategoryProducts;
        const dataCategoryProducts = await fetch(environment.apiUrl + '/categories/' + this.categoryId, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        })
          .then(checkStatus)
          .then(parseJSON);
        this.categoryProducts = dataCategoryProducts.products;
      } else {
        const dataCategories = await fetch(environment.apiUrl + '/categories', {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          })
        })
          .then(checkStatus)
          .then(parseJSON);
        this.categories = dataCategories;
      }
    } catch (error) {
      this.error = error;
    }
  }

}

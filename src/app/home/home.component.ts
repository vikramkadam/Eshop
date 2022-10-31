import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Product } from '../Models/product';
import { CommonLogicService } from '../services/common-logic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private httpService: HttpService , private commonService: CommonLogicService) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.getLatestSeachValue();
  }

  productList: Product[] = [];
  filterProductsList: Product[] = [];

  mainSerachboxValue: any ;

  getProductDetails() {
    this.httpService.getData('productsitems').subscribe(
      (res: any) => {
        this.productList = res;
        this.filterProducts('all');
      },
      (error) => {
        console.log('Error occured:' + error);
      },
      () => {
        console.log('Completed.');
      }
    );
  }

  filterProducts(category: any, minno?: any, maxno?: any) {
    let min: any = minno;
    let max: any = maxno;
    if (category != 'all')
     {
      if (min != (undefined && '') && max != (undefined && '')) 
      {
        this.filterProductsList = this.productList.filter(
          (ele) => ele.price >= minno && ele.price <= maxno
        );
      } 
      else if (category == 'price') {
        this.filterProductsList = this.productList;
      }
      else {
        this.filterProductsList = this.productList.filter(
          (ele) => ele.category == category
        );
      }
    } 
    else {
      this.filterProductsList = this.productList;
    }
  }


  getLatestSeachValue() {
    this.commonService.searchSubject.subscribe(res => { 
    this.filterProductsList = this.productList.filter( ele => ele.title.toLowerCase().includes(res))    
    },(error)=> {
    console.log('Error While getting Manin search value:'+ error)
  });
}

}

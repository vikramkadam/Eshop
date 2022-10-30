import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Product } from '../Models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private httpService: HttpService) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  productList: Product[] = [];
  filterProductsList: Product [] = [];

  getProductDetails()
  {
    this.httpService.getData('productsitems').subscribe((res:any) => {
      this.productList = res;
      this.filterProducts('all');
    },(error) => {console.log('Error occured:'+error)},
      ()=> {console.log('Completed.')})
  }


  filterProducts(category:any, min?: any , max? : any)
  {
    if(category !='all'){

      if(min != null && max!= null)
      {

        this.filterProductsList = this.productList.filter(ele => ele.price >= min && ele.price <=max)
        
      }
      else
      {
        this.filterProductsList = this.productList.filter(ele=> ele.category == category);
      }
     
    }else{
      this.filterProductsList = this.productList;
    }
     
  }


}

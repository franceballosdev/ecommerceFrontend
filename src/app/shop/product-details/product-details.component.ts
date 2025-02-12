import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/products';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?:Product

  constructor(
    private shopService:ShopService,
    private activatedRoute:ActivatedRoute,
    private bsService:BreadcrumbService  
  ) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id)
      this.shopService.getProduct(+id).subscribe({
        next:product=>{
          this.product=product; 
          this.bsService.set('@productDetails',product.name)
        },
          error:error=>console.log(error)
      })
  }
}

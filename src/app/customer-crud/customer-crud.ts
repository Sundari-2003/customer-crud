import { Component } from '@angular/core';
import data from '../../data/customer.json';
import { CommonModule } from '@angular/common';
import { FormsModule , NgForm} from '@angular/forms';
import { NgbModal , NgbModule } from '@ng-bootstrap/ng-bootstrap';

interface Customer {
  id : number ;
  name : string;
  email : string;
  gender : string;
}
@Component({
  selector: 'app-customer-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './customer-crud.html',
  styleUrls: ['./customer-crud.css'],
})
export class CustomerCrud {

  customers : Customer[] = [];
  name : any;
  email : any;
  gender : any;
  selectedCust : any;

  constructor(private modalService: NgbModal) {}
    
  ngOnInit() : void {
    this.customers = data;
  }

  deleteCust(selectedCustId : any){
    debugger;
    const index = this.customers.findIndex (cust => cust.id === selectedCustId);
    this.customers.splice(index , 1);
  }

  open ( content : any ){

    this.modalService.open(content , 
      {
        ariaLabelledBy : 'modal-basic-title'
      }
    ).result
  }

  close(closeModal : any){
    this.setAllValues();
    closeModal.dismiss('Cross click');
  }
  setAllValues(){
    this.email = ""
    this.name = ""
    this.gender = ""
    this.selectedCust = null
  }

  addCustomer(values : any){
    const size = this.customers?.length - 1
    values.id = this.customers[size]?.id + 1
    this.customers.push(values);
    this.setAllValues();
  }
  editCust(selectedCust : any , content : any){
    this.selectedCust = selectedCust;
    this.modalService.open(content , { ariaLabelledBy : 'modal-basic-title'})
    this.email = selectedCust?.email
    this.name = selectedCust?.name
    this.gender = selectedCust?.gender
  }

  updateCustomerInTable(values : any){
    this.customers.forEach(x => {
      if( x.id == this.selectedCust.id){
        x.name = values.name
        x.email = values.email
        x.gender = values.gender
      }
    });
    this.setAllValues();
  }

  onSubmit(f : NgForm){
    const formValues = f?.value;
    if(this.selectedCust){
      this.updateCustomerInTable(formValues)
    }
    else{
      this.addCustomer(formValues)
    }
    this.modalService.dismissAll();
  }

}

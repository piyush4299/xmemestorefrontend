import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { memeDetailService } from '../sharedDetails/memeDetail.Service';
import { memeDetail } from '../sharedDetails/memeDetail.model';



@Component({
  selector: 'app-meme-detail',
  templateUrl: './meme-detail.component.html',
  styleUrls: ['./meme-detail.component.css']
})

export class MemeDetailComponent implements OnInit {

  constructor(public memeDetailService: memeDetailService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshMemeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.memeDetailService.selectedMeme = {
      _id: null,
      name: "",
      caption:"",
      memeURL: ""
    }
    this.refreshMemeList();
  }

  onSubmit(form: NgForm){
    if(form.value._id === null){
      this.memeDetailService.postMeme(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshMemeList();
        this.toastr.success("Meme details saved successfully!!");
      });
    }
    else{
      this.memeDetailService.patchMeme(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshMemeList();
        this.toastr.success("Meme detail updated successfully!!");
      });
    }
  }

  refreshMemeList(){
    this.memeDetailService.getPostedMemes().subscribe((res) => {
      this.memeDetailService.memeDetails = res as memeDetail[];
    })
  }

  onEdit(memeObject: memeDetail){
    this.memeDetailService.selectedMeme = memeObject;
  }

  onDelete(memeObject: memeDetail,form: NgForm){
    if(confirm('Are you sure about deleting the meme?') == true){
      this.memeDetailService.deleteMeme(memeObject).subscribe((res) => {
        this.refreshMemeList();
        this.resetForm(form);
        this.toastr.success("Selected meme deleted successfully!!");
      });
    }
  }

}

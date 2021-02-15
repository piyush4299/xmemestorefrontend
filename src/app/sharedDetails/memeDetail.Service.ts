import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { memeDetail } from './memeDetail.model';

@Injectable()
export class memeDetailService{
  selectedMeme: memeDetail;
  memeDetails: memeDetail[];
  readonly BackendURL = "https://xmemestore.herokuapp.com/";

  constructor(private http: HttpClient) { 
      this.selectedMeme = new memeDetail();
      this.memeDetails = [new memeDetail()];
  }

  postMeme(meme: memeDetail){
      return this.http.post(this.BackendURL + "memes",meme);
  }

  getPostedMemes(){
      return this.http.get(this.BackendURL + "memes");
  }

  patchMeme(memeObject: memeDetail) {
    return this.http.patch(this.BackendURL + `memes/${memeObject._id}`, memeObject);
  }

  deleteMeme(memeObject:memeDetail){
    return this.http.delete(this.BackendURL + `memes/${memeObject._id}`)
  }
}
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { memeDetail } from 'src/app/sharedDetails/memeDetail.model';

@Component({
    selector: 'app-memeItem',
    templateUrl: './memeItem.html',
    styleUrls: ['./memeItem.css']
})

export class memeItemComponent{

    @Input() memeObject:memeDetail;
    @Output() myEditEvent = new EventEmitter();
    @Output() myDeleteEvent = new EventEmitter();

    constructor(){
        this.memeObject = new memeDetail();
    }

    onEdit(memeObject:memeDetail) {
        this.myEditEvent.emit(memeObject);
    }

    onDelete(memeObject:memeDetail){
        this.myDeleteEvent.emit(memeObject);
    }
}
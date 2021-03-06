import {
  Component,
  OnInit, 
  Input
} from '@angular/core'

import {
  trigger,
  state, 
  style, 
  animate, 
  transition
} from '@angular/animations'

declare var window: any;

@Component({
  selector: 'box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
  host: {
    '[class]' : '(type == \'container\' ? type : type + \' block\')'
  }
})
export class BoxComponent implements OnInit {

  @Input() type:any = false;
  @Input() icon:any = false;
  @Input() container:any = false;
  @Input() center:any = false;
  @Input() flex:any = false;
  @Input() flextop:any = false;
  @Input() url:any = false;

  link(url) {
    if (!url) return false;

    window.location.href = url;
  }

  constructor() { }
  ngOnInit() { }
}

import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { SignalRService } from './signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  signalrConnectionEstablished$: Observable<boolean>;
  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#cc00cc','#ff0000','#ff9900']
  };
  cardColor: string = '#232837';
  data;
  constructor(private signalRService:SignalRService){}
  ngOnInit() {
    this.signalRService.newValue$.subscribe(newValue => {
      this.renderChart(newValue);
    });
    this.signalrConnectionEstablished$ = this.signalRService.connectionEstablished$;
}
  

  renderChart(value: number) {
    this.data = [{
      name: 'We',
      value: value || 0
    }, {
     
        name: 'Vodafone',
        value: Math.floor(value *5 / 2)|| 0
      },{
        name: 'Orange',
        value: Math.floor(value *7 / 3)|| 0
      }
    ];
  }}

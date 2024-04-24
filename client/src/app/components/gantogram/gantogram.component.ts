import { AfterViewInit, Component, HostBinding, OnInit, ViewChild, inject } from '@angular/core';
import {srLatn} from 'date-fns/locale'
import { NgToastService } from 'ng-angular-popup';
import {MatChipsModule} from '@angular/material/chips';
import {
  GanttBarClickEvent,
  GanttBaselineItem,
  GanttDragEvent,
  GanttItem,
  GanttLineClickEvent,
  GanttLinkDragEvent,
  GanttPrintService,
  GanttSelectedEvent,
  GanttTableDragDroppedEvent,
  GanttTableDragEndedEvent,
  GanttTableDragEnterPredicateContext,
  GanttTableDragStartedEvent,
  GanttToolbarOptions,
  GanttView,
  GanttViewType,
  NgxGanttComponent 
} from '@worktile/gantt';

// import { GanttPrintService } from '../../services/gantt-print.service';

// import { ThyNotifyService } from 'ngx-tethys/notify';
import { finalize, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { random, randomItems } from '../../helper';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { log } from 'console';



@Component({
  selector: 'app-gantogram',
  templateUrl: './gantogram.component.html',
  styleUrl: './gantogram.component.css',
  template: ``,
  providers: [GanttPrintService],
})
export class GantogramComponent implements OnInit, AfterViewInit{

  views = [
      
      {
          name: 'Day',
          value: GanttViewType.day
      },
      {
          name: 'Month',
          value: GanttViewType.month
      },
      {
          name: 'Quarter',
          value: GanttViewType.quarter
      }
  ];


//   selectView(viewType: GanttViewType) {
//     this.selectedViewType = viewType;
//     // Dodajte ovde logiku koja se izvršava kada se promeni izabrani pogled
//   }

  viewType: GanttViewType = GanttViewType.month;

  selectedViewType: GanttViewType = GanttViewType.month;

  isBaselineChecked = false;

  isShowToolbarChecked = false;

  loading = false;

  items: GanttItem[] = [
    { id: '000000', title: 'Task 0', start: 1712134088, end: 1712898109 },
    // { id: '000001', title: 'Task 1', start: 1617361997, end: 1625483597, links: ['000003', '000004', '000000'],  },
      { id: '000001', title: 'Task 1', start: 1712831699, end: 1713191699, links: ['000003', '000004', '0000029'] },
      { id: '000002', title: 'Task 2', start: 1712133065, end: 1712798081, progress: 0.5 },
      { id: '000003', title: 'Task 3 ', start: 1712430893, end: 1712629175, itemDraggable: false },
      { id: '000004', title: 'Task 4', start: 1712335839 },
      { id: '000005', title: 'Task 5', start: 1712284603, end: 1712899430, color: '#709dc1' },
      { id: '000006', title: 'Task 6', start: 1712476430, end: 1712781855 },
      { id: '000007', title: 'Task 7', start: 1711673322, end: 1712163550 },
      { id: '000008', title: 'Task 8', end: 1711883971, color: '#709dc1' },
      { id: '000009', title: 'Task 9', start: 1711396323, end: 1711224442 },
      { id: '0000010', title: 'Task 10', start: 1710771774, end: 1710812913 },
      { id: '0000011', title: 'Task 11', start: 1710017856, end: 1710422968 },
      { id: '0000012', title: 'Task 12', start: 1710107231, end: 1711186236 },
      { id: '0000013', title: 'Task 13', start: 1711528814, end: 1711742114, links: ['0000012'] },
      { id: '0000014', title: 'Task 14', start: 1709760013, end: 1710914043 },
      { id: '0000015', title: 'Task 15', start: 1710605307, end: 1711375313 },
      { id: '0000016', title: 'Task 16', start: 1711179667, end: 1712642385 },
      { id: '0000017', title: 'Task 17', start: 1711795007, end: 1711776104 },
      { id: '0000018', title: 'Task 18', start: 1710991362, end: 1710660144 },
      { id: '0000019', title: 'Task 19', start: 1710337849, end: 1710527970 },
      { id: '0000020', title: 'Task 20', start: 1710254554, end: 1711516712 },
      { id: '0000021', title: 'Task 21', start: 1711145546, end: 1711822734 },
      { id: '0000022', title: 'Task 22', start: 1711039436, end: 1712490081 },
      { id: '0000023', title: 'Task 23', start: 1711682284, end: 1711913651 },
      { id: '0000024', title: 'Task 24', start: 1711568569, end: 1712048480 },
      { id: '0000025', title: 'Task 25', start: 1711363263, end: 1711907369 },
      { id: '0000026', title: 'Task 26', start: 1711404939, end: 1711680728 },
      { id: '0000027', title: 'Task 27', start: 1711490779, end: 1712179160 },
      { id: '0000028', title: 'Task 28', start: 1711531991, end: 1712561616 },
      { id: '0000029', title: 'Task 29', start: 1712312000, end: 1712466196 }
  ];

  toolbarOptions: GanttToolbarOptions = {
      viewTypes: [GanttViewType.day, GanttViewType.month, GanttViewType.year]
      
  };

  baselineItems: GanttBaselineItem[] = [];

  options = {
      viewType: GanttViewType.day
  };
  

  viewOptions = {
      dateFormat: {
        week: "w", // 第w周
        month: "M", // M月
        quarter: "QQQ", // QQQ
        year: "yyyy", // yyyy年
        yearMonth: "yyyy-MM", // yyyy年MM月
        yearQuarter: "yyyy-QQQ" // yyyy年QQQ
    },
    styleOptions: {
        headerHeight: 150,
        lineHeight: 120,
        barHeight: 150
    },
    dateOptions: {
        locale: srLatn, // 时区  import { fr } from 'date-fns/locale';
        weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 // 设置 week 起始值，默认为 1
      }
  };

  

  @HostBinding('class.gantt-example-component') class = true;
  @ViewChild('gantt') ganttComponent!: NgxGanttComponent;


  dropEnterPredicate = (event: GanttTableDragEnterPredicateContext) => {
      return true;
  };
  private spinner = inject(NgxSpinnerService);

  constructor(private printService: GanttPrintService,private toast : NgToastService) {}

  ngOnInit(): void {
      // init items children
      this.spinner.show();
      this.items.forEach((item, index) => {
          if (index % 5 === 0) {
              item.children = randomItems(random(1, 5), item);
          }
      });
      this.spinner.hide();

      
      console.log(this.items);
  }

  //show Toast on top center position
  showSuccess(topic:string,message:string) {
    this.toast.success({detail:topic, summary:message, duration:5000, sticky:false, position:'bottomRight'});
  }

  //show Toast on bottom center position
  showError(topic:string,message:string) {
    this.toast.error({detail:topic, summary:message, duration:5000, sticky:false, position:'bottomRight'});
  }

  //show Toast on top left position
  showInfo(topic:string,message:string) {
    this.toast.info({detail:topic,summary:message, duration:5000, sticky:false, position: 'bottomRight'});
}

//show Toast on bottom left position
showWarn(topic:string,message:string) {
      this.toast.warning({detail:topic,summary:message, duration:5000, sticky:false, position: 'bottomRight'});
}

 


  ngAfterViewInit() {
      setTimeout(() => this.ganttComponent.scrollToDate(1713904900), 200);
    //   setTimeout(() => this.ganttComponent.scrollToDate(), 200);
  }

  barClick(event: GanttBarClickEvent) {
    this.toast.success({detail:'Success',summary:'This is Success', sticky:true,position:'topRight'});
    this.showSuccess("BarClick", `Ovo je poruka za success obavestenje kada se klikne na bar gantograma [id = ${event.item.id}] [Task Name = ${event.item.title}`);
    //   this.thyNotify.info('Event: barClick', `barClick log [${event.item.title}]`);
  }
//   kada kliknemo na vezxu tj liniju izmedju dva taska (bara)
  lineClick(event: GanttLineClickEvent) {
    // this.toast.success({detail:'Success',summary:'This is Success', sticky:true,position:'topRight'})
    console.log("Line clickk !!!! ");
    
    this.showError("LineClick",`Error poruka za line click gantograma  id = ${event.source.id} task_name = ${event.source.title}`)
    // this.showWarn();
    //   this.thyNotify.info('Event: barClick', `barClick log [${event.item.title}]`);
    //   this.thyNotify.info('Event: lineClick', `lineClick log ${event.source.title} 到 ${event.target.title} 的关联线`);
  }

//    kada se uhvati bar da se pomera
  dragMoved(event: GanttDragEvent) {
    this.showInfo("DragMoved",`INFO poruka za DragMoved gantograma  id = ${event.item.id} task_name = ${event.item.title}`);
  }
//   Kada se pusti bar nakon pomeranja
  dragEnded(event: GanttDragEvent) {
    // this.toast.success({detail:'Success',summary:'This is Success', sticky:true,position:'topRight'})
    // this.toast.success({detail:'TOP RIGHT',summary:'Top RIght',position:'topRight',sticky:true})
    this.showWarn("DragEnded",`Warning poruka za DragEnded gantograma  id = ${event.item.id} task_name = ${event.item.title} time_start = ${event.item.start} time_end = ${event.item.end}`);
    //   this.thyNotify.info('Event: barClick', `barClick log [${event.item.title}]`);
    //   this.thyNotify.info('Event: dragEnded', `dragEnded log [${event.item.title}] 的时间`);
    //   this.items = [...this.items];
  }

  selectedChange(event: GanttSelectedEvent) {
      if (event.current !== undefined) {
          const startDate = event.current.start;
          if (startDate !== undefined) {
              this.ganttComponent.scrollToDate(startDate);
          }
      }
      this.showInfo("SelectedChange",`Selektovao sam task ${event.current?.title}`)
      // Ovim iznad je zamenjeno ovo ispod jer ovo ispod ima neki problem
      // event.current && this.ganttComponent.scrollToDate(event.current?.start);

    //   this.thyNotify.info(
    //       'Event: selectedChange',
    //       `Neki tekst item opet  id opet ${(event.selectedValue as GanttItem[]).map((item) => item.id).join('、')}`
    //   );
  }

  linkDragEnded(event: GanttLinkDragEvent) {
    this.showInfo("Link Drag", `Kada povezemno dva itema Source_id = ${event.source.id} target_id = ${event.target?.id}`)
    //   this.items = [...this.items];
    //   this.thyNotify.info('Event: linkDragEnded', `opet ide neki tekst`);
  }

// Ovo je kada se leva strana pomera na primer listu taskova menjam jedan da dodje iznad drtugog i tako dalje Ovo je kada kliknem
onDragStarted(event: GanttTableDragStartedEvent) {
    console.log('onDragStarted log', event);
}

// Ovo je kada se leva strana pomera na primer listu taskova menjam jedan da dodje iznad drtugog i tako dalje  ovo je kada pustim klik
onDragEnded(event: GanttTableDragEndedEvent) {
    console.log('onDragEnded log', event);
}

  print(name: string) {
      this.printService.print(name);
  }

  scrollToToday() {
    this.ganttComponent.scrollToToday();
    }



  switchChange() {
      if (this.isBaselineChecked) {
          this.baselineItems = [
              { id: '000000', start: 1627728888, end: 1628421197 },
              { id: '000001', start: 1617361997, end: 1625483597 },
              { id: '000002', start: 1610536397, end: 1610622797 },
              { id: '000003', start: 1628507597, end: 1633345997 },
              { id: '000004', start: 1624705997 }
          ];
      } else {
          this.baselineItems = [];
      }
  }

  selectView(type: GanttViewType) {
      this.viewType = type;
      this.selectedViewType = type;
  }

  viewChange(event: GanttView) {
      console.log(event.viewType);
      this.selectedViewType = event.viewType;
  }

  refresh() {
      this.loading = true;
      of(randomItems(30))
          .pipe(
              delay(2000),
              finalize(() => {
                  this.loading = false;
              })
          )
          .subscribe((res) => {
              this.items = res;
          });
  }

  onDragDropped(event: GanttTableDragDroppedEvent) {
      const sourceItems = event.sourceParent?.children || this.items;
      sourceItems.splice(sourceItems.indexOf(event.source), 1);
      if (event.dropPosition === 'inside') {
          event.target.children = [...(event.target.children || []), event.source];
      } else {
          const targetItems = event.targetParent?.children || this.items;
          if (event.dropPosition === 'before') {
              targetItems.splice(targetItems.indexOf(event.target), 0, event.source);
          } else {
              targetItems.splice(targetItems.indexOf(event.target) + 1, 0, event.source);
          }
      }
      this.items = [...this.items];
  }
  
}
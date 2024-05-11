import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild, inject } from '@angular/core';
import {srLatn} from 'date-fns/locale'
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { NgToastService } from 'ng-angular-popup';
import {GantogramService} from '../../services/gantogram.service'
import { GanttMapper } from '../../models/gantogram/gan_mapper';
import { DomSanitizer } from '@angular/platform-browser';
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
import { Observable, Subject, finalize, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { random, randomItems } from '../../helper';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { log } from 'console';
import { Task } from '../../models/task/task';
import { ActivatedRoute } from '@angular/router';

import html2Canvas from 'html2Canvas'
import { UpdateGant } from '../../models/gantogram/update_gant_task';
import { DatePipe } from '@angular/common';
import { exec } from 'child_process';


@Component({
  selector: 'app-gantogram',
  templateUrl: './gantogram.component.html',
  styleUrl: './gantogram.component.css',
  template: ``,
  providers: [GanttPrintService,  DatePipe],
})
export class GantogramComponent implements OnInit, AfterViewInit{
  
  private decoder = inject(JwtDecoderService);
  private userId : number = 0;
  private projectId : number = 0;
  private route = inject(ActivatedRoute);
  private ganttService = inject(GantogramService)
  private itemsOldState: GanttItem[] = [];

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


  viewType: GanttViewType = GanttViewType.month;

  selectedViewType: GanttViewType = GanttViewType.month;

  isBaselineChecked = true;

  isShowToolbarChecked = false;

  loading = false;

  items: GanttItem[] = [];

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
  @ViewChild('screenshotElement') screenshotElement!: NgxGanttComponent;


  dropEnterPredicate = (event: GanttTableDragEnterPredicateContext) => {
      return true;
  };
  private spinner = inject(NgxSpinnerService);

  constructor(private printService: GanttPrintService,private toast : NgToastService,private datePipe: DatePipe,private sanitizer: DomSanitizer) {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
  }

  ngOnInit(): void {
      // init items children
      let token = this.decoder.getToken();
      if(token!=null)
      {
        let decode = this.decoder.decodeToken(token);
        this.userId = decode.user_id;
      }

      this.getGanttItemsByProjectId();
      // this.spinner.show();
      // this.items.forEach((item, index) => {
      //     if (index % 5 === 0) {
      //         item.children = randomItems(random(1, 5), item);
      //     }
      // });
      // this.spinner.hide();

      

      
  }

  copyItems(items: GanttItem[]): GanttItem[] {
    // Koristimo map metodu za pravljenje kopije svakog elementa niza
    return items.map(item => ({ ...item }));
  }

  getGanttItemsByProjectId(){
    this.loading = true;
    this.ganttService.GetAssignemntsByProjectId(this.projectId).subscribe({
      next : (tasks: Task[])=> 
        {
          if (tasks && tasks.length > 0){
            var res = GanttMapper.mapTasksToGantItems(tasks)
            this.items = res
            this.itemsOldState = this.copyItems(this.items)
            this.loading = false;
          } else {
              console.log("No tasks found or tasks[0] is undefined.");
          }
        },
      error:(error: any)=> console.log(error)
    });
  }
  private updateSuccessSubject = new Subject<boolean>();

  public emitUpdateSuccess(success: boolean): void {
    this.updateSuccessSubject.next(success);
  }

  public getUpdateSuccessObservable(): Observable<boolean> {
    return this.updateSuccessSubject.asObservable();
  }

  updateGantItemById(assign_id:number, update :UpdateGant, ){
    this.loading = true;
    // console.log(update);
    
    this.ganttService.updateTaskById(update,assign_id).subscribe({
      next : (task: Task)=> 
        {
          this.loading = false;
          const success = task !== null;
          this.emitUpdateSuccess(success)
          this.itemsOldState = this.copyItems(this.items)
        },
      error:(error: any)=> this.showError("Update error",error)
    });

  }





  //show Toast on top center position
  showSuccess(topic:string,message:string) {
    this.toast.success({detail:topic, summary:message, duration:5000, sticky:false, position:'bottomRight'});
  }

  //show Toast on bottom center position
  showError(topic:string,message:string) {
    const mess = `<b>${message}\n\n</b>`;
    this.toast.error({detail:topic, summary:"poruke \n poruka ", duration:5000, sticky:false, position:'bottomRight'});
  }

  //show Toast on top left position
  showInfo(topic:string,message:string) {
    this.toast.info({detail:topic,summary:message, duration:5000, sticky:false, position: 'bottomRight',});
}

//show Toast on bottom left position
showWarn(topic:string,message:string) {
      this.toast.warning({detail:topic,summary:message, duration:5000, sticky:false, position: 'bottomRight'});
}

 


  ngAfterViewInit() {
      setTimeout(() => this.ganttComponent.scrollToDate(new Date().getTime()), 200);
  }

  barClick(event: GanttBarClickEvent) {

    //  ovde treba otvoriti modal za task details 
    this.showSuccess("BarClick", `Ovo je poruka za success obavestenje kada se klikne na bar gantograma [id = ${event.item.id}] [Task Name = ${event.item.title}`);
  }
//   kada kliknemo na vezxu tj liniju izmedju dva taska (bara)
  lineClick(event: GanttLineClickEvent) {
    // ovde treba pozvati modal sa  upitom da li ste sigurni da zelite da obrsete vezu izmedju taska ime taska 1 i taska ime taska 2 
    this.showError("LineClick",`Error poruka za line click gantograma  id = ${event.source.id} task_name = ${event.source.title}`)
  }

//    kada se uhvati bar da se pomera
  dragMoved(event: GanttDragEvent) {
    // ovde treba pozvati update start end date 
    this.showInfo("Izmena trajanja taska",`Da biste promenili vreme na gantogramu, pratite ove korake: \n\n

    Pomeranje granica: Kliknite na levu ili desnu granicu vremenskog okvira koji želite da promenite. Držite taster miša pritisnutim i pomerajte miša levo ili desno kako biste pomerili granicu na odgovarajuće mesto. \n\n
    
    Pomeranje trake: Kliknite na samu traku vremenskog okvira i prevucite je levo ili desno kako biste je pomerali unapred ili unazad kroz vreme.`);
  }
//   Kada se pusti bar nakon pomeranja
  dragEnded(event: GanttDragEvent) {
    let update: UpdateGant = {
      startTs: event.item.start, 
      endTs: event.item.end,
    };
    this.updateGantItemById(parseInt(event.item.id),update);
    

    this.getUpdateSuccessObservable().subscribe((success: boolean) => {
      if(success && update.startTs !== undefined && update.endTs !== undefined){
        let start = new Date(update.startTs*1000);
        let end  = new Date(update.endTs*1000 );
        const formattedStart = this.datePipe.transform(start, 'medium');
        const formattedEnd = this.datePipe.transform(end, 'medium');
        this.showSuccess("Uspesno izmenjeno vreme","Promenjeno vreme trajanja taska. \n Pocetak-["+ formattedStart +"]\nKraj-["+ formattedEnd + "]" )
      }else{
        this.showError("Greška","Greška pri izmeni vremena trajanja taska - "+event.item.title)
        this.getGanttItemsByProjectId()
      }
    });    
  }

  selectedChange(event: GanttSelectedEvent) {
      if (event.current !== undefined) {
          const startDate = event.current.start;
          if (startDate !== undefined) {
              this.ganttComponent.scrollToDate(startDate);
          }
      }
      this.showInfo("SelectedChange",`Selektovao sam task ${event.current?.title}`)
  }
  

  linkDragEnded(event: GanttLinkDragEvent) {
    if(event.target !== undefined ){
      console.log(this.itemsOldState.find(item => item.id === event.source.id));
      if(GanttMapper.checkIfNumberExists(event.source.id,parseInt(event.target.id),this.itemsOldState)){
        this.showWarn("Zavisnost već postoji", `Zavisnost između taska [${event.source.title}] i taska [${event.target.title}] već postoji.`);
        // log(this.items.find(item => item.id == event.source.id))
        return;
      }else{
        let update: UpdateGant = {
                addDependentOn: [parseInt(event.target?.id)], 
              };
              this.updateGantItemById(parseInt(event.source.id),update);
              this.getUpdateSuccessObservable().subscribe((success: boolean) => {
                if(success){
                    this.showSuccess("Uspesno dodata zavisnost",`Uspešno dodata zavisnost. <br> [${event.source.title}]->[${event.target?.title}] \n\n Klikom na vezu(liniju) možete obrisati zavisnost.`)

          
                //   let start = new Date(update.startTs*1000);
                //   let end  = new Date(update.endTs*1000 );
                //   const formattedStart = this.datePipe.transform(start, 'medium');
                //   const formattedEnd = this.datePipe.transform(end, 'medium');
                //   this.showSuccess("Uspesno izmenjeno vreme","Promenjeno vreme trajanja taska. \n Pocetak-["+ formattedStart +"]\nKraj-["+ formattedEnd + "]" )
                }else{
                  this.showError("Greška",`Greška pri kreiranju zavisnosti taska  ${event.source.title}`);
                  this.getGanttItemsByProjectId();
                }
              }
            );
        this.showSuccess("USPESNA VEZA", `Zavisnost je kreirana izmedju taska [${event.source.title}] i taska [${event.target.title}].`);
      }
    }




  //   if(event.target !== undefined ){
  //     if(!GanttMapper.checkIfNumberExists(event.source.id,parseInt(event.target.id),this.items)){
  //       log()
  //       this.showWarn("Zavisnost već postoji", `Zavisnost između taska [${event.source.title}] i taska [${event.target.title}] već postoji.`);
  //       return;
  //     }
  //     let update: UpdateGant = {
  //       addDependentOn: [parseInt(event.target?.id)], 
  //     };
  //     this.updateGantItemById(parseInt(event.source.id),update);
  //     this.getUpdateSuccessObservable().subscribe((success: boolean) => {
  //       if(success){
  //           this.showSuccess("Uspesno dodata zavisnost","Uspešno dodata zavisnost. \n ["+ event.source.title +"]->["+ event.target?.title + "]" )
  
  
  //       //   let start = new Date(update.startTs*1000);
  //       //   let end  = new Date(update.endTs*1000 );
  //       //   const formattedStart = this.datePipe.transform(start, 'medium');
  //       //   const formattedEnd = this.datePipe.transform(end, 'medium');
  //       //   this.showSuccess("Uspesno izmenjeno vreme","Promenjeno vreme trajanja taska. \n Pocetak-["+ formattedStart +"]\nKraj-["+ formattedEnd + "]" )
  //       // }else{
  //       //   this.showError("Greška","Greška pri izmeni vremena trajawa taska - "+event.item.title)
  //       //   this.getGanttItemsByProjectId()
  //       }else{
          
  //         this.showError("Greška","Greška pri Dodavanju zavisnosti između dva taska - "+event.source.title +"-"+ event.target?.title)
  //         this.getGanttItemsByProjectId()
  //       }
  //     }
  //   );    
  // }
  // else{
    
  // }


    // this.showInfo("Link Drag", `Kada povezemno dva itema Source_id = ${event.source.id} target_id = ${event.target?.id}`)
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



  // switchChange() {
  //     if (this.isBaselineChecked) {
  //         this.baselineItems = [
  //             { id: '000000', start: 1627728888, end: 1628421197 },
  //             { id: '000001', start: 1617361997, end: 1625483597 },
  //             { id: '000002', start: 1610536397, end: 1610622797 },
  //             { id: '000003', start: 1628507597, end: 1633345997 },
  //             { id: '000004', start: 1624705997 }
  //         ];
  //     } else {
  //         this.baselineItems = [];
  //     }
  // }

  selectView(type: GanttViewType) {
      this.viewType = type;
      this.selectedViewType = type;
  }

  viewChange(event: GanttView) {
      console.log(event.viewType);
      this.selectedViewType = event.viewType;
  }

  refresh() {
    this.getGanttItemsByProjectId();
  }

  
  downloadGantt(){
    const element = document.getElementById('gantt_id');

    if(!element){
      console.error("Element nije pronadjen");
      return;
    }
    html2Canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      const currentDate: Date = new Date();
      const dateString: string = currentDate.toISOString(); 
      const formattedDate: string = dateString.replace(/[:\-T\.]/g, '').slice(0, -5); 
      const formattedFileName: string = formattedDate.replace('T', '-'); 
      link.download = "gantt-"+formattedFileName+".png";
      link.click();
    })
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
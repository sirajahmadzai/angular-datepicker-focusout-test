import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
  NgbDatepickerConfig,
  NgbDateStruct,
  NgbInputDatepicker,
  NgbInputDatepickerConfig
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [NgbDatepickerConfig, NgbInputDatepickerConfig]
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    config: NgbDatepickerConfig,
    inputConfig: NgbInputDatepickerConfig
  ) {
    config.minDate = this.minDate;
    config.maxDate = this.maxDate;
    config.firstDayOfWeek = 7;
    // following properties are not working
    inputConfig.restoreFocus = null;
    inputConfig.minDate = this.minDate;
    inputConfig.maxDate = this.maxDate;
  }

  model1: NgbDateStruct;
  model2: NgbDateStruct;

  minDate = { year: 2000, month: 1, day: 1 };
  maxDate = { year: 2099, month: 12, day: 31 };
  group = new FormGroup({
    first: new FormControl(null),
    second: new FormControl(null)
  });
  get first(): FormControl {
    return this.control("first");
  }
  get second(): FormControl {
    return this.control("second");
  }
  @ViewChild("d", { static: true }) d: NgbInputDatepicker;
  @ViewChild("d2", { static: true }) d2: NgbInputDatepicker;

  ngOnInit(): void {
    this.first.setValue({ year: 1900, month: 1, day: 1 });
    this.second.setValue({ year: 1900, month: 1, day: 1 });
  }

  ngAfterViewInit(): void {
    console.log(`first restoreFocus: ${this.d.restoreFocus}`);
    console.log(`second restoreFocus: ${this.d2.restoreFocus}`);
  }

  private control(name: string): FormControl {
    return this.group.controls[name] as FormControl;
  }
}

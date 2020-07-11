import { Component, OnInit, HostListener } from "@angular/core";
import { evalstatus } from "../Models/evalstatus";
@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.scss"]
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  resultValue: string;
  regexp: RegExp;
  regexpAlpha: RegExp;
  status: evalstatus;

  ngOnInit() {
    this.resultValue = "0";
    this.regexp = new RegExp("^[+\\-*\\/.%]?$");
    this.regexpAlpha = new RegExp("[A-Za-z]");
  }

  onDelete() {
    if (this.resultValue.length == 1 || this.resultValue.length == 0) {
      this.resultValue = "0";
    } else {
      this.resultValue = this.resultValue.substr(
        0,
        this.resultValue.length - 1
      );
    }
  }

  onClear() {
    this.resultValue = "0";
  }

  calculate(evaluateParam) {
    try {
      this.resultValue = eval(this.resultValue);
      if (this.regexpAlpha.test(this.resultValue)) {
        this.resultValue = "Math Error";
        this.status = evalstatus.MathError;
      } else {
        this.status = evalstatus.Success;
      }
    } catch {
      this.resultValue = "Math Error";
      this.status = evalstatus.MathError;
    }
  }

  @HostListener("click", ["$event"])
  onClick(btn) {
    if (btn.target.tagName == "BUTTON") {
      if (
        !isNaN(Number(btn.target.outerText)) ||
        this.regexp.test(btn.target.outerText)
      ) {
        if (this.resultValue === "0") {
          this.resultValue = btn.target.outerText;
        } else {
          this.resultValue = this.resultValue + btn.target.outerText;
        }
      } else if (btn.target.outerText == "=") {
        if (this.regexpAlpha.test(this.resultValue)) {
          this.resultValue = "0";
        }
        this.calculate(this.resultValue);
      }
      if (
        this.regexpAlpha.test(this.resultValue) &&
        this.status == evalstatus.Success
      ) {
        this.resultValue = btn.target.outerText;
      }
    }
  }
}

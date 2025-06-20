import { Directive, ElementRef, Input } from "@angular/core";
@Directive({
  selector: "[theme]",
})
export class ThemeDirective {
//   private _styleObj;
  @Input("styleObj")
  set styleObj(value) {
    if (value) {
      this.updateTheme(value);
    }
  }

  constructor(private _elementRef: ElementRef) {}

  updateTheme(properties) {
    // project properties onto the element
    for (const key in properties) {
      this._elementRef.nativeElement.style.setProperty(key, properties[key]);
    }
  }
}

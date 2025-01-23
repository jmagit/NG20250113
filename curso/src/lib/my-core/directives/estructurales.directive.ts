/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, DoCheck, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { OrderByPipe } from '../pipes/colecciones.pipe';

@Directive({
  selector: '[myUnless]'
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set myUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
@Directive({
  selector: '[select]',
})
export class SelectDirective implements OnChanges, DoCheck {
  @Input() selectFrom!: any[];
  @Input() selectWhere = (_item: any) => true;
  @Input() selectOrder?: any

  private orderBy = new OrderByPipe()
  private cache = ''

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
  ngDoCheck(): void {
    if(this.cache !== JSON.stringify(this.selectFrom))
      this.render()
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    this.render(!changes['selectFrom'].firstChange)
  }

  private render(clean = true): void {
    this.cache = JSON.stringify(this.selectFrom)
    let dataSource = this.selectFrom.filter(this.selectWhere)
    if (this.selectOrder)
      dataSource = this.orderBy.transform(dataSource, this.selectOrder)
    if (clean)
      this.viewContainer.clear();
    for (const data of dataSource)
      this.viewContainer.createEmbeddedView(this.templateRef, {
        // Create the embedded view with a context object that contains
        // the data via the key `$implicit`.
        $implicit: data,
      });
  }
}

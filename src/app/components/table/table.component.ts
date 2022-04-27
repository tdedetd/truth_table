import { Component, Input, OnInit } from '@angular/core';
import { LogicalExpression } from 'src/app/misc/logical-expression';

@Component({
  selector: 'tt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() expression: LogicalExpression | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}

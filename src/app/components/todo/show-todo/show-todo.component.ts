import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../services/apiservice.service';
import { ToDoModel } from '../../../models/todo.model';
import { ComponentService } from '../../../services/app.component.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-show-todo',
  templateUrl: './show-todo.component.html',
  styleUrls: ['./show-todo.component.css'],
})
export class ShowTodoComponent implements OnInit, OnDestroy {
  constructor(
    private service: ApiService,
    private componentService: ComponentService
  ) {}

  ngOnInit(): void {
    this.componentService.obsevableToDoList.subscribe(
      (data) => (this.dataSource.data = data)
    );
    this.refreshEmpList();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['select', 'id', 'title', 'action'];

  dataSource = new MatTableDataSource<ToDoModel>();

  editItem(event: ToDoModel) {
    this.componentService.onEditedItemReceived(event);
  }

  deleteItem(event: ToDoModel) {
    if (confirm('Are you sure??')) {
      this.service.deleteToDo(event.id).subscribe((data) => {
        this.refreshEmpList();
      });
    }
  }

  refreshEmpList() {
    this.service.getToDoList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy(): void {
    this.componentService.obsevableToDoItem.unsubscribe();
  }
}

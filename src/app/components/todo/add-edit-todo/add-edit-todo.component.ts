import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComponentService } from '../../../services/app.component.service';
import { ApiService } from '../../../services/apiservice.service';
import { ToDoModel } from '../../../models/todo.model';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css'],
})
export class AddEditTodoComponent implements OnInit, OnDestroy {
  dataSource: ToDoModel[] = [];
  submitted = false;

  get todoFormControls() {
    return this.todoForm.controls;
  }

  get todoItem() {
    return this.todoForm.value as ToDoModel;
  }

  todoForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
  });

  constructor(
    private service: ApiService,
    private componentService: ComponentService
  ) {}

  ngOnInit(): void {
    this.componentService.obsevableToDoItem.subscribe((msg) =>
      this.todoForm.patchValue(msg)
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.todoForm.invalid) {
      return;
    }

    if (this.todoItem.id == 0)
      this.service.addToDo(this.todoItem).subscribe((data) => {
        this.refreshEmpList();
      });
    else
      this.service.updateToDo(this.todoItem).subscribe((data) => {
        this.refreshEmpList();
      });

    this.submitted = false;
    this.todoForm.patchValue(new ToDoModel());
  }

  refreshEmpList() {
    this.service.getToDoList().subscribe((data) => {
      this.dataSource = data;
      this.componentService.onUpdatedToDoListReceived(this.dataSource);
    });
  }

  ngOnDestroy(): void {
    this.componentService.obsevableToDoItem.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  public obsevableToDoItem = new BehaviorSubject<ToDoModel>(new ToDoModel());
  public obsevableToDoList = new BehaviorSubject<ToDoModel[]>([]);

  constructor() {}

  onEditedItemReceived(message: ToDoModel) {
    this.obsevableToDoItem.next(message);
  }
  onUpdatedToDoListReceived(message: ToDoModel[]) {
    this.obsevableToDoList.next(message);
  }
}

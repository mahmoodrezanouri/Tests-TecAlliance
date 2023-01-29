import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToDoModel } from '../models/todo.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    this.cacheData();
  }

  private cacheDataToDoList: ToDoModel[] = [];

  private cacheData() {
    this.getToDoList().subscribe((data) => (this.cacheDataToDoList = data));
  }

  getToDoList(): Observable<ToDoModel[]> {
    if (this.cacheDataToDoList.length != 0) return of(this.cacheDataToDoList);

    return this.http.get<ToDoModel[]>(environment.apiUrl + 'todos');
  }

  addToDo(todo: ToDoModel): Observable<ToDoModel> {
    this.addToCache(todo);

    return this.http.post<ToDoModel>(
      environment.apiUrl + 'todos',
      todo,
      httpOptions
    );
  }

  updateToDo(todo: ToDoModel): Observable<ToDoModel> {
    this.updateCache(todo);

    return this.http.put<ToDoModel>(
      environment.apiUrl + 'todos/' + todo.id,
      todo,
      httpOptions
    );
  }

  deleteToDo(todoId: number): Observable<number> {
    this.removeFromCache(todoId);

    return this.http.delete<number>(
      environment.apiUrl + 'todos/' + todoId,
      httpOptions
    );
  }

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'users');
  }

  private addToCache(todo: ToDoModel) {
    if (this.cacheDataToDoList.length != 0) {
      let last = this.cacheDataToDoList.at(-1);
      todo.id = (last?.id || 0) + 1;
      this.cacheDataToDoList.push(todo);
    }
  }
  private updateCache(todo: ToDoModel) {
    if (this.cacheDataToDoList.length != 0) {
      this.cacheDataToDoList.map((obj) => {
        if (obj.id == todo.id) {
          obj.title = todo.title;
        }
        return obj;
      });
    }
  }
  private removeFromCache(todoId: number) {
    if (this.cacheDataToDoList.length != 0) {
      this.cacheDataToDoList = this.cacheDataToDoList.filter(function (item) {
        return item.id !== todoId;
      });
    }
  }
}

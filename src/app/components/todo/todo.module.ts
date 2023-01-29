import { NgModule } from '@angular/core';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { ApiService } from '../../services/apiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowTodoComponent } from './show-todo/show-todo.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TodoComponent } from './todo.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TodoComponent, AddEditTodoComponent, ShowTodoComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  providers: [ApiService],
})
export class ToDoModule {}

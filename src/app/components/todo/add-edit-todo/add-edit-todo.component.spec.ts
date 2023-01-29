import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddEditTodoComponent } from './add-edit-todo.component';

describe('AddEditTodoComponent', () => {
  let component: AddEditTodoComponent;
  let fixture: ComponentFixture<AddEditTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
      ],
      declarations: [AddEditTodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the todo input', () => {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    component.todoFormControls.title.setValue('fugiat veniam minus');

    expect(component.todoForm.controls.title.value).toBe('fugiat veniam minus');
  });

  it('should submit todo item and resrt the input', () => {
    const formData = {
      id: 1,
      title: 'fugiat veniam minus',
    };

    component.todoForm.setValue(formData);
    expect(component.todoForm.valid).toEqual(true);

    component.onSubmit();

    expect(component.todoForm.controls.title.value).toBe('');
  });
});

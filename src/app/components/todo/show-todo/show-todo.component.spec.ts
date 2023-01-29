import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/apiservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ShowTodoComponent } from './show-todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoModel } from 'src/app/models/todo.model';

describe('ShowTodoComponent', () => {
  let component: ShowTodoComponent;
  let fixture: ComponentFixture<ShowTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
        MatTableModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatPaginatorModule,
      ],
      declarations: [ShowTodoComponent],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the table ', (done) => {
    let data: ToDoModel[] = [
      { id: 1, title: 'delectus aut autem', userId: 1, completed: false },
      {
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        userId: 1,
        completed: true,
      },
      { id: 3, title: 'fugiat veniam minus', userId: 1, completed: false },
    ];

    component.dataSource.data = data;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      console.log(tableRows.length);
      expect(tableRows.length).toBe(4);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[1].innerHTML).toBe('ID');
      expect(headerRow.cells[2].innerHTML).toBe('Title');

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[2].innerHTML).toBe('delectus aut autem');
      expect(row1.cells[1].innerHTML).toBe('1');

      done();
    });
  });
});

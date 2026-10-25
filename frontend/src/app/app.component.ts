import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTitle = '';
  loading = false;
  error = '';
  adding = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.loading = true;
    this.error = '';
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load todos. Is the backend running?';
        this.loading = false;
      },
    });
  }

  addTodo(): void {
    const title = this.newTitle.trim();
    if (!title) return;

    this.adding = true;
    this.todoService.add(title).subscribe({
      next: (todo) => {
        this.todos.unshift(todo);
        this.newTitle = '';
        this.adding = false;
      },
      error: () => {
        this.error = 'Failed to add todo. Please try again.';
        this.adding = false;
      },
    });
  }
}

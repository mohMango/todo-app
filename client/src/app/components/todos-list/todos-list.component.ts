import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { TodoItem } from 'src/app/TodoItem';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent implements OnInit {
  todos: TodoItem[] = [];
  text = new FormControl('');

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos.data;
    });
  }

  deleteItem(id: string) {
    this.todoService.deleteTodo(id).subscribe((res) => {
      if (res.message === 'done') {
        this.todos = this.todos.filter((e) => e._id !== id);
      }
    });
  }

  addItem() {
    if (!this.text.value) {
      return;
    }
    this.todoService.addTodo(this.text.value).subscribe((res) => {
      if (res.data) {
        this.todos.push(res.data[0]);
      }
    });
  }

  updateStatus(id: string) {
    const item = this.todos.filter((e) => e._id === id)[0];
    const index = this.todos.indexOf(item);

    this.todoService.updateTodo(id, !item.done).subscribe((res) => {
      if (res.data) {
        this.todos[index].done = res.data.done;
      }
    });
  }
}

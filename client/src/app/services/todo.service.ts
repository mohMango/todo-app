import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../TodoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/todo/';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<{ data: TodoItem[] }> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.get<{ data: TodoItem[] }>(this.apiUrl, {
      headers,
    });
  }

  addTodo(text: string): Observable<{ data: TodoItem[] }> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.post<{ data: TodoItem[] }>(
      this.apiUrl + 'create',
      { text },
      {
        headers,
      }
    );
  }

  updateTodo(id: string, done: boolean): Observable<{ data: TodoItem }> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.patch<{ data: TodoItem }>(
      this.apiUrl + 'update/' + id,
      { done },
      {
        headers,
      }
    );
  }

  deleteTodo(id: string): Observable<{ message: string }> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.http.delete<{ message: string }>(this.apiUrl + 'delete/' + id, {
      headers,
    });
  }
}

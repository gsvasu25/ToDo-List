import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TodoListService {
  startedEditing = new Subject<number>();
  todoListChanged = new Subject<TodoList[]>();
  constructor() { }
  private todoList: TodoList[] = [
    new TodoList('Test 1', '2017-10-11', 'High'),
    new TodoList('Test 2', '2017-10-12', 'Normal'),
  ];
  getToDoListAll() {
    return this.todoList.slice();
  }
  getSingleToDo(index: number) {
    return this.todoList[index];
  }
  addToDo(todo: TodoList) {
    this.todoList.push(todo);
    this.todoListChanged.next(this.todoList.slice());
  }
  updateToDoList(index: number, newTodo: TodoList) {
    this.todoList[index] = newTodo;
    this.todoListChanged.next(this.todoList.slice());
  }
  deleteToDo(index: number) {
    this.todoList.splice(index, 1);
    this.todoListChanged.next(this.todoList.slice());
  }
}

export class TodoList {
  constructor(public name: string, public whendate: string, public  priority: string) {}
}


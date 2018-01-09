import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';


import {TodoList, TodoListService} from './todo-list.service';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('listAdded', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateX(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ])
    ]),
  ]
})
export class TodoListComponent implements OnInit, OnDestroy, DoCheck {
  todoList: TodoList[];
  private subscription: Subscription;

  constructor(private tdService: TodoListService, private authService: AuthService, private  router: Router) { }

  ngOnInit() {
    this.todoList = this.tdService.getToDoListAll();
    this.subscription = this.tdService.todoListChanged
      .subscribe(
        (todoList: TodoList[]) => {
          this.todoList = todoList;
        }
      );
    }

  onEditItem(index: number) {
    this.tdService.startedEditing.next(index);
  }
ngDoCheck() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
    }
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecruiterService {
  private messageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  message$: Observable<string> = this.messageSubject.asObservable();

  private welcomeTrigger: BehaviorSubject<void> = new BehaviorSubject<void>(
    undefined
  );
  welcomeTrigger$: Observable<void> = this.welcomeTrigger.asObservable();

  sendMessage(message: string): void {
    this.messageSubject.next(
      'A change was attempted by someone with READONLY access. Your changes were received but not saved.'
    );
  }

  triggerWelcome(): void {
    this.welcomeTrigger.next();
  }
}

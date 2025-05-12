import {
  catchError,
  map,
  Observable,
  of,
  OperatorFunction,
  scan,
  startWith,
  switchMap,
} from 'rxjs';
import { RecruiterService } from '../services/recruiter.service';

export interface LoadingState<T = unknown> {
  loading: boolean;
  error?: Error | null;
  data?: T;
}

export function switchMapWithLoading<T>(
  observableFunction: (value: any) => Observable<T>,
  recruiterService: RecruiterService
): OperatorFunction<any, LoadingState<T>> {
  return (source: Observable<any>) =>
    source.pipe(
      switchMap((value) =>
        observableFunction(value).pipe(
          map((data) => {
            if ((data as any)?.message === 'Recruiter' && recruiterService) {
              recruiterService.sendMessage('');
            }
            return { data, loading: false };
          }),
          catchError((error) => of({ error, loading: false })),
          startWith({ error: null, loading: true })
        )
      ),
      scan((state: LoadingState<T>, change: LoadingState<T>) => ({
        ...state,
        ...change,
      }))
    );
}

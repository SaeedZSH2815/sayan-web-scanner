import { Observable } from "rxjs";

export  interface UseCase<S, T> {
   exceute(clParam : S):Observable<T>;
}

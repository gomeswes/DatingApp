import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  usersBaseUrl = this.baseUrl + 'users/';
  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<User[]>(this.usersBaseUrl, { observe: 'response', params: params })
                .pipe(map(response => {
                  paginatedResult.result = response.body;
                  if (response.headers.get('Pagination') != null) {
                    paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
                  }
                  return paginatedResult;
                }));
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.usersBaseUrl + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.usersBaseUrl + id, user);
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.http.post(this.usersBaseUrl + userId + '/photos/' + photoId + '/setMain', {});
  }

  deletePhoto(userId: number, photoId: number) {
    return this.http.delete(this.usersBaseUrl + userId + '/photos/' + photoId);
  }

}

import { Injectable } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import { ApiRes, QueryPage } from '../../model/api.model'
import { Job } from '../../model/es.model'
import { API_JOB, API_JOB_QUERY } from '../path'
import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class JobService extends BaseService {

  constructor(private http: _HttpClient) { super() }

  query(query: QueryJob) {
    return this.http.post<ApiRes<Job[]>>(API_JOB_QUERY, query)
  }

  getById(id: string) {
    return this.http.get<ApiRes<Job>>(`${API_JOB}/${id}`)
  }

  newQuerySubject(response: Subject<ApiRes<Job[]>>) {
    const querySubject = new Subject<QueryJob>()
    querySubject.pipe(debounceTime(this.DEFAULT_DEBOUNCE_TIME)).subscribe(query => {
      this.http.post<ApiRes<Job[]>>(API_JOB_QUERY, query).subscribe(
        res => response.next(res),
        err => response.error(err))
    })
    return querySubject
  }
}

export interface QueryJob extends QueryPage {
  group?: string
  project?: string
  text?: string
}
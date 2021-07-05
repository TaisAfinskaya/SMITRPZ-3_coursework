import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Notes } from './notes';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any, responseType?: any) {
    const token = await this.oktaAuth.getAccessToken();

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: responseType || 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getNotes() {
    return this.request('get', `${baseUrl}/notes`);
  }

  getNote(id: string) {
    return this.request('get', `${baseUrl}/notes/${id}`);
  }

  createNotes(notes: Notes) {
    console.log('createNote' + JSON.stringify(notes));
    return this.request('post', `${baseUrl}/notes`, notes);
  }

  updateNotes(notes: Notes) {
    console.log('updateNote ' + JSON.stringify(notes));
    return this.request('post', `${baseUrl}/notes/${notes.id}`, notes);
  }

  deleteNotes(id: string) {
    return this.request('delete', `${baseUrl}/notes/${id}`, null, 'text');
  }
}

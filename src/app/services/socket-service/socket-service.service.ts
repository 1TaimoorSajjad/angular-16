import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MySocketWrapper } from './socket-wrapper';
import { urls } from 'src/app/utils/url.utils';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceStop {

  constructor(private socket: MySocketWrapper) {

    this.socket.on('connect', (reason: any) => {
      
      console.log(`**** Socket Connected (${reason}) ****$`)
		});

		this.socket.on('disconnect', (reason: any) => {
      console.log(`**** Socket Disconnected (${reason}) ****`)
		});
   }
  
  getSocket() {
    return this.socket;
  }

  emit(event: any, payload?: any) {
    console.group();
    console.log('>>>> Socket Request START');
    console.log(`Event: ${event}`);
    console.log('Payload:', payload);
    console.log('<<<< Socket Request END');
    console.groupEnd();
    this.socket.emit(event, payload);
  }

  addListener(event: any): Observable<any> {
    return this.socket.fromEvent(event).pipe(
      map(data => {
        console.group();
        console.log('>>>> Socket Response START');
        console.log(`Event: ${event}`);
        console.log('Payload: ', data);
        console.log('<<<< Socket Response END');
        console.groupEnd();
        return data;
      })

    );

  }

  removeListener(event: any) {
    this.socket.removeListener(event, ()=> {
      console.log(`**** Listener Removed (${event}) ****`)
    });
  }


  connectSocket() {
    if (!this.socket.ioSocket.connected ) {
      console.log('**** Socket Connect Called ****')
      const token = localStorage.getItem('token')
    this.socket.ioSocket.io.opts.query = { auth_token: token ? JSON.parse(token) : ''} //new options
    this.socket.ioSocket.io.uri = urls.SERVER_URL //new uri
    this.socket.connect(); //manually connection
  
    }
  }

  disconnectSocket() {
    if (this.socket.ioSocket.connected){
      console.log('**** Socket Disconnect Called ****')
      this.socket.removeAllListeners();
       this.socket.disconnect();
    }
  }
}

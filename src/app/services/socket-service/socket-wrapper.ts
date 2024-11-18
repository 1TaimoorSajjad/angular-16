import { Injectable } from '@angular/core';

import { urls } from 'src/app/utils/url.utils';
import { Socket } from 'ngx-socket-io';


@Injectable({
    providedIn: 'root'
  })
  export class MySocketWrapper extends Socket {
   
      constructor() {
          super({
              url: urls.SERVER_URL,
              options: {
                autoConnect : false,
                // forceNew: true
              }
            });
      }
   
  }
  
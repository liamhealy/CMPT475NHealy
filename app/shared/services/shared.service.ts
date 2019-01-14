import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedService {

    constructor() { }

    /*
     *  converts a string to a boolean
     */
    stringToBool(string: String): Boolean {
        if (string === 'true' || string === 'True') {
            return true;
        }
        return false;
    }

    /*
     *  substring is the indexOf() a string
     */
    contains(ind: number): boolean {
        if (ind === -1) {
            return false;
        }
        return true;
    }
}

import { Injectable } from '@angular/core';
import { Application } from '../models/application';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {

    application: Application = new Application();

    applications: Application[] = [];

    constructor() { }

    /*
     *  Sets the application
     */
    setApplication(app: Application) {
        this.application = new Application();
        this.application = app;
    }

    /*
     *  Gets the current application
     */
    getApplication(): Application {
        return this.application;
    }

    /*
     *  Pushes the given applications into the applications array
     */
    setApplications(apps: Application[]) {
        this.applications = [];
        apps.forEach((app) => {
            this.applications.push(app);
        });
    }

    /*
     *  Gets the applications array
     */
    getApplications(): Application[] {
        return this.applications;
    }

  /*
   * Sets the application card class based on the department
   */
    getRandomCardClass(depID): string {
        let cardStr = '';
        switch (depID) {
            case 1: cardStr = 'card bg-light mb-3 ';
                break;
            case 2: cardStr = 'card text-white bg-info mb-3 ';
                break;
            case 3: cardStr = 'card text-white bg-secondary mb-3 ';
                break;
            case 4: cardStr = 'card text-white bg-success mb-3 ';
                break;
            case 5: cardStr = 'card text-white bg-dark mb-3 ';
                break;
            case 6: cardStr = 'card text-black mb-3 ';
                break;
            case 7: cardStr = 'card text-white bg-warning mb-3 ';
                break;
            case 8: cardStr = 'card text-white bg-danger mb-3 ';
                break;
        }
        return cardStr + 'text-center';
    }

}

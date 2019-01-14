import { Department } from './department';

export class Application {
    applicationID: number;
    applicationName: String;
    description: String;
    department: Department = new Department();
}

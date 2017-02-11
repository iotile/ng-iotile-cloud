import 'rxjs/add/operator/publishReplay';
import {Observable} from 'rxjs/Rx';

import { Org } from './models/org';
import { Project } from './models/project';

export class CloudServiceMock {

  public getOrgs(): Observable<any>  {
    let orgs: Array<Org> = [];
    let o0: Org = new Org({
      name: 'My Org',
      slug: 'my-org'
    });
    orgs.push(o0);
    return Observable.of(orgs);
  }

  public getProjects(): Observable<any>  {
    let projects: Array<Project> = [];
    let project0: Project = new Project({
      id: 'abc',
      gid: '0000-0001',
      name: 'My Project',
      org: 'my-org'
    });
    projects.push(project0);
    return Observable.of(projects);
  }

}
import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';

class AnalysisService extends ListenerService {
  constructor() {
    super();
    this.overview = [];
    this.fetchOverview();

    this.update = this.update.bind(this);
    Store.registerListener(this.update);
  }

  update(server_modified) {
    if (server_modified) this.fetchOverview();
  }

  fetchOverview() {
    ApiService.getRequest('/api/analyses/overview')
    .then(data => {
      this.overview = data;
      this.notifyListeners();
    })
    .catch(error => {
      console.log(error);
    });
  }
}

export default new AnalysisService();

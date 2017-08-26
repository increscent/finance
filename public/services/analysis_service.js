import ApiService from './api_service.js';
import ListenerService from './listener_service.js';
import Store from '../store.js';

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
    ApiService.getRequest('/api/analysis/overview')
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

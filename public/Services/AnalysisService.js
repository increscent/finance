import ApiService from './ApiService.js';
import ListenerService from './ListenerService.js';
import Store from '../Store.js';
import AccountService from './AccountService.js';

class AnalysisService extends ListenerService {
  constructor() {
    super();
    this.overview = [];
    if (AccountService.isLoggedIn) this.fetchOverview();

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

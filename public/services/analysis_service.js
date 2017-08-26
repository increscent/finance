import ApiService from './api_service.js';
import ListenerService from './listener_service.js';

class AnalysisService extends ListenerService {
  constructor() {
    super();
    // this.history = [];
    this.overview = [];
    this.fetchOverview();
    // this.updateHistory();
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

  // updateHistory() {
  //   ApiService.getRequest('/api/analysis/history')
  //   .then(data => {
  //     this.history = data;
  //     this.notifyListeners();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }


}

export default (new AnalysisService());

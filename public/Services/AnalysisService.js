import ApiService from "./ApiService.js";

export default class AnalysisService {
  fetchOverview(periodId) {
    return ApiService.getRequest("/api/analysis/overview", periodId);
  }
}

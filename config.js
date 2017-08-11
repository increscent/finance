module.exports = {
  route_types: ['budget_routes', 'transaction_routes', 'analysis_routes', 'account_routes'],
  budget_required_fields: ['category', 'allowance', 'allowance_type', 'date'],
  transaction_required_fields: ['category', 'motive', 'amount', 'date']
};

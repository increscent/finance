module.exports = {
  route_types: ['budget', 'transaction', 'analysis', 'account'],
  budget_required_fields: ['name', 'allowance', 'allowance_type', 'date'],
  transaction_required_fields: ['from', 'to', 'motive', 'amount', 'date'],
  reserved_budget_names: ['Other', '@Credit', '@Debit', '@CarryOver']
};

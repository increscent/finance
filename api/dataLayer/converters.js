export const convertAccount = dbAccount => ({
  firstName: dbAccount.first_name,
  lastName: dbAccount.last_name,
  currentPeriodId: dbAccount.current_period_id
});

export const convertPeriod = dbPeriod => ({
  periodId: dbPeriod._id,
  startDate: dbPeriod.start_date,
  endDate: dbPeriod.end_date
});

export const convertCategory = dbCategory => ({
  categoryId: dbCategory._id,
  periodId: dbCategory.period_id,
  name: dbCategory.name,
  allowance: dbCategory.allowance,
  allowanceType: dbCategory.allowance_type,
  currentLimit: dbCategory.current_limit
});

export const convertTransaction = dbTransaction => ({
  transactionId: dbTransaction._id,
  periodId: dbTransaction.period_id,
  categoryId: dbTransaction.category_id,
  type: dbTransaction.type,
  note: dbTransaction.note,
  amount: dbTransaction.amount,
  date: dbTransaction.date
});

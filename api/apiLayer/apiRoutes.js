import { Router } from 'express';
import { no304, verifyAccount, handleApiErrors } from './middleware';
import accountRoutes from './accountRoutes';
import periodRoutes from './periodRoutes';
import categoryRoutes from './categoryRoutes';
import transactionRoutes from './transactionRoutes';

export default Router()

.use('/', no304)
.use('/', verifyAccount)

.use('/account', accountRoutes)
.use('/period', periodRoutes)
.use('/category', categoryRoutes)
.use('/transaction', transactionRoutes)

.use('/', handleApiErrors);

import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { BudgetController } from './controllers/budget-controller';

export const routes = express.Router();

routes.post('/request-budget', async (req, res) => {
    try {
        const nodemailerMailAdapter = new NodemailerMailAdapter();
        const budgetController = new BudgetController(req.body, nodemailerMailAdapter);
        await budgetController.execute();
        return res.status(201).send({ok: "Orçamento solicitado com sucesso!"});
    } catch (error) {
        return res.status(500).send();
    } 
})
import express from "express";

const router = express.Router();

import portfolioController from "../controllers/portfolio/portfolioController.js";


router.get('/', portfolioController.getPortfolio);
router.post('/currency', portfolioController.saveCurrency);
router.post('/', portfolioController.addPortfolio);
router.put('/:portfolioId', portfolioController.updatePortfolio);
router.delete('/:portfolioId', portfolioController.deletePortfolio);

export default router;
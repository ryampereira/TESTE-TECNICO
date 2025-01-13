const express = require('express');
const { getAllCompanies, addCompanies, clearCompanies, updateCompany, deleteCompany } = require('../controllers/companyController');

const router = express.Router();

router.get('/', getAllCompanies); 


router.post('/', addCompanies);  

router.delete('/', clearCompanies);


router.put('/companies/:cnpj', updateCompany);  


router.delete('/companies/:cnpj', deleteCompany);  

module.exports = router;

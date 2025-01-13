let companies = [];  

const getAllCompanies = (req, res) => {
  res.status(200).json(companies);
};


const addCompanies = (req, res) => {
  const newCompanies = req.body; 
  if (!Array.isArray(newCompanies)) {
    return res.status(400).json({ message: 'Os dados devem ser um array de empresas.' });
  }
  companies = [...companies, ...newCompanies];
  res.status(201).json({ message: 'Empresas adicionadas com sucesso!', data: companies });
};


const clearCompanies = (req, res) => {
  companies = [];
  res.status(200).json({ message: 'Todas as empresas foram removidas.' });
};


const updateCompany = (req, res) => {
  const cnpj = req.params.cnpj;  
  const updatedData = req.body;  

  
  const companyIndex = companies.findIndex(comp => comp.cnpj === cnpj);

  if (companyIndex === -1) {
    return res.status(404).json({ message: 'Empresa não encontrada' });
  }

 
  companies[companyIndex] = { ...companies[companyIndex], ...updatedData };

  res.status(200).json({
    message: 'Empresa atualizada com sucesso',
    company: companies[companyIndex],
  });
};


const deleteCompany = (req, res) => {
  const cnpj = req.params.cnpj; 

  
  const companyIndex = companies.findIndex(comp => comp.cnpj === cnpj);

  if (companyIndex === -1) {
    return res.status(404).json({ message: 'Empresa não encontrada' });
  }

 
  companies.splice(companyIndex, 1);

  res.status(200).json({
    message: 'Empresa excluída com sucesso',
  });
};

module.exports = { 
  getAllCompanies, 
  addCompanies, 
  clearCompanies, 
  updateCompany, 
  deleteCompany 
};

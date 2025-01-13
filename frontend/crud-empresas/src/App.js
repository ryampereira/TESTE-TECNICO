import React, { useState, useEffect } from 'react';
import { Container, Box, Grid } from '@mui/material';
import Header from './components/Header';
import EmpresaForm from './components/EmpresaForm';
import EmpresaList from './components/EmpresaList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { empresaService } from './services/empresaService';

const App = () => {
  const [empresas, setEmpresas] = useState([]);
  const [editingEmpresa, setEditingEmpresa] = useState(null);


  const loadEmpresas = async () => {
    const empresasFromDb = await empresaService.getEmpresas();
    setEmpresas(empresasFromDb);
    
    
    if (navigator.onLine) {
      empresaService.syncEmpresas();
    }
  };

  useEffect(() => {
    loadEmpresas();

    
    const handleOnline = () => {
      console.log('Agora online. Sincronizando empresas...');
      empresaService.syncEmpresas();
    };

    
    window.addEventListener('online', handleOnline);

    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleSubmit = (empresa) => {
    const formData = empresa; 
  
    Object.keys(formData).forEach((field) => {
      console.log(`Campo: ${field}, Tipo: ${typeof formData[field]}, Valor:`, formData[field]);
  
      
      if (formData[field] != null) {
        
        if (typeof formData[field] === 'string') {
          formData[field] = formData[field].trim();  
        } 
        
        else if (typeof formData[field] === 'number') {
          formData[field] = String(formData[field]);
        } 
        
        else if (typeof formData[field] === 'object') {
          formData[field] = JSON.stringify(formData[field]); 
        } 
        
        else {
          formData[field] = String(formData[field]);
        }
      }
    });
  
    if (editingEmpresa) {
      
      const updatedEmpresas = empresas.map((e) =>
        e.cnpj === editingEmpresa.cnpj ? empresa : e
      );
      setEmpresas(updatedEmpresas);
      empresaService.saveEmpresas(updatedEmpresas);
      empresaService.updateEmpresa(empresa);
    } else {
      
      const updatedEmpresas = [...empresas, empresa];
      setEmpresas(updatedEmpresas);
      empresaService.saveEmpresas(updatedEmpresas);
  
      
      if (navigator.onLine) {
        empresaService.syncEmpresas();
      }
    }
  
    setEditingEmpresa(null); 
  };
  
  
  
  const handleEdit = (cnpj) => {
    const empresa = empresas.find((e) => e.cnpj === cnpj);
    setEditingEmpresa(empresa);
  };

  
  const handleDelete = async (cnpj) => {
    if (window.confirm('Deseja excluir esta empresa?')) {
      const updatedEmpresas = empresas.filter((e) => e.cnpj !== cnpj);
      setEmpresas(updatedEmpresas);
      await empresaService.saveEmpresas(updatedEmpresas);
      empresaService.deleteEmpresa(cnpj);
    }
  };

  return (
    <Router>
      <Header />
      <Container>
        <Box sx={{ marginTop: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <EmpresaForm
                      onSubmit={handleSubmit}
                      empresa={editingEmpresa}
                    />
                  }
                />
                <Route
                  path="/empresas"
                  element={
                    <EmpresaList
                      empresas={empresas}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  }
                />
              </Routes>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Router>
  );
};

export default App;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mask } from 'remask';
import {
  FormContainer,
  FormBox,
  FormField,
  FormButton,
  ErrorText,
  WelcomeText,
  InfoText
} from '../styles/EmpresaFormStyles'; 

const EmpresaForm = ({ onSubmit, empresa }) => {
  const [formData, setFormData] = useState(empresa || { nome: '', cnpj: '', endereco: '', telefone: '' });
  const [cnpjError, setCnpjError] = useState('');
  const navigate = useNavigate();

  const validarCnpj = (cnpj) => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(cnpj);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cnpj') {
      const maskedValue = mask(value, ['99.999.999/9999-99']);
      setFormData({ ...formData, [name]: maskedValue });

      if (!validarCnpj(maskedValue)) {
        setCnpjError('Formato de CNPJ inválido');
      } else {
        setCnpjError('');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cnpjError) {
      alert('Corrija o erro de CNPJ antes de salvar!');
      return;
    }
    onSubmit(formData);
    navigate('/empresas');
  };

  return (
    <FormContainer>
      <FormBox>
        <WelcomeText>Bem-vindo à Crio, seu gerenciamento de empresas</WelcomeText> 
        <InfoText>Insira os dados da empresa:</InfoText> 
        <form onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome da Empresa"
          />
          <FormField
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="CNPJ"
          />
          {cnpjError && <ErrorText>{cnpjError}</ErrorText>}
          <FormField
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Endereço"
          />
          <FormField
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Telefone"
          />
          <FormButton type="submit" disabled={cnpjError}>Salvar</FormButton>
        </form>
      </FormBox>
    </FormContainer>
  );
};

export default EmpresaForm;



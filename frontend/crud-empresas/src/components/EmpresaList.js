import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListContainer, ListBox, Title, EmpresaItem, Button, ActionButtons } from '../styles/EmpresaListStyles';

const EmpresaList = ({ empresas, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (cnpj) => {
    onEdit(cnpj);
    navigate('/');
  };

  return (
    <ListContainer>
      <ListBox>
        <Title>Lista de Empresas</Title>
        <ul>
          {empresas.map((empresa) => (
            <EmpresaItem key={empresa.cnpj}>
              {empresa.nome} - {empresa.cnpj}
              <ActionButtons>
                <Button onClick={() => handleEdit(empresa.cnpj)}>Editar</Button>
                <Button onClick={() => onDelete(empresa.cnpj)}>Excluir</Button>
              </ActionButtons>
            </EmpresaItem>
          ))}
        </ul>
      </ListBox>
    </ListContainer>
  );
};

export default EmpresaList;



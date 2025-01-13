import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(180deg, #001f3d, #002b55);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  margin: 0;
`;

export const TopHeader = styled.div`
  background-color: #1976d2; 
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListBox = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 10px; 
  max-height: 80vh; 
  overflow-y: auto;
`;


export const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #001f3d;
`;

export const EmpresaItem = styled.li`
  font-size: 18px;
  margin: 10px 0;
  color: #555;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  border: 2px solid transparent;
  background-color: transparent;
  color: #1976d2;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background-color: #1976d2;
    color: white;
    border: 2px solid #1976d2;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;


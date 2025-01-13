import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  height: 100vh; 
  margin: 100px 0px;
  width: 100%; 
  background: linear-gradient(180deg, #001f3d, #002b55);
  position: absolute; 
  top: 0;
  left: 0;
  margin: 0;
`;

export const FormBox = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  max-height: 80vh;   
  overflow-y: auto; 
`;


export const WelcomeText = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-top: 20px;
  margin-right: 15px;
  line-height: 1.2;
  color: #001f3d;
`;

export const InfoText = styled.p`
  font-size: 18px;
  margin-top: 10px;
  margin-right: 15px;
  color: #555;
`;

export const FormField = styled.input`
  width: 93%;
  padding: 14px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  margin-right: 93%;

  &:focus {
    outline: none;
    border-color: #004080;
    background-color: #ffffff;
  }

  &::placeholder {
    color: #888;
    font-style: italic;
  }
`;

export const FormButton = styled.button`
  padding: 14px;
  width: 100%;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #003366;
  }

  transition: background-color 0.3s ease;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0;
  font-weight: 500;
  text-align: left;
`;

export const FormFooter = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #555;
  text-align: center;
`;

export const FooterLink = styled.a`
  color: #004080;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

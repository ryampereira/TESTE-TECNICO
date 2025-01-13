import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

export const StyledAppBar = styled(AppBar)`
  background-color: #1976d2;
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTypography = styled(Typography)`
  font-size: 36px;
  font-weight: 900;
  font-family: 'Montserrat', sans-serif;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const StyledButton = styled(Button)`
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  margin-left: 20px;
  padding: 8px 20px;
  border-radius: 5px;
  border: 2px solid transparent;
  background-color: transparent;
  
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background-color: white;
    color: #1976d2;
    border: 2px solid #1976d2;
  }
`;

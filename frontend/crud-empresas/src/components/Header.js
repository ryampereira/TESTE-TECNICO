import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledAppBar,
  StyledToolbar,
  StyledTypography,
  StyledButton,
} from '../styles/HeaderStyles'; 

const Header = () => {
  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <StyledTypography>
          Crio
        </StyledTypography>
        <div>
          <StyledButton component={Link} to="/">
            Home
          </StyledButton>
          <StyledButton component={Link} to="/empresas">
            Empresas
          </StyledButton>
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;


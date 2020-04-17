import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Redirect } from 'react-router-dom';
//import IconBreadcrumbs from './IconBreadcrumbs.js';

let clickProfile = false;

const styles = theme => ({
    grow: {
        flexGrow: 1,
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
  });

export default function PrimarySearchAppBar() {
  const classes = styles;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);




  function handleOpenProfile() {
    handleMenuClose();
      clickProfile = true;
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
    clickProfile = false;
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
    //clickProfile = false;
    
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenProfile}>Perfil de Cuenta</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil de Cuenta</p>
      </MenuItem>
    </Menu>
  );

  let displayName = '';
  let role = '';
  let user = JSON.parse(sessionStorage.getItem('user'));
  if(user.account){
    displayName = user.account.displayName;
    role = user.role;
  }


  const renderProfile = ( 
      <div >
          <Redirect push
            to={{
              pathname: '/panel/AccountProfile',
            }}
          />
      </div>
    );
  
  return (
    <div>
      {clickProfile && renderProfile}
        <Toolbar style={{backgroundColor:'#f8931d', justifyContent:'center'}}>
          <div style={{flex:1}}></div>
          <div style={{justifyContent:'center'}}>
            <Typography component="div" style={{color:'white'}}>
              {displayName}
              <br/>
              <small>
              {((role === 'SUPER_USER') ? 'Super Usuario' : 'Administrador')}
              </small>
            </Typography>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        {renderMenu}
        {renderMobileMenu}
    </div>


  );
}
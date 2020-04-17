import PropTypes from 'prop-types';
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { userInfo } from '../../services/user';
import Divider from '@material-ui/core/Divider';
import logo from './../../assets/images/logo.svg';
import ListItem from '@material-ui/core/ListItem';
import Container from './../../components/Container';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderToolBar from '../../components/HeaderView/PrimarySearchAppBar.js';
import NestedListBilling from './NestedListBilling';
import NestedListSubscribers from './NestedListSubscribers';
import {
	faBox,
	faTachometerAlt,
	faUserAlt,
	faSlidersH,
	faHeadset,
	faSignOutAlt,
	faAddressBook,
	faUsers
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faBox,
	faTachometerAlt,
	faUserAlt,
	faSlidersH,
	faHeadset,
	faSignOutAlt,
	faAddressBook,
	faUsers
);

const drawerWidth = 240;

const styles = (theme) => ({
	palette: {
		primary: '#F8931D'
	},
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	menuButton: {
		marginRight: 20,
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	},
	NavLink: {
		color: 'black',
		'&:hover': {
			color: '#faad14',
			background: '#faad14'
		},
		'&:focus': {
			color: 'green'
		}
	}
});

const ADMIN_MENU = (
	<div>
		<List>
			<NavLink
				to='/panel/dashboard'
				key='/panel/dashboard'
				style={{
					color: 'black',
					'&:hover': {
						color: '#faad14',
						background: '#faad14'
					},
					'&:focus': {
						color: 'green'
					}
				}}
			>
				<ListItem button key='Dashboard'>
					<ListItemIcon>
						<FontAwesomeIcon icon='tachometer-alt' size='2x' pull='left' style={{ width: 40 }} />
					</ListItemIcon>
					<ListItemText primary='Dashboard' style={{ paddingLeft: 10 }} />
				</ListItem>
			</NavLink>
			<NestedListBilling/>			
		</List>
		<Divider />
		<List>
			<NavLink
				to='/panel/customersDashboard'
				key='/panel/customersDashboard'
				style={{
					color: 'black',
					'&:hover': {
						color: '#faad14',
						background: '#faad14'
					},
					'&:focus': {
						color: 'green'
					}
				}}
			>
				<ListItem button key='Clientes'>
					<ListItemIcon>
						<FontAwesomeIcon icon='user-alt' size='2x' pull='left' style={{ width: 40 }} />
					</ListItemIcon>
					<ListItemText primary='Clientes' style={{ paddingLeft: 10 }} />
				</ListItem>
			</NavLink>
			<NavLink
				to='/panel/productsDashboard'
				key='/panel/productsDashboard'
				style={{
					color: 'black',
					'&:hover': {
						color: '#faad14',
						background: '#faad14'
					},
					'&:focus': {
						color: 'green'
					}
				}}
			>
				<ListItem button key='Productos'>
					<ListItemIcon>
						<FontAwesomeIcon icon='box' size='2x' pull='left' style={{ width: 40 }} />
					</ListItemIcon>
					<ListItemText primary='Productos' style={{ paddingLeft: 10 }} />
				</ListItem>
			</NavLink>
			<NestedListSubscribers/>			
		</List>
		<Divider />
		<List>			
			<NavLink
				to='/login'
				key='/login'
				style={{
					color: 'black',
					'&:hover': {
						color: '#faad14',
						background: '#faad14'
					},
					'&:focus': {
						color: 'green'
					}
				}}
			>
				<ListItem button key='Salir'>
					<ListItemIcon>
						<FontAwesomeIcon icon='sign-out-alt' size='2x' pull='left' style={{ width: 40 }} />
					</ListItemIcon>
					<ListItemText primary='Salir' style={{ paddingLeft: 10 }} />
				</ListItem>
			</NavLink>
		</List>
	</div>
);

const SUPER_USER_MENU = (
	<div>
		<List>
			<NavLink
				to='/panel/dashboard'
				key='/panel/dashboard'
				style={{
					color: 'black',
					'&:hover': {
						color: '#faad14',
						background: '#faad14'
					},
					'&:focus': {
						color: 'green'
					}
				}}
			>
				<ListItem button key='Dashboard'>
					<ListItemIcon>
						<FontAwesomeIcon icon='tachometer-alt' size='2x' pull='left' style={{ width: 40 }} />
					</ListItemIcon>
					<ListItemText primary='Dashboard' style={{ paddingLeft: 10 }} />
				</ListItem>
			</NavLink>
			<NavLink
				to='/panel/accounts'
				key='/panel/accounts'
				style={{
					color: 'black',
					'&:hover': {
						color: '#faad14',
						background: '#faad14'
					},
					'&:focus': {
						color: 'green'
					}
				}}
			>
				<ListItem button key='Comercios'>
					<ListItemIcon>
						<FontAwesomeIcon icon='users' size='2x' pull='left' style={{ width: 40 }} />
					</ListItemIcon>
					<ListItemText primary='Comercios' style={{ paddingLeft: 10 }} />
				</ListItem>
			</NavLink>
		</List>
		<List>
			<Divider />
			<NavLink
				to='/login'
				key='/login'
				style={{
					color: 'black',
					'&:hover': {
						color: '#faad14',
						background: '#faad14'
					},
					'&:focus': {
						color: 'green'
					}
				}}
			>
				<ListItem button key='Salir'>
					<ListItemIcon>
						<FontAwesomeIcon icon='sign-out-alt' size='2x' pull='left' style={{ width: 40 }} />
					</ListItemIcon>
					<ListItemText primary='Salir' style={{ paddingLeft: 10 }} />
				</ListItem>
			</NavLink>
		</List>
	</div>
);

class MainLayout extends Component {
	state = {
		mobileOpen: false
	};

	handleDrawerToggle = () => {
		this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
	};

	render() {
		const { classes, theme } = this.props;
		const userLogged = userInfo();

		const mainMenu = userLogged.role === 'SUPER_USER' ? SUPER_USER_MENU : ADMIN_MENU;

		const drawer = (
			<div>
				<div className={classes.toolbar}>
					<img style={{ width: '150px', display: 'block', margin: '40px' }} src={logo} alt='logo' />
				</div>
				<Divider />
				{mainMenu}
			</div>
		);

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar style={{ background: '#FFF' }} color='primary' position='fixed' className={classes.appBar}>
					<HeaderToolBar />
				</AppBar>
				<nav className={classes.drawer}>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation='css'>
						<Drawer
							container={this.props.container}
							variant='temporary'
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={this.state.mobileOpen}
							onClose={this.handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							classes={{
								paper: classes.drawerPaper
							}}
							variant='permanent'
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Container />
				</main>
			</div>
		);
	}
}

MainLayout.propTypes = {
	classes: PropTypes.object.isRequired,
	container: PropTypes.object,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainLayout);

import React from 'react';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMoneyBillAlt,
	faFileInvoiceDollar,
	faHistory,
	faArrowDown,
	faCaretDown
} from '@fortawesome/free-solid-svg-icons';

library.add(
	faMoneyBillAlt,
	faFileInvoiceDollar,
	faHistory,
	faArrowDown,
	faCaretDown
);

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

export default function NestedList() {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	function handleClick() {
		setOpen(!open);
	}
	return (
		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<FontAwesomeIcon icon="file-invoice-dollar" size="2x" pull="left" style={{ width: 40 }} />
				</ListItemIcon>
				<ListItemText primary="Facturación"  />
				<ListItemIcon>
					<FontAwesomeIcon icon='caret-down' size='1x' pull='left' style={{ width: 40 }} />
				</ListItemIcon>
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<NavLink
						to="/panel/Billing"
						key="/panel/Billing"
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
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<FontAwesomeIcon
									icon="money-bill-alt"
									size="2x"
									pull="left"
									style={{ width: 40 }}
								/>
							</ListItemIcon>
							<ListItemText primary="Crear Factura" style={{ paddingLeft: 10 }} />
						</ListItem>
					</NavLink>
					<NavLink
						to="/panel/BillingHistory"
						key="/panel/BillingHistory"
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
						<ListItem className={classes.nested}>
							<ListItemIcon>
								<FontAwesomeIcon icon="history" size="2x" pull="left" style={{ width: 40 }} />
							</ListItemIcon>
							<ListItemText primary="Historial de Facturación" style={{ paddingLeft: 10 }} />
						</ListItem>
					</NavLink>
				</List>
			</Collapse>
		</List>
	);
}

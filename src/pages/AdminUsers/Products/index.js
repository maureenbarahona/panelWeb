import axios from 'axios';
import style from './styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { NavLink } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import { authHeader } from '../../../services/user';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { headers, baseURL } from '../../../services/request';
import ProductDialogAddProduct from './productDialogAddProduct';
import SearchBar from '../../../components/Container/Header/SearchBar';
import { TableFormat } from '../../../components/Tables/TableFormat.js';
import { dateTextFormat, startDateOf, endDateOf, endDateFormat, startDateFormat } from '../../../utils/helpers';

function Transition(props) {
	return <Slide direction='up' {...props} />;
}
const navLink = (
	<div>
		<NavLink exact to='/panel/ProductDetail' key='/panel/ProductDetail' />
	</div>
);
class Products extends Component {
	getMuiTheme = () => TableFormat;
	toastId = null;

	notifySuccess = (messageS) => {
		toast.success(messageS, {
			position: toast.POSITION.TOP_CENTER
		});
	};

	notifyWarn = (messageW) => {
		toast.warn(messageW, {
			position: toast.POSITION.BOTTOM_CENTER
		});
	};

	notifyError = (messageE) => {
		toast.error(messageE, {
			position: toast.POSITION.TOP_CENTER
		});
	};
	state = {
		productID: '',
		newProduct: {},
		startDate: startDateOf(),
		endDate: endDateOf(),
		data: [],
		dataSource: [],
		dataSourceOriginal: [],
		dataSourceC: [],
		infoProducts: {
			name: '',
			description: '',
			price: ''
		},
		notification: {
			open: false,
			message: '',
			variant: ''
		},
		open: false,
		message: ''
	};

	sendInfo = async (values) => {
		const axiosConfig = {
			headers: {
				...headers,
				...authHeader()
			},
			responseType: 'json'
		};

		try {
			const response = await axios.post(`${baseURL}/products`, values, axiosConfig);

			const { data } = response;
			this.notifySuccess('Producto agregado exitosamente');
			this.getData();
			this.setState({
				data: data,
				submitted: false,
				sendButtonDisabled: false,
				openOptions: false,
				reload: true,
				open: false
			});
		} catch (error) {
			this.setState({ submitted: false, sendButtonDisabled: false });
			const { response } = error;
			let message = 'Error de conexion';
			if (response) {
				const { data } = response;

				message = data.message;
			}
			this.notifyError(message);
		}
	};

	onValidateSendInfo = (pinfoProduct) => {
		if (pinfoProduct.name.length < 1) {
			this.notifyError('El campo de nombre esta vacio');
			return;
		}
		if (pinfoProduct.description.length < 1) {
			this.notifyError('El campo de descripcion esta vacio');
			return;
		}
		if (pinfoProduct.price.length < 1) {
			this.notifyError('El campo de precio esta vacio');
			return;
		}
		return true;
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const target = e.currentTarget;

		const infoProducts = {
			name: target.name.value,
			description: target.description.value,
			price: target.price.value,
			type: 'SERVICES',
			stock: 1,
			tax: 0.15,
			currency: 'HNL'
		};
		if (this.onValidateSendInfo(infoProducts)) {
			this.sendInfo(infoProducts);
		}
	};

	handleChange = (e) => {
		const value = e.target.value.toLowerCase();

		let filteredData = this.state.dataSource;
		if (value !== '') {
			filteredData = filteredData.filter((product) => product.name.toLowerCase().includes(value));
			const dataSourceC = filteredData.map((item) => {
				return [ item.name, item.description, item.price, dateTextFormat(item.createdAt), item._id ];
			});
			this.setState({
				dataSourceC
			});
		} else
			this.setState({
				dataSourceC: this.state.dataSourceOriginal
			});
		return value;
	};

	deleteProduct = async (productID) => {
		const _id = productID;
		const axiosConfig = {
			headers: {
				...headers,
				...authHeader()
			},
			responseType: 'json'
		};

		try {
			const response = await axios.delete(`${baseURL}/products/${_id}`, axiosConfig);
			const { data } = response;
			this.notifySuccess('Producto eliminado exitosamente');
			this.getData();
			this.setState({
				data: data,
				submitted: false,
				sendButtonDisabled: false,
				openOptions: false,
				reload: true
			});
		} catch (error) {
			this.setState({ submitted: false, sendButtonDisabled: false });
			const { response } = error;
			let message = 'Error de conexion';
			if (response) {
				const { data } = response;
				message = data.message;
			}

			this.notifyError(message);
		}
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	filterProps = {
		loading: this.state.loading,

		rangePickerProps: {
			defaultValue: [ this.state.startDate, this.state.endDate ],

			onChangeStart: (event) => {
				const startDate = startDateFormat(event.target.value);

				this.setState({ startDate });
			},

			onChangeEnd: (event) => {
				const endDate = endDateFormat(event.target.value);

				this.setState({ endDate });
			}
		},

		buttonProps: {
			onClick: () => {
				this.getData();
			}
		}
	};

	async getData() {
		this.setState({ loading: true });

		const axiosConfig = {
			headers: {
				...headers,
				...authHeader()
			},
			responseType: 'json'
		};
		try {
			const { data } = await axios.get(`${baseURL}/products`, axiosConfig);
			const dataSource = data.map((product) => {
				const { price, name, _id, description, createdAt } = product;
				return { price, name, _id, description, createdAt };
			});
			const dataSourceC = dataSource.map((item) => {
				return [
					item.name,
					item.description,
					`L ${parseFloat(item.price).toFixed(2)}`,
					dateTextFormat(item.createdAt),
					item._id
				];
			});
			this.setState({
				dataSource,
				dataSourceC,
				dataSourceOriginal: dataSourceC
			});
		} catch (error) {
			const { response } = error;
			let message = 'Error de conexión';
			if (response) {
				const { data } = response;
				message = data.message;
			}

			this.setState({
				loading: false,
				notification: {
					message,
					variant: 'error'
				}
			});
			this.notifyError(message);
		}
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		const { productID, open, redirectToEdit } = this.state;
		const { classes } = this.props;

		const columns = [
			{ id: 'name', numeric: false, disablePadding: true, label: 'NOMBRE' },
			{
				id: 'description',
				numeric: false,
				disablePadding: false,
				label: 'DESCRIPCION'
			},
			{ id: 'price', numeric: true, disablePadding: false, label: 'PRECIO' },
			{
				id: 'createdAt',
				numeric: false,
				disablePadding: false,
				label: 'CREADO'
			},
			{
				name: 'DETALLE',
				options: {
					filter: true,
					customBodyRender: (value, tableMeta, updateValue) => {
						const dataTemp = tableMeta.rowData;
						let productID = '';

						if (dataTemp) {
							productID = dataTemp[4];
						}

						return (
							<Tooltip title='Detalle'>
								<IconButton
									style={{ padding: '1px 1px 1px 1px' }}
									aria-label='Modify'
									onClick={(event) => {
										this.setState({
											redirectToEdit: true,
											productID: productID
										});
									}}
								>
									<SearchIcon />
								</IconButton>
							</Tooltip>
						);
					}
				}
			},
			{
				name: 'ELIMINAR',
				options: {
					filter: true,
					customBodyRender: (value, tableMeta, updateValue) => {
						const dataTemp = tableMeta.rowData;
						let productID = '';

						if (dataTemp) {
							productID = dataTemp[4];
						}

						return (
							<Tooltip title='Eliminar'>
								<IconButton
									style={{ padding: '1px 1px 1px 1px' }}
									aria-label='Modify'
									onClick={(event) => {
										this.deleteProduct(productID);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						);
					}
				}
			}
		];

		const options = {
			customToolbar: () => {
				return (
					<Button
						variant='contained'
						color='primary'
						className={classes.button}
						style={{
							background: '#F7931D',
							border: '#F7931D',
							marginBottom: 10,
							position: 'absolute', right: 220
						}}
						onClick={this.onOpenModal}
					>
						+ NUEVO PRODUCTO
					</Button>
				);
			},
			filterType: 'dropdown',
			responsive: 'scroll',
			filter: true,
			search: false,
			selectableRows: 'none',
			selectableAllRows: false,
			download: true,
			pagination: true,
			viewColumns: true,
			print: false,
			rowsPerPage: 50,
			onChangePage: (numberRows) => {},
			textLabels: {
				body: {
					noMatch: 'Datos aun no agregados',
					toolTip: 'Sort'
				},
				pagination: {
					next: 'Siguiente Pagina',
					previous: 'Pagina Anterior',
					rowsPerPage: 'Filas por pagina:',
					displayRows: 'of'
				},
				toolbar: {
					search: 'Buscar',
					downloadCsv: 'Descargar CSV',
					print: 'Imprimir',
					viewColumns: 'Ver Columnas',
					filterTable: 'Filtrar Tablas'
				},
				filter: {
					all: 'All',
					title: 'FILTROS',
					reset: 'REINICIAR'
				},
				viewColumns: {
					title: 'Mostrar Columnas',
					titleAria: 'Mostrar/Ocultar Columnas'
				},
				selectedRows: {
					text: 'filas seleccionadas',
					delete: 'Borrar',
					deleteAria: 'Borrar filas seleccionadas'
				}
			}
		};
		if (redirectToEdit)
			return (
				<Redirect
					push
					to={{
						pathname: `/panel/productDetail/${productID}`
					}}
				/>
			);

		return (
			<div>
				<div>
					<ToastContainer />
				</div>
				<div style={{ marginBottom: 5 }}>
					<SearchBar placeholder='Buscar...' onChange={this.handleChange} />
				</div>
				<MuiThemeProvider theme={this.getMuiTheme()}>
					<MUIDataTable title={''} data={this.state.dataSourceC} columns={columns} options={options} />
				</MuiThemeProvider>
				<ProductDialogAddProduct
					Transition={Transition}
					openDetail={open}
					handleSubmit={this.handleSubmit}
					onCloseModal={this.onCloseModal}
				/>
				{navLink}
			</div>
		);
	}
}

Products.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(style)(Products);

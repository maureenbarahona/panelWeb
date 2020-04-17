import React from 'react';
import style from './styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SubscriberIdCardHeader from './subscriberIdCardHeader';
import { notifySuccess, notifyError, ToastContainerR } from '../../../components/Container/Alert/index';
import { updateAccount, getAllUserAccount, sendUserAccount } from '../../../actions/actionsAccounts';
import { getOnesubscription } from '../../../actions/actionsSubscriptions';

class SubscriberId extends React.Component {
	constructor(props) {
		super(props);
		this.id_c = '';

		this.state = {
			role: 'ADMIN_USER',
			usersAccount: [],
			dataSourceTable: {},
            infoAccounts: {},
            infoSubscriber:{}
		};
	}

	onValidateSendUserInfo = (pinfoUserAccount) => {
		if (pinfoUserAccount.name.length < 1) {
			notifyError('Nombre usuario es requerido');
			return;
		}
		if (pinfoUserAccount.email.length < 1) {
			notifyError('email es requerido');
			return;
		}
		if (pinfoUserAccount.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(pinfoUserAccount.email)) {
			notifyError('Invalid email address');
			return;
		}
		if (pinfoUserAccount.password.length < 1) {
			notifyError('Pasword es requerido');
			return;
		}
		if (pinfoUserAccount.mobileNumber.length < 1) {
			notifyError('Numero de telefono celular es requerido');
			return;
		}

		return true;
	};

	sendUserInfo = async (values) => {
		sendUserAccount(values)
			.then((res) => {
				this.setState({
					open: false
				});
				this.getUserData();
				notifySuccess('Usuario creado exitosamente');
				return;
			})
			.catch((err) => {
				this.setState({
					error: err,
					submitted: false,
					sendButtonDisabled: false
				});
				notifyError(err.toString());
				return;
			});
	};

	onUserSubmit = (e) => {
		e.preventDefault();
		const target = e.currentTarget;

		const infoUserAccount = {
			name: target.name.value,
			role: this.state.role,
			email: target.email.value,
			password: target.password.value,
			mobileNumber: target.mobileNumber.value,
			workPhone: target.workPhone.value,
			account: this.id_c
		};
		if (this.onValidateSendUserInfo(infoUserAccount)) {
			this.sendUserInfo(infoUserAccount);
		}
	};

	updateInfoAccount = async (values) => {
		const { _id } = this.state.infoAccounts;
		updateAccount(values, _id)
			.then((res) => {
				this.setState({
					data: res,
					submitted: false,
					sendButtonDisabled: false,
					openDetail: false,
					openServices: false,
					reload: true
				});
			})
			.catch((err) => {
				this.setState({
					error: err,
					loading: false,
					notification: {
						err,
						variant: 'error'
					}
				});
				notifyError(err.toString());
				return;
			});
	};

	setInfoAccounts = () => {
		let infoAccounts = this.state.infoAccounts;
		this.setState({
			displayName: infoAccounts.displayName,
			commercialName: infoAccounts.commercialName,
			balance: infoAccounts.balance,
			email: infoAccounts.email,
			rtn: infoAccounts.rtn,
			phoneNumber: infoAccounts.phoneNumber,
			phoneNumber2: infoAccounts.phoneNumber2,
			url: infoAccounts.url,
			address: infoAccounts.address,
			branch: infoAccounts.branch,
			diaryTotalTransaction: infoAccounts.diaryTotalTransaction,
			transactionMin: infoAccounts.transactionMin,
			transactionMax: infoAccounts.transactionMax,
			diaryTransactionLimit: infoAccounts.diaryTransactionLimit,
			isActive: infoAccounts.isActive,
			commissionRate: infoAccounts.commissionRate,
			taxRate: infoAccounts.taxRate,
			legalContact: infoAccounts.legalContact,
			rtnContact: infoAccounts.rtnContact,
			idNumberContact: infoAccounts.idNumberContact,
			contactPhoneNumber: infoAccounts.contactPhoneNumber,
			contract: infoAccounts.contract,
			monthlyFee: infoAccounts.monthlyFee,
			paymentProvider: infoAccounts.paymentProvider
		});
	};

	onOpenModalServicios = () => {
		this.setInfoAccounts();
		this.setState({
			openServices: true
		});
	};

	onOpenModal = () => {
		this.setInfoAccounts();
		this.setState({
			openDetail: true
		});
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	onCloseCustomerModal = () => {
		this.setState({ openDetail: false });
	};
	onCloseCustomerModalService = () => {
		this.setState({ openServices: false });
	};
	onCloseUserModal = () => {
		this.setState({ open: false });
	};

	onCloseCustomer = () => {
		this.setState({ confirmAccount: false, openDetail: false });
	};

	onValidateSendInfoServicios = (pinfoUserAccount) => {
		if (pinfoUserAccount.diaryTransactionLimit.length < 1) {
			notifyError('Limite de transaccion diaria es requerido');
			return;
		}
		if (pinfoUserAccount.transactionMin.length < 1) {
			notifyError('Minimo de transaccion es requerido');
			return;
		}
		if (pinfoUserAccount.transactionMax.length < 1) {
			notifyError('Maxima de transaccion es requerido');
			return;
		}
		if (pinfoUserAccount.branch.length < 1) {
			notifyError('Cantidad de agencias es requerido');
			return;
		}
		if (pinfoUserAccount.diaryTotalTransaction.length < 1) {
			notifyError('total de transacciones diarias es requerido es requerido');
			return;
		}
		if (pinfoUserAccount.paymentProvider.length < 1) {
			notifyError('canal de pago  es requerida');
			return;
		}

		return true;
	};

	onValidateSendInfoDetalle = (pinfoUserAccount) => {
		if (pinfoUserAccount.displayName.length < 1) {
			notifyError('Nombre del comercio es requerido');
			return;
		}
		if (pinfoUserAccount.commercialName.length < 1) {
			notifyError('Nombre comercial es requerido');
			return;
		}
		if (pinfoUserAccount.email.length < 1) {
			notifyError('email es requerido');
			return;
		}
		if (pinfoUserAccount.phoneNumber.length < 1) {
			notifyError('Numero de telefono principal es requerido');
			return;
		}
		if (pinfoUserAccount.rtn.length < 1) {
			notifyError('rtn es requerido');
			return;
		}
		if (pinfoUserAccount.address.length < 1) {
			notifyError('direccion es requerida');
			return;
		}

		return true;
	};

	onValidateSendInfo = (pinfoUserAccount) => {
		if (pinfoUserAccount.displayName.length < 1) {
			notifyError('Nombre del comercio es requerido');
			return;
		}
		if (pinfoUserAccount.commercialName.length < 1) {
			notifyError('Nombre comercial es requerido');
			return;
		}
		if (pinfoUserAccount.email.length < 1) {
			notifyError('email es requerido');
			return;
		}
		if (pinfoUserAccount.paymentProvider.length < 1) {
			notifyError('Proveedor del pago es requerido');
			return;
		}
		if (pinfoUserAccount.phoneNumber.length < 1) {
			notifyError('Numero de telefono principal es requerido');
			return;
		}
		if (pinfoUserAccount.rtn.length < 1) {
			notifyError('rtn es requerido');
			return;
		}
		if (pinfoUserAccount.branch.length < 1) {
			notifyError('Numero de agencias es requerido');
			return;
		}
		if (pinfoUserAccount.diaryTotalTransaction.length < 1) {
			notifyError('Total de transacciones diarias es requerido');
			return;
		}
		if (pinfoUserAccount.transactionMin.length < 1) {
			notifyError('Transacciones minimas  es requerido');
			return;
		}
		if (pinfoUserAccount.transactionMax.length < 1) {
			notifyError('Transacciones maximas es requerido');
			return;
		}
		if (pinfoUserAccount.diaryTransactionLimit.length < 1) {
			notifyError('limite de transacciones diarias es requerido');
			return;
		}
		if (pinfoUserAccount.address.length < 1) {
			notifyError('direccion es requerida');
			return;
		}

		return true;
	};

	onSubmitDetalle = (e) => {
		e.preventDefault();
		const target = e.currentTarget;

		const infoAccount = {
			displayName: target.displayName.value,
			commercialName: target.commercialName.value,
			email: target.email.value,
			phoneNumber: target.phoneNumber.value,
			rtn: target.rtn.value,
			address: target.address.value,
			url: target.url.value,
			legalContact: target.legalContact.value,
			rtnContact: target.rtnContact.value
		};

		if (this.onValidateSendInfoDetalle(infoAccount)) {
			this.updateInfoAccount(infoAccount);
		}
	};

	onSubmitServicios = (e) => {
		e.preventDefault();
		const target = e.currentTarget;

		const infoAccount = {
			diaryTransactionLimit: target.diaryTransactionLimit.value,
			transactionMin: target.transactionMin.value,
			transactionMax: target.transactionMax.value,
			branch: target.branch.value,
			diaryTotalTransaction: target.diaryTotalTransaction.value,
			paymentProvider: target.paymentProvider.value,
			contract: target.contract.value
		};

		if (this.onValidateSendInfoServicios(infoAccount)) {
			this.updateInfoAccount(infoAccount);
		}
	};

	onSubmit = (e) => {
		e.preventDefault();
		const target = e.currentTarget;

		const infoAccount = {
			displayName: target.displayName.value,
			commercialName: target.commercialName.value,
			email: target.email.value,
			paymentProvider: this.state.paymentProvider,
			phoneNumber: target.phoneNumber.value,
			rtn: target.rtn.value,
			branch: parseInt(target.branch.value),
			diaryTotalTransaction: parseInt(target.diaryTotalTransaction.value),
			transactionMin: parseInt(target.transactionMin.value),
			transactionMax: parseInt(target.transactionMax.value),
			diaryTransactionLimit: parseInt(target.diaryTransactionLimit.value),
			address: target.address.value,
			url: target.url.value,
			legalContact: target.legalContact.value,
			rtnContact: target.rtnContact.value,
			contract: target.contract.value
		};

		if (this.onValidateSendInfo(infoAccount)) {
			this.updateInfoAccount(infoAccount);
		}
	};

	async getUserData() {
		this.setState({ loading: true });

		getAllUserAccount()
			.then((res) => {
				this.setState({
					dataSourceTable: { res }
				});

				let usersAccount = res.filter((userAccount) => userAccount.account === this.id_c);
				this.setState({ loading: true, usersAccount: usersAccount });
			})
			.catch((err) => {
				this.setState({
					error: err,
					loading: false,
					notification: {
						err,
						variant: 'error'
					}
				});
				notifyError(err.toString());
				return;
			});
	}

	async getDataSubscription() {
		const { id } = this.props.match.params;
		getOnesubscription(id)
			.then((res) => {		
                  this.setState({
                    infoSubscriber: res
                });
                
			})
			.catch((err) =>
				this.setState({
					error: err,
					loading: false,
					notification: {
						err,
						variant: 'error'
					}
				})
			);
	}

	onChangeFilter = (event) => {
		this.setState({
			paymentProvider: event.target.value
		});
	};

	componentDidMount() {
		this.getDataSubscription();
	}

	renderCardWithWidth = (widthAsPercent) => {
		return <Card style={{ width: widthAsPercent }} />;
	};

	render() {
		const { infoSubscriber, reload } = this.state;
		const { classes } = this.props;
	
		
		if (reload) {
			window.location.reload();
		}

		return (
			<div>
				<div>
					<ToastContainerR />
				</div>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper>
							<SubscriberIdCardHeader classes={classes} infoSubscriber={infoSubscriber} />
						</Paper>
						<br />
					</Grid>
				</Grid>
			</div>
		);
	}
}

SubscriberId.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(style)(SubscriberId);

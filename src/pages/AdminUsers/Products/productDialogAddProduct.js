import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';

const productDialogAddProduct = (props) => {
	const { Transition, openDetail, handleSubmit, onCloseModal } = props;
	return (
		<div style={{ flexGrow: 1 }}>
			<Dialog
				open={openDetail}
				onClose={onCloseModal}
				aria-labelledby='alert-dialog-title'
				TransitionComponent={Transition}
				fullWidth='fullWidth'
				maxWidth='md'
				scroll='paper'
				style={{ width: '90%', height: '100%', margin: 'auto' }}
			>
				{' '}
				<DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
					<span style={{ color: '#F8931D', padding: 10 }}>AGREGAR PRODUCTO</span>
				</DialogTitle>
				<Divider />
				<Divider />
				<DialogContent>
					{openDetail && (
						<form onSubmit={handleSubmit}>
							<div style={{ padding: 10 }}>
								<div style={{ paddingBottom: 10 }}>
									<TextField
										autoFocus
										margin='dense'
										id='name'
										label='Nombre del producto'
										type='name'
										fullWidth
										validators={[ 'required' ]}
										errorMessages={[ 'El nombre del producto es requerido' ]}
									/>
								</div>
								<div style={{ paddingBottom: 10 }}>
									<TextField
										margin='dense'
										id='description'
										label='Descripcion'
										type='description'
										fullWidth
									/>
								</div>
								<div style={{ paddingBottom: 10 }}>
									<TextField margin='dense' id='price' label='Precio' type='number' fullWidth />
								</div>
							</div>
							<div
								style={{
									flexGrow: 1,
									marginTop: 15
								}}
							>
								<div style={{ padding: 10, float: 'right' }}>
									<Button type='submit' color='primary' variant='contained'>
										AGREGAR PRODUCTO                    
									</Button>
								</div>
								<div style={{ padding: 10, float: 'right' }}>
									<Button onClick={onCloseModal} color='gray' variant='contained'>
										CANCELAR
									</Button>
								</div>
							</div>
						</form>
					)}
				</DialogContent>				
			</Dialog>
		</div>
	);
};

export default withStyles(withStyles)(productDialogAddProduct);

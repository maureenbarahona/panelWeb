const styles = theme => ({
    card: {
      minWidth: 10,
      minHeight: 60
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    button: {
      display: 'block',
      marginTop: theme.spacing.unit * 2
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 170,
      top: -10
    },
    formControlDate: {
      margin: theme.spacing.unit,
      minWidth: 170,
      top: 45
    },
    paper: {
      paddingTop: theme.spacing.unit * -2,
      paddingBottom: theme.spacing.unit * -2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 60,
      width: 110,
      flex: 4,
      margin: 10,
      left: 750,
      top: 10,
      position: 'relative'
    },
    paperClients: {
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing.unit
    },
    paperFrec: {
      paddingTop: theme.spacing.unit * -5,
      paddingBottom: theme.spacing.unit * -5,
      textAlign: 'left',
      color: theme.palette.text.secondary,
      width: 185,
      height: 28,
      top: 15,
      position: 'relative'
    },
    paperDate: {
      paddingTop: theme.spacing.unit * -5,
      paddingBottom: theme.spacing.unit * -5,
      textAlign: 'left',
      color: theme.palette.text.secondary,
      width: 185,
      height: 28,
      top: 5,
      position: 'relative'
    },
    paperSend: {
      padding: theme.spacing.unit * 0.7,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width: 185,
      height: 28,
      left: 850,
      top: -25,
      position: 'relative'
    },
    formControlAg: {
      margin: theme.spacing.unit,
      minWidth: 170,
      top: -15,
      left: -15,
      fontSize: 12,
      fontweight: 'bold',
      position: 'relative'
    },
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400
    },
    input: {
      marginLeft: 8,
      flex: 1
    },
    labelSubscriberName: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    },
    valueLps: {
      padding: 10
    },
    paperAdd: {
      paddingTop: '2px',
      padding: theme.spacing.unit * 0.2,
      textAlign: 'center',
      width: 140,
      height: 30,
      color: theme.palette.text.secondary
    },
    paperProduct: {
      padding: theme.spacing.unit * 0.7,
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    textFieldSubscriptionName: {
      margin: theme.spacing.unit,
      top: -14,
      position: 'relative',
      width: '100%'
    },
    textField: {
      margin: theme.spacing.unit,
      top: -14,
      position: 'relative'
    },
    paperAmount: {
      padding: theme.spacing.unit * 1,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 40,
      width: 70,
      left: 995
    },
    amount: {
      padding: theme.spacing.unit * 1,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 40,
      width: 70,
      left: 820,
      top: 20,
      position: 'relative'
    },
    amountL: {
      padding: theme.spacing.unit * 1,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      left: 820,
      top: 40,
      position: 'relative'
    },
    customerName: {
      paddingTop: '2px',
      paddingBottom: 'initial',
      display: 'block',
      textAlign: 'start',
      width: '100%'
    }
  });

  export default styles;
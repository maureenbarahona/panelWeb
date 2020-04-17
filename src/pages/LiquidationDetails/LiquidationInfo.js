import React from 'react'
import { Form, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

/*withdrawalAccount: {
  type: String,
  swift: String,
  bankname: String,
  accountNumber: String,
  routingNumber: String,
  paymentReference: String,
}*/
class LiquidationInfo extends React.Component {
  state = {
    Liquidacion:'',
    type: '',
    swift: '',
    bankname: '',
    accountNumber: '',
    routingNumber: '',
    paymentReference: '',
    userdata:{}
  }
  constructor(props){
    super(props);
    this.state ={...this.state,props,userdata:JSON.parse(localStorage.getItem("user"))}
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({type: value})
  }
  render () {
    const { getFieldDecorator } = this.props.form;
      return (
          <Form onSubmit={this.handleSubmit} >
            <FormItem
            label={`Liquidacion`}
            labelCol = {{span:5}}
            wrapperCol = {{span:12}}
            >
            <label>{`#${this.props.data.sequence}`}</label>
            </FormItem>
            <FormItem
            label="Banco"
            labelCol = {{span:5}}
            wrapperCol = {{span:12}}
            >
            {getFieldDecorator('banco',{
                rules:[{required:true, message: 'Por favor selecciona un banco'}],
            })(<Select
            placeholder = "Seleccione una opcion"
            onChange = {this.handleChange}
            >
              <Option value="bac">Banco1</Option>
              <Option value="atlantida">Banco2</Option>
            </Select>)}
            </FormItem>
          </Form>
      );
  }
}


  export default Form.create()(LiquidationInfo);

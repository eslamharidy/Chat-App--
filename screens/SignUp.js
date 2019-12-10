
import t from 'tcomb-form-native';
import Person, { formOptions } from '../models/Person';
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, KeyboardAvoidingView} from 'react-native';
import styles from './SignUp.styles';
import signUp from '../actions/users/sign-up';
import { connect } from 'react-redux';





export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { newUser: null };
  }
  componentDidMount() {
    // focus on the "name" field
    this.refs.form.getComponent('name').refs.input.focus();
  }
  clearForm() {
    this.setState({ newUser: null });
  }
  onChange(newUser) {
    this.setState({ newUser });
  }
  onSubmit() {
    const { form } = this.refs;
    const newUser = form.getValue();
    if (!newUser) return;
    console.log(newUser);
    this.props.signUp(newUser);
  }
  render() {
    const Form = t.form.Form;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}>
        <Text style={styles.title}>Sign up for ChatApp</Text>

        <Form
          ref="form"
          type={Person}
          options={formOptions}
          value={this.state.newUser}
          onChange={this.onChange} />
          <TouchableHighlight
             style={styles.button}
             onPress={this.onSubmit}
             underlayColor='#99d9f4'
          >
        <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>
        </KeyboardAvoidingView>
        </View>
    );
  }
}

const mapStateToProps = ({ loading }) => ({ loading });

export default connect(mapStateToProps, { signUp })(SignUp);
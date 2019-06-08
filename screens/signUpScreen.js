import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Container, Content, Text, Form ,Item, Input, Label, Button, Spinner } from 'native-base'
import firebase from 'react-native-firebase'

export default class SignUpScreen extends Component {
  state = {
    name:'',
    email:'',
    password:'',
    loading:false,
    message:''
  }

  signup(){
    const {email, password} = this.state
    this.setState({loading:true, message:''})

    if(email !== '' && password !== '' && name != ''){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        //once we are logged in, move to home screen
        //update user profile with name
        firebase.auth().currentUser.updateProfile({
          displayName: name
        })
        .then(()=>{
          //after updating the profile
          this.props.navigation.navigate('Home')
        })
        .catch((err)=>{
          //failed to update profile
          //move to home
          this.props.navigation.navigate('Home')
        })
        this.props.navigation.navigate('Home', {user})
      })
      .catch(err=>{
        //if failure, stop the spinner and show the error message
        this.setState({loading:false, message:err.message})
      })
    }else{
      this.setState({loading:false, message:"Fill in all messages!"})
    }
  }

  render() {
    const {loading,message} = this.state
    return (
      <Container>
        <Content 
        contentContainerStyle={{paddingHorizontal:20,paddingTop:50}}
        >
          {loading ? <Spinner color='blue'/> : <Text>{message}</Text>}
          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input 
              onChangeText={(name)=>this.setState({name})}
              autoFocus/>
            </Item>

            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
              onChangeText={(email)=>this.setState({email})}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={(password)=>this.setState({password})}
              secureTextEntry/>
            </Item>
          </Form>
          <Button 
          block 
          style={{marginVertical:40}}
          onPress={()=>this.signup()}>
            <Text>Get Started</Text>
          </Button>

          <Text style={{alignSelf:'center'}}> Or </Text>

          <Button 
          block
          transparent 
          style={{marginVertical:20}}
          onPress={()=>this.props.navigation.goBack()}
          >
            <Text style={{color:"red"}}>Already Have an Account? Let's get you there</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}
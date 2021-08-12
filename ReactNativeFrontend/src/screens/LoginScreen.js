import React, {useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Formik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import { setTokens } from '../security';
import { AuthContext } from '../context';
import * as Yup from 'yup';

const LOGIN = gql`
  mutation LoginMutation($password: String!, $username: String!) {
    login(password: $password, username: $username) 
    {
      accessToken
      refreshToken
    }
  }  
`;

const styles = StyleSheet.create({
    container : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 18,
        borderRadius: 30,
        width: 300,
        marginTop: 10,
        marginBottom: 10
    },
    errorText: {
        color: 'red'
    },
    lastText: {
        color: 'red',
        marginBottom: 10
    }
});

const LogInScreen = ({navigation}) => {

    const [login, {data}] = useMutation(LOGIN);
    const {signIn} = useContext(AuthContext);

    const storeTokens = async () => {
        await setTokens(data.login.accessToken, data.login.refreshToken);
        await signIn();
    };

    if (data)
    {
        storeTokens();
    }

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('This field is required!'),
        password: Yup.string().required('This field is required!')
    });

    const onSubmit = (values) => {

        login({
            variables: {
                username: values.username,
                password: values.password
            }
        });
    };

    return (
        <View>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                    {(props) => (
                        <View style={styles.container}>
                            <TextInput 
                                placeholder='Username'
                                onChangeText={props.handleChange('username')}
                                value={props.values.username}
                                onBlur={props.handleBlur('username')}
                                style={styles.input}
                            />
                            <Text style={styles.errorText}>{props.touched.username && props.errors.username}</Text>
                            <TextInput 
                                placeholder='Password'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur('password')}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                            <Text style={styles.lastText}>{props.touched.password && props.errors.password}</Text>
                            <Button title="LOG IN" mode="contained" style={styles.button} onPress={props.handleSubmit} />
                        </View>
                    )}
            </Formik>
        </View>
    );
};

export default LogInScreen;
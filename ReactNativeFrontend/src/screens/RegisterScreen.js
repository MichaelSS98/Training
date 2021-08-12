import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Formik } from 'formik';
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup';

const REGISTER = gql`
mutation RegisterMutation($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username)
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

const RegisterScreen = ({navigation}) => {

    const [register] = useMutation(REGISTER);

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    const arondRegex = /^[^@]*$/;
    const spaceRegex = /^\S*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const validationSchema = Yup.object({
        username: Yup.string()
        .matches(arondRegex, "The username must not contain the @ character")
        .matches(spaceRegex, "The username must not contain spaces")
        .required('This field is required!'),
        email: Yup.string()
        .email('Please insert a valid email address')
        .required("This field is required"),
        password: Yup.string()
        .matches(passwordRegex,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .required('This field is required!'),
        confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords differ")
        .required("This field is required")
    });

    const onSubmit = (values) => {

        register({
            variables: {
                username: values.username,
                email: values.email,
                password: values.password
            }
        });

        navigation.navigate("Log In");
    };

    return (
        <View>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                    {(props) => (
                        <View style={styles.container}>
                            <TextInput 
                                placeholder='Username'
                                onChangeText={props.handleChange('username')}
                                value={props.values.username}
                                onBlur={props.handleBlur("username")}
                                style={styles.input}
                            />
                            <Text style={styles.errorText}>{props.touched.username && props.errors.username}</Text>
                            <TextInput 
                                placeholder='Email'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                onBlur={props.handleBlur("email")}
                                style={styles.input}
                            />
                            <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                            <TextInput 
                                placeholder='Password'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                onBlur={props.handleBlur("password")}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                            <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                            <TextInput 
                                placeholder='Confirm Password'
                                onChangeText={props.handleChange('confirm_password')}
                                value={props.values.confirm_password}
                                onBlur={props.handleBlur("confirm_password")}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                            <Text style={styles.lastText}>{props.touched.confirm_password && props.errors.confirm_password}</Text>
                            <Button title="REGISTER" mode="contained" onPress={props.handleSubmit} />
                        </View>
                    )}
            </Formik>
        </View>
    );
};

export default RegisterScreen;
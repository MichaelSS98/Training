import React  from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';
import { Button } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE, GET_EMPLOYEES } from '../../../queries/Employees';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 18
    },
    submitButton: {
        width: 200,
        borderRadius: 30,
        marginBottom: 30,
        marginTop: 20
    },
    cancelButton: {
        width: 200,
        borderRadius: 30,
        marginBottom: 20,
    }
});

const EmployeeDeleteModal = ({popupDelete, setPopupDelete, employeeInfo}) => {

    const employeeId = employeeInfo[1];

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        update(cache, {data}) {
            
            const allEmployees = cache.readQuery({query: GET_EMPLOYEES});

            //delete the employee from cache
            const filteredEmployees = allEmployees?.getEmployees.filter(e => e.id !== employeeId);

            cache.writeQuery({
              query: GET_EMPLOYEES,
              data: {getEmployees: filteredEmployees}
            });

            cache.evict({id: employeeId});
        }
    });

    const handleSubmit = () => {

        deleteEmployee({
            variables: {
                id: employeeId
            }
        });

        handleClose();
    };

    const handleClose = () => {
        setPopupDelete(false);
    };

    return (
        <Modal 
            visible={popupDelete}
            onRequestClose={handleClose}
        >
            <View style={styles.container}>
                <Text style={styles.header}>ARE YOU SURE YOU WISH TO DELETE THIS EMPLOYEE?</Text>
                <Button title="submit" mode="contained" style={styles.submitButton} onPress={handleSubmit}>DELETE</Button>
                <Button title="close" mode="contained" style={styles.cancelButton} color="white" onPress={handleClose}>CANCEL</Button>
            </View>
        </Modal>
    );
};

export default EmployeeDeleteModal;
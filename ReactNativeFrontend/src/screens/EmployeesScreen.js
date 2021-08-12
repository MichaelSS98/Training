import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import {useQuery} from '@apollo/client';
import { GET_EMPLOYEES } from '../queries/Employees';
import {Button} from 'react-native-paper';
import EmployeeAddModal from '../components/Modals/Employees/EmployeeAddModal'
import EmployeeTableRow from '../components/TableRows/EmployeeTableRow';

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16, 
      paddingTop: 30, 
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#ffffff' 
    },
    head: { 
      height: 50, 
      backgroundColor: '#6F7BD9' 
    },
    text: { 
      textAlign: 'center', 
      fontWeight: '200' 
    },
    dataWrapper: { 
      marginTop: -1 
    },
    button: {
        width: 200,
        borderRadius: 30,
        marginBottom: 30
    }
});

const EmployeesScreen = () => {

    const [popupOpen, setPopupOpen] = useState(false);
    const {loading, error, data} = useQuery(GET_EMPLOYEES);

    if (loading)
        return <Text>Loading...</Text>

    if (error)
        console.log(error.message);

    //function that modifies the data received from the useQuery call to be used in the table
    const fetchEmployees = (() => {

        if (data)
        {
            const employees = data.getEmployees;
            const tableData = [];

            for (const employee of employees)
            {
                const tableRow = [];
                tableRow.push(employee.name);
                tableRow.push(employee.id);
                tableRow.push(employee.adress);
                tableRow.push(employee.email);
                tableRow.push(employee.hire_date);
                tableRow.push(employee.project_id);
                tableRow.push(employee.salary);
                tableRow.push(employee.job_title);
                tableData.push(tableRow);
            }

            return tableData;
        }

        return [];
    })();

    const tableHead = ['Name', 'ID', 'Adress', 'Email', 'Hire Date', 'Project ID', 'Salary', 'Job Title', '', ''];
    const widthArr = [60, 200, 120, 250, 100, 200, 60, 100, 60, 60];

    return (
        <View style={styles.container}>
            { popupOpen ? <EmployeeAddModal popupOpen={popupOpen} setPopupOpen={setPopupOpen}/> : <></> }
            <Button icon="plus-circle" mode="contained" style={styles.button} onPress={() => setPopupOpen(true)}>
                ADD EMPLOYEE
            </Button>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderColor: '#C1C0B9'}}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            {
                                fetchEmployees.map((dataRow, index) => (
                                    <EmployeeTableRow key={index} index={index} dataRow={dataRow} />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

export default EmployeesScreen;
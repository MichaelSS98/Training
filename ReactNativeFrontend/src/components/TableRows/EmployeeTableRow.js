import React, {useState} from 'react';
import { Row } from 'react-native-table-component';
import {View, StyleSheet} from 'react-native';
import { IconButton } from 'react-native-paper';
import EmployeeDeleteModal from '../Modals/Employees/EmployeeDeleteModal';
import EmployeeUpdateModal from '../Modals/Employees/EmployeeUpdateModal';

const styles = StyleSheet.create({
    text: { 
        textAlign: 'center',
        fontWeight: '200' 
    },
    row: {
        height: 40, 
        backgroundColor: '#F7F8FA',
        textAlign: "center"
    },
    editButton: {
        position: 'absolute',
        right: 70,
        top: -4
    },
    deleteButton: {
        position: 'absolute',
        right: 10,
        top: -4
    }
});

const EmployeeTableRow = ({dataRow, index}) => {

    const [popupDelete, setPopupDelete] = useState(false);
    const [popupUpdate, setPopupUpdate] = useState(false);
    const widthArr = [60, 200, 120, 250, 100, 200, 60, 100, 60, 60];

    //function that displays the date in a more readable fashion
    const customDateDisplay = (date) => {
        let dayString = "" + date.getDate();
        let monthString = "" + (date.getMonth() + 1);

        return `${monthString}/${dayString}/${date.getFullYear()}`;
    };

    dataRow[4] = customDateDisplay(new Date(dataRow[4]));

    return (
        <>
            { popupDelete ? <EmployeeDeleteModal popupDelete={popupDelete} setPopupDelete={setPopupDelete} employeeInfo={dataRow}/> : <></> }
            { popupUpdate ? <EmployeeUpdateModal popupUpdate={popupUpdate} setPopupUpdate={setPopupUpdate} employeeInfo={dataRow}/> : <></> }
            <View>
                <Row
                    key={index}
                    data={dataRow}
                    widthArr={widthArr}
                    style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                    textStyle={styles.text}
                />
                <IconButton icon="pencil" style={styles.editButton} onPress={() => setPopupUpdate(true)}/>
                <IconButton icon="delete" style={styles.deleteButton} onPress={() => setPopupDelete(true)}/>
            </View>
        </>
    )
};

export default EmployeeTableRow;
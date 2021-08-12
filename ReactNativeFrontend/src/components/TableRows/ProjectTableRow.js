import React, {useState} from 'react';
import { Row } from 'react-native-table-component';
import {View, StyleSheet} from 'react-native';
import { IconButton } from 'react-native-paper';
import ProjectUpdateModal from '../Modals/Projects/ProjectUpdateModal';
import ProjectDeleteModal from '../Modals/Projects/ProjectDeleteModal';

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

const ProjectTableRow = ({dataRow, index}) => {

    const [popupDelete, setPopupDelete] = useState(false);
    const [popupUpdate, setPopupUpdate] = useState(false);
    const widthArr = [100, 200, 120, 200, 200, 200, 60, 60];

    //function that displays the date in a more readable fashion
    const customDateTimeDisplay = (newDate) => {

        let dayString = "" + newDate.getDate();
        let monthString = "" + (newDate.getMonth() + 1);
        let hoursString = "" + newDate.getHours();
        let minutesString = "" + newDate.getMinutes();
        let secondsString = "" + newDate.getSeconds();

        return `${monthString}/${dayString}/${newDate.getFullYear()}, ${hoursString}:${minutesString}:${secondsString}`;
    }

    dataRow[3] = customDateTimeDisplay(new Date(dataRow[3]));
    dataRow[4] = customDateTimeDisplay(new Date(dataRow[4]));

    return (
        <>
            {popupDelete ? <ProjectDeleteModal popupDelete={popupDelete} setPopupDelete={setPopupDelete} projectInfo={dataRow}/> : <></>}
            {popupUpdate ? <ProjectUpdateModal popupUpdate={popupUpdate} setPopupUpdate={setPopupUpdate} projectInfo={dataRow}/> : <></>}
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

export default ProjectTableRow;
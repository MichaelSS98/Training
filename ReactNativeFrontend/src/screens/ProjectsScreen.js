import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import {useQuery} from '@apollo/client';
import { GET_PROJECTS } from '../queries/Projects';
import {Button} from 'react-native-paper';
import ProjectAddModal from '../components/Modals/Projects/ProjectAddModal';
import ProjectTableRow from '../components/TableRows/ProjectTableRow';

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

const ProjectsScreen = () => {

    const [popupOpen, setPopupOpen] = useState(false);
    const {loading, error, data} = useQuery(GET_PROJECTS);

    if (loading)
        return <Text>Loading...</Text>

    if (error)
        console.log(error.message);

    //function that modifies the data received from the useQuery call to be used in the table
    const fetchProjects = (() => {

        if (data)
        {
            const projects = data.getProjects;
            const tableData = [];

            for (const project of projects)
            {
                const tableRow = [];
                tableRow.push(project.project_name);
                tableRow.push(project.id);
                tableRow.push(project.project_code);
                tableRow.push(project.start_date);
                tableRow.push(project.planned_end_date);
                tableRow.push(project.description);
                tableData.push(tableRow);
            }

            return tableData;
        }

        return [];
    })();

    const tableHead = ['Project name', 'ID', 'Project code', 'Start date', 'Planned end date', 'Description'];
    const widthArr = [100, 200, 120, 200, 200, 200, 60, 60];

    return (
        <View style={styles.container}>
            { popupOpen ? <ProjectAddModal popupOpen={popupOpen} setPopupOpen={setPopupOpen}/> : <></> }
            <Button icon="plus-circle" style={styles.button} mode="contained" onPress={() => setPopupOpen(true)}>
                ADD PROJECT
            </Button>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{borderColor: '#C1C0B9'}}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            {
                                fetchProjects.map((dataRow, index) => (
                                    <ProjectTableRow key={index} index={index} dataRow={dataRow} />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProjectsScreen;
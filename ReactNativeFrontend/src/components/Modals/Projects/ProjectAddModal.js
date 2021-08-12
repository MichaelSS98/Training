import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, TextInput, ScrollView} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import {Formik} from 'formik';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT, GET_PROJECTS } from '../../../queries/Projects';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Yup from 'yup';

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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 18,
        borderRadius: 30,
        width: 320,
        marginTop: 10,
        marginBottom: 10
    },
    errorText: {
        color: 'red',
        marginLeft: 4
    },
    lastText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 4
    },
    calendarIcon: {
        position: "absolute",
        top: 13,
        left: 265
    },
    submitButton: {
        width: 200,
        borderRadius: 30,
        marginBottom: 30,
        marginLeft: 60
    },
    cancelButton: {
        width: 200,
        borderRadius: 30,
        marginBottom: 20,
        marginLeft: 60
    }
});

const ProjectAddModal = ({popupOpen, setPopupOpen}) => {

    const [isDateTimePickerVisibleS, setIsDateTimePickerVisibleS] = useState(false);
    const [isDateTimePickerVisibleE, setIsDateTimePickerVisibleE] = useState(false);

    const [addProject] = useMutation(ADD_PROJECT, {
        update(cache, {data}) {
            
            //get existing entries
            const existingProjects = cache.readQuery({query: GET_PROJECTS});

            //update cache with the old entries and the new one
            cache.writeQuery({
              query: GET_PROJECTS,
              data: {getProjects: [
                  ...existingProjects?.getProjects,
                  data?.addProject
                ]}
            })
        }
    });

    const initialValues = {
        project_name: "",
        project_code: "",
        start_date: "",
        planned_end_date: "",
        description: ""
    };

    const validationSchema = Yup.object({
        project_name: Yup.string().required("This field is required"),
        project_code: Yup.string().required("This field is required"),
        start_date: Yup.string().required("This field is required"),
        planned_end_date: Yup.string().required("This field is required"),
        description: Yup.string().required("This field is required")
    });

    //function that displays the date in a more readable fashion
    const customDateTimeDisplay = (newDate) => {

        let dayString = "" + newDate.getDate();
        let monthString = "" + (newDate.getMonth() + 1);
        let hoursString = "" + newDate.getHours();
        let minutesString = "" + newDate.getMinutes();
        let secondsString = "" + newDate.getSeconds();

        return `${monthString}/${dayString}/${newDate.getFullYear()}, ${hoursString}:${minutesString}:${secondsString}`;
    }

    const onSubmit = (values) => {

        addProject({
            variables: {
                project_name: values.project_name,
                project_code: values.project_code,
                start_date: (new Date(values.start_date)).toISOString(),
                planned_end_date: (new Date(values.planned_end_date)).toISOString(),
                description: values.description
            }
        });

        handleClose();
    };

    const handleClose = () => {
        setPopupOpen(false);
    };

    return (
        <Modal 
            visible={popupOpen}
            onRequestClose={handleClose}
        >
            <View>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {(props) => (
                        <View style={styles.container}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.header}>PLEASE FILL IN THE FOLLOWING INFORMATION FOR A NEW PROJECT</Text>
                                <TextInput 
                                    placeholder='Project name'
                                    onChangeText={props.handleChange('project_name')}
                                    value={props.values.project_name}
                                    onBlur={props.handleBlur('project_name')}
                                    style={styles.input}
                                />
                                <Text style={styles.errorText}>{props.touched.project_name && props.errors.project_name}</Text>
                                <TextInput 
                                    placeholder='Project code'
                                    onChangeText={props.handleChange('project_code')}
                                    value={props.values.project_code}
                                    onBlur={props.handleBlur('project_code')}
                                    style={styles.input}
                                />
                                <Text style={styles.errorText}>{props.touched.project_code && props.errors.project_code}</Text>
                                <View >
                                    <IconButton icon="calendar" style={styles.calendarIcon} onPress={() => setIsDateTimePickerVisibleS(true)} />
                                    <TextInput 
                                        placeholder='Project start date'
                                        onChangeText={props.handleChange('start_date')}
                                        value={props.values.start_date}
                                        onBlur={props.handleBlur('start_date')}
                                        editable={false}
                                        style={styles.input}
                                    />
                                    <Text style={styles.errorText}>{props.touched.start_date && props.errors.start_date}</Text>
                                </View>
                                <View>
                                    <IconButton icon="calendar" style={styles.calendarIcon} onPress={() => setIsDateTimePickerVisibleE(true)} />
                                    <TextInput 
                                        placeholder='Project planned end date'
                                        onChangeText={props.handleChange('planned_end_date')}
                                        value={props.values.planned_end_date}
                                        onBlur={props.handleBlur('planned_end_date')}
                                        editable={false}
                                        style={styles.input}
                                    />
                                    <Text style={styles.errorText}>{props.touched.planned_end_date && props.errors.planned_end_date}</Text>
                                </View>
                                <DateTimePickerModal 
                                    isVisible={isDateTimePickerVisibleS}
                                    mode="datetime"
                                    onConfirm={(date) => {props.setFieldValue('start_date', customDateTimeDisplay(date)); setIsDateTimePickerVisibleS(false);}}
                                    onCancel={() => setIsDateTimePickerVisibleS(false)}
                                    date={props.values.start_date !== '' ? new Date(props.values.start_date) : new Date()}
                                />
                                <DateTimePickerModal 
                                    isVisible={isDateTimePickerVisibleE}
                                    mode="datetime"
                                    onConfirm={(date) => {props.setFieldValue('planned_end_date', customDateTimeDisplay(date)); setIsDateTimePickerVisibleE(false);}}
                                    onCancel={() => setIsDateTimePickerVisibleE(false)}
                                    date={props.values.planned_end_date !== '' ? new Date(props.values.planned_end_date) : new Date()}
                                />
                                <TextInput 
                                    placeholder='Project description'
                                    onChangeText={props.handleChange('description')}
                                    value={props.values.description}
                                    onBlur={props.handleBlur('description')}
                                    style={styles.input}
                                />
                                <Text style={styles.lastText}>{props.touched.description && props.errors.description}</Text>
                                <Button title="submit" mode="contained" style={styles.submitButton} onPress={props.handleSubmit}>SUBMIT</Button>
                                <Button title="close" mode="contained" style={styles.cancelButton} color="white" onPress={handleClose}>CANCEL</Button>
                            </ScrollView>
                        </View>
                    )}
                </Formik>
            </View>
        </Modal>
    );
};

export default ProjectAddModal;
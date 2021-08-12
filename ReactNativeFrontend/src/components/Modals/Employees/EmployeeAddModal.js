import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, TextInput, ScrollView} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import {Formik} from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EMPLOYEE, GET_EMPLOYEES } from '../../../queries/Employees';
import {GET_PROJECTS} from '../../../queries/Projects';
import {Picker} from '@react-native-picker/picker';
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
    boxChoose: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 30,
        width: 320,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    choicePicker: {
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 18,
        borderRadius: 30,
        width: 300,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 23,
        height: 30,
        width: 320
    },
    nullItem: {
        color: "#999"
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

const EmployeeAddModal = ({popupOpen, setPopupOpen}) => {

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const [addEmployee] = useMutation(ADD_EMPLOYEE, {
        update(cache, {data}) {
            
            //get existing entries
            const existingEmployees = cache.readQuery({query: GET_EMPLOYEES});

            //update cache with the old entries and the new one
            cache.writeQuery({
              query: GET_EMPLOYEES,
              data: {getEmployees: [
                  ...existingEmployees?.getEmployees,
                  data?.addEmployee
                ]}
            })
        }
    });

    const {loading, error, data} = useQuery(GET_PROJECTS);

    if (loading)
        return <Text>Loading...</Text>

    if (error)
        console.log(error.message);

    //function that modifies the data received from the useQuery call to be used in the form
    const fetchProjects = (() => {

        if (data)
        {
            const projects = data.getProjects;
            return projects;
        }

        return {};
    })();

    const initialValues = {
        name: "",
        adress: "",
        email: "",
        hire_date: "",
        project_id: "",
        salary: "",
        job_title: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("This field is required"),
        adress: Yup.string().required("This field is required"),
        email: Yup.string().email("Please insert a valid email adress").required("This field is required"),
        hire_date: Yup.string().required("This field is required"),
        project_id: Yup.string().required("This field is required"),
        salary: Yup.number().typeError("Numbers only").integer("Must be an integer value").required("This field is required"),
        job_title: Yup.string().required("This field is required")
    });

    //function that displays the date in a more readable fashion
    const customDateDisplay = (date) => {
        let dayString = "" + date.getDate();
        let monthString = "" + (date.getMonth() + 1);

        return `${monthString}/${dayString}/${date.getFullYear()}`;
    };

    //function that prepares the date to be sent to the back end
    const convertDate = (dateString) => {

        const myDate = new Date(dateString);

        let dayString = myDate.getDate();
        let monthString = myDate.getMonth() + 1;
    
        if (myDate.getDate() < 10)
          dayString = "0" + myDate.getDate();
    
        if (myDate.getMonth() + 1 < 10)
          monthString = "0" + (myDate.getMonth() + 1);
      
        const myDateString = myDate.getFullYear() + "-" + monthString + "-" + dayString;
    
        return myDateString;
      }

    const onSubmit = (values) => {

        addEmployee({
            variables: {
                name: values.name,
                adress: values.adress,
                email: values.email,
                hire_date: convertDate(values.hire_date),
                project_id: values.project_id,
                salary: parseInt(values.salary, 10),
                job_title: values.job_title
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
            animationType="slide"
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
                                <Text style={styles.header}>PLEASE FILL IN THE FOLLOWING INFORMATION FOR A NEW EMPLOYEE</Text>
                                <TextInput 
                                    placeholder='Employee name'
                                    onChangeText={props.handleChange('name')}
                                    value={props.values.name}
                                    onBlur={props.handleBlur('name')}
                                    style={styles.input}
                                />
                                <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>
                                <TextInput 
                                    placeholder='Employee adress'
                                    onChangeText={props.handleChange('adress')}
                                    value={props.values.adress}
                                    onBlur={props.handleBlur('adress')}
                                    style={styles.input}
                                />
                                <Text style={styles.errorText}>{props.touched.adress && props.errors.adress}</Text>
                                <TextInput 
                                    placeholder='Employee email'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                    style={styles.input}
                                />
                                <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                                <View>
                                    <IconButton icon="calendar" style={styles.calendarIcon} onPress={() => setIsDatePickerVisible(true)} />
                                    <TextInput 
                                        placeholder='Employee hire date'
                                        onChangeText={props.handleChange('hire_date')}
                                        value={props.values.hire_date}
                                        onBlur={props.handleBlur('hire_date')}
                                        editable={false}
                                        style={styles.input}
                                    />
                                    <Text style={styles.errorText}>{props.touched.hire_date && props.errors.hire_date}</Text>
                                </View>
                                <DateTimePickerModal 
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={(date) => {props.setFieldValue('hire_date', customDateDisplay(date)); setIsDatePickerVisible(false);}}
                                    onCancel={() => setIsDatePickerVisible(false)}
                                    date={props.values.hire_date !== '' ? new Date(props.values.hire_date) : new Date()}
                                />
                                <View style={styles.boxChoose}>
                                    <Picker
                                        enabled={true}
                                        mode="dropdown"
                                        placeholder='Select Project'
                                        onValueChange={props.handleChange('project_id')}
                                        selectedValue={props.values.project_id}
                                        onBlur={props.handleBlur('project_id')}
                                        style={styles.choicePicker}
                                    >
                                        <Picker.Item label="Choose a project..." value="" style={styles.nullItem}/>
                                        {fetchProjects.map((item) => {
                                            return (
                                                <Picker.Item
                                                    label={item.project_name}
                                                    value={item.id}
                                                    key={item.id}
                                                />
                                            )
                                        })}
                                    </Picker>
                                </View>
                                <Text style={styles.errorText}>{props.touched.project_id && props.errors.project_id}</Text>
                                <TextInput 
                                    placeholder='Employee salary'
                                    onChangeText={props.handleChange('salary')}
                                    value={props.values.salary}
                                    onBlur={props.handleBlur('salary')}
                                    style={styles.input}
                                />
                                <Text style={styles.errorText}>{props.touched.salary && props.errors.salary}</Text>
                                <TextInput 
                                    placeholder='Employee job title'
                                    onChangeText={props.handleChange('job_title')}
                                    value={props.values.job_title}
                                    onBlur={props.handleBlur('job_title')}
                                    style={styles.input}
                                />
                                <Text style={styles.lastText}>{props.touched.job_title && props.errors.job_title}</Text>
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

export default EmployeeAddModal;
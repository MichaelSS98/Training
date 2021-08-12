import React  from 'react';
import {View, StyleSheet, Text, Modal} from 'react-native';
import { Button } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT, GET_PROJECTS } from '../../../queries/Projects';

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

const ProjectDeleteModal = ({popupDelete, setPopupDelete, projectInfo}) => {

    const projectId = projectInfo[1];

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        update(cache, {data}) {
            
            const allProjects = cache.readQuery({query: GET_PROJECTS});

            //delete the employee from cache
            const filteredProjects = allProjects?.getProjects.filter(e => e.id !== projectId);

            cache.writeQuery({
              query: GET_PROJECTS,
              data: {getProjects: filteredProjects}
            });

            cache.evict({id: projectId});
        }
    });

    const handleSubmit = () => {

        deleteProject({
            variables: {
                id: projectId
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
                <Text style={styles.header}>ARE YOU SURE YOU WISH TO DELETE THIS PROJECT?</Text>
                <Button title="submit" mode="contained" style={styles.submitButton} onPress={handleSubmit}>DELETE</Button>
                <Button title="close" mode="contained" style={styles.cancelButton} color="white" onPress={handleClose}>CANCEL</Button>
            </View>
        </Modal>
    );
};

export default ProjectDeleteModal;
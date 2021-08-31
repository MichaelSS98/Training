import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel'

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
        fontSize: 18,
        color: "white"
    },
    safeArea: {
        flex: 1,
        backgroundColor: "cornflowerblue",
        paddingTop: 50
    },
    itemView: {
        backgroundColor: "floralwhite",
        borderRadius: 5,
        height: 250,
        marginLeft: 25,
        marginRight: 25
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: "stretch",
    },
    itemFooter: {
        backgroundColor: "#999",
        height: 50,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white"
    }
});

const HomeScreen = () => {

    const carouselItems = [
        {
            title: "Office",
            text: "Please visit our company in the near future",
        },
        {
            title: "People",
            text: "Please visit our company in the near future",
        },
        {
            title: "Future",
            text: "Please visit our company in the near future",
        }
    ];

    const _renderItem = ({item, index}) => {

        switch(index) {
            case 1:
                return (
                    <View style={styles.itemView}>
                        <Image source={require('../../images/assets/carusel2.jpg')} style={styles.image} />
                        <View style={styles.itemFooter}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    </View>
                );

            case 2:
                return (
                    <View style={styles.itemView}>
                        <Image source={require('../../images/assets/carusel3.jpg')} style={styles.image} />
                        <View style={styles.itemFooter}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    </View>
                );

            default:

                return (
                    <View style={styles.itemView}>
                        <Image source={require('../../images/assets/carusel1.jpeg')} style={styles.image} />
                        <View style={styles.itemFooter}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    </View>
                );
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>WELCOME TO MY REACT NATIVE APP!</Text>
                <Carousel 
                    layout={"stack"}
                    data={carouselItems}
                    sliderWidth={350}
                    itemWidth={350}
                    renderItem={_renderItem}
                />
                <Text style={styles.header}>NOW USE THE DRAWER TO GO TO THE REST OF THE SCREENS!</Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
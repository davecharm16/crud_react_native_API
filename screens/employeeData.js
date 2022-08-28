import React, { useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';


const Employee = ({ employeeData, deleteHandler, updateHandler }) => {

    console.log(employeeData);

    const renderItem = ({item}) =>{
        return (
            <View style={styles.container}>
                <View style = {styles.viewContainer}>
                    <Text style ={styles.itemText} >ID : {item.id} </Text>
                    <Text style ={styles.itemText} >Employee Name : {item.name} </Text>
                </View>
                <View style = {styles.btnContainer}>
                    <Button title = 'DELETE' color={'red'} onPress= {()=>deleteHandler(item.id)} />
                    <View style = {styles.sep}></View>
                    <Button title = 'UPDATE' color={'coral'} onPress = {()=>updateHandler(item)}/>
                </View>
            </View>
            
        )
    }

    return (
        <FlatList
            data = {employeeData}
            renderItem = {renderItem}
        />
    )
}


const styles = StyleSheet.create({
    container :{
        paddingVertical: 20,
        // borderWidth: 1,
        elevation: 1,
        shadowColor : '#000',
        shadowRadius: 4,
        marginVertical: 10,
    },
    viewContainer : {
        flexDirection : 'row',
        padding: 10,
    },
    itemText : {
        marginHorizontal : 5,
        fontSize: 16,
    },
    btnContainer :{
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    sep :{
        width: 10,
    }
})


export default Employee;
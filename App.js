import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button,  Modal, Alert, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import Employee from './screens/employeeData';

export default function App() {
  //API URLS
  const readURL = 'https://restapitesthost.000webhostapp.com/api/read.php';
  const createURL = 'https://restapitesthost.000webhostapp.com/api/create.php';
  const deleteURL = 'https://restapitesthost.000webhostapp.com/api/delete.php';
  const updateURL = 'https://restapitesthost.000webhostapp.com/api/update.php';


  //states
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [readData, setReadData] = useState('');
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');


  useEffect(() => {
      getData();
  }, [])

  const getData = async () => {
    await axios.get(readURL)
    .then((response) => {
      const allData = response.data.body;
      console.log(allData);
      setReadData(allData);
    })
    .catch((error) => {
      console.log('ERROR : ' + error);
    })
  }

  const createData = async () =>{
    if(name != '' && age != '' && email != '' && designation != ''){
      setIsLoading(true);
      await axios.post(createURL, {
        name : name,
        email: email,
        age : age,
        designation : designation,
      })
      .then((response) => {
        console.log(response.data);
        Alert.alert(response.data);
        setIsLoading(false);
        setName('')
        setAge('')
        setEmail('')
        setDesignation('')
      })
      .catch((error)=>{
        console.log(error);
      });

    }
    else{
      Alert.alert('Please Complete All  Fields on the Form');
    }
  }

  const delHandler = async (id) =>{
    await axios.post(deleteURL, {
      id : id
    })
    .then((response) => {
      Alert.alert(response.data);
      getData();
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  const updateHandler = (item) =>{
    setModalVisibleUpdate(true);
    setID(item.id);
    setName(item.name);
    setAge(item.age);
    setEmail(item.email);
    setDesignation(item.designation);
  }

  const updateData = async()=>{
    if(name != '' && age != '' && email != '' && designation != ''){
      setIsLoading(true);
      await axios.post(updateURL, {
        id : id,
        name : name,
        email: email,
        age : age,
        designation : designation,
      })
      .then((response) => {
        Alert.alert(response.data);
        setIsLoading(false);
        setModalVisibleUpdate(!modalVisibleUpdate);
        setName('')
        setID('')
        setAge('')
        setEmail('')
        setDesignation('')
        getData()
      })
      .catch((error)=>{
        console.log(error);
      });
    }
    else{
      Alert.alert('Please Complete All  Fields on the Form');
    }
        // await axios.post(updateURL, {
    //   name : name,
    //   age : age,
    //   email : email,
    //   designation : designation,
    // })
    // .then((response) => {
    //   Alert.alert(response.data);
    //   getData();
    // })
    // .catch((error)=>{
    //   console.log(error);
    // });
  }

  return (
    <View style={styles.container}>
      {/* MODAL  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.modalText} 
              placeholder='Name' placeholderTextColor={'skyblue'}
              value = {name}
              onChangeText = {(val)=>setName(val)}
            />
            <TextInput style={styles.modalText} placeholder='Age' keyboardType='numeric' 
              placeholderTextColor={'skyblue'}
              value = {age}
              onChangeText = {(val)=>setAge(val)}
            />
            <TextInput style={styles.modalText} placeholder='Email' 
              keyboardType='email-address'  placeholderTextColor={'skyblue'}
              value = {email}
              onChangeText = {(val)=>setEmail(val)}
            />
            <TextInput style={styles.modalText} 
              placeholder='Designation' 
              placeholderTextColor={'skyblue'}
              value = {designation}
              onChangeText = {(val)=>setDesignation(val)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                createData();
              }}
              disabled = {isLoading}
            >
              <Text style={styles.textStyle}>CREATE</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose2]}
              onPress={
                () => {
                setModalVisible(!modalVisible)
                setName('')
                setAge('')
                setEmail('')
                setDesignation('')
                }
              }
            >
              <Text style={styles.textStyle}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleUpdate}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisibleUpdate);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.modalText} 
              placeholder='Name' placeholderTextColor={'skyblue'}
              value = {name}
              onChangeText = {(val)=>setName(val)}
            />
            <TextInput style={styles.modalText} placeholder='Age' keyboardType='numeric' 
              placeholderTextColor={'skyblue'}
              value = {age}
              onChangeText = {(val)=>setAge(val)}
            />
            <TextInput style={styles.modalText} placeholder='Email' 
              keyboardType='email-address'  placeholderTextColor={'skyblue'}
              value = {email}
              onChangeText = {(val)=>setEmail(val)}
            />
            <TextInput style={styles.modalText} 
              placeholder='Designation' 
              placeholderTextColor={'skyblue'}
              value = {designation}
              onChangeText = {(val)=>setDesignation(val)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                updateData()
              }}
              disabled = {isLoading}
            >
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose2]}
              onPress={
                () => {
                setModalVisibleUpdate(!modalVisibleUpdate)
                setName('')
                setAge('')
                setEmail('')
                setDesignation('')
                }
              }
            >
              <Text style={styles.textStyle}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* END MODAL */}

      <View style={styles.scrollContainer}>
        <Employee employeeData={readData} deleteHandler = { delHandler } updateHandler = { updateHandler }/>
      </View>
      <View style = {styles.buttonContainer}>
        <Button title='READ/LOAD' onPress={getData}/>
        <Button title='CREATE' onPress={() => setModalVisible(true)}/>
      </View>
      {/* <StatusBar/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding : 20,
    backgroundColor: '#fff',
  },
  scrollContainer : {
    flex: 1,
  },
  buttonContainer : {
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center'
  },
  modalView: {
    // flex : 1,
    // alignSelf: 'stretch',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonClose2:{
    backgroundColor: "red",
    marginVertical: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 10,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    alignSelf: 'stretch',
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor : 'skyblue'
  }
});

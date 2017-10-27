import React,{Component} from 'React';
import {StyleSheet,View,Text,Image, Dimensions} from 'react-native';

export default class Detail extends React.Component{
    static navigationOptions = {
        title: '商品详情'
      };
    render(){
        const { params } = this.props.navigation.state;
        return(
            <View style={styles.container}>
                  <Image source={params.image} style={styles. productImage} />
                <Text style={styles.text}>{params.title}</Text>
            </View>
        );
    };
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    productImage:{
        flex:1,
        marginLeft:10,
        marginRight:10,
        alignSelf:'center'
      },
    text:{
        backgroundColor:'yellow',
        fontSize:20,
        alignSelf:'center'
    }
});
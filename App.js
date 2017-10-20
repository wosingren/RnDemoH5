/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
  View,
  ListView,
  Dimensions,
  Alert,
  TouchableHighlight,
  Image
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ds = new ListView.DataSource({
  rowHasChanged:(r1,r2)=>r1!==r2
});

const circleSize=8;
const circleMargin=5;

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      currentpage:0,
      dataSource:ds.cloneWithRows([
        '商品1',
        '商品2',
        '商品3',
        '商品4',
        '商品5',
        '商品6',
        '商品7',
        '商品8',
        '商品9',
        '商品10'
      ]),
      advertisements:[
        {
          image:require('./images/advertisement-image-01.jpg')
        },
        {
          image:require('./images/advertisement-image-02.jpg')
        },
        {
          image:require('./images/advertisement-image-03.jpg')
        }
      ],
      searchText:''
    };
  }

  componentDidMount(){
    this._startTimer();
  }
  componetWillUnmount(){
    clearInterval(this.interval);
  }
  _startTimer(){
    this.interval= setInterval(()=>{
      nextPage = this.state.currentpage+1;
      if(nextPage>=3) nextPage=0;
      this.setState({currentpage:nextPage});
      const offSetX=nextPage*Dimensions.get('window').width;
      this.refs.scrollView.scrollResponderScrollTo({x:offSetX,y:0,animated:true});

    } ,2000);
  }
  render() {
    const advertisementCount = this.state.advertisements.length;
    const indicatorWidth = circleSize*advertisementCount+circleMargin*advertisementCount*2;//计算指示器宽度
    const left = (Dimensions.get('window').width-indicatorWidth)/2;//计算指示器最左边的坐标位置


    return (
      <View style={styles.container}>
        <View style={styles.searchbar}>
          <TextInput style={styles.input} placeholder='搜索商品' onChangeText={
            (text)=>{
                this.setState({searchText:text});
                console.log('输入的内容是'+this.state.searchText);
              }
            } ></TextInput>
          <Button style={styles.button} title='搜索' onPress={()=>Alert.alert('搜索内容'+this.state.searchText,null,null)} ></Button>
        </View>
        
        <View style={styles.advertisement}>
          <ScrollView ref='scrollView' horizontal={true} showHorizontalScrollIndictor={false} pagingEnabled={true}>
            {
              this.state.advertisements.map(
                (advertisement,index)=>{
                  return(
                    <TouchableHighlight key={index}  onPress={()=>Alert.alert("广告","你点击了轮播图片",null)}>
                       <Image style={styles.advertisementContent} source={advertisement.image} />
                    </TouchableHighlight>
                  );

                }

              )
            }
           
          </ScrollView>
          <View style={[styles.indicator,{left:left}]}>
            {
              this.state.advertisements.map(
                (advertisement,index)=>{
                  return (
                    <View key={index} style={(index===this.state.currentpage)?styles.circleSelected:styles.circle} />
                  );
                }
              )
            }

          </View>
        </View>
        <View style={styles.products}>
         <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} ></ListView>
        </View>
      </View>
    );
  }

  _renderRow=(rowData,sectionID,rowID)=>{
    return(
      <TouchableHighlight onPress={()=>Alert.alert('商品','单击了商品',null)}>
      <View style={styles.row}>
        <Text>{rowData}</Text>
      </View>
      </TouchableHighlight>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchbar: {
    marginTop:Platform.OS==='ios'?20:0,
    height:40,
    flexDirection:'row'
  },
   advertisement: {
    height:180
   
  },
 products: {
    flex:1,
    backgroundColor:'yellow',
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    flex:1,
    backgroundColor:'gray',
    borderWidth:2,
    borderRadius:10
  },
  button:{
    flex:1
  },
  row:{
    height:60,
    justifyContent:'center',
    alignItems:'center'
  },
  advertisementContent:{
    width:Dimensions.get("window").width,
    height:180
  },
  indicator:{
    position:'absolute',
    top:160,
    flexDirection:'row'

  },
  circle:{
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize/2,
    backgroundColor:'gray',
    marginHorizontal:circleMargin
  },
  circleSelected:{
    width:circleSize,
    height:circleSize,
    borderRadius:circleSize/2,
    backgroundColor:'white',
    marginHorizontal:circleMargin
  }
});

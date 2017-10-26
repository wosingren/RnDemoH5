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
  Image,
  RefreshControl
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
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品1',
          subTitle:'描述1'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品2',
          subTitle:'描述2'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品3',
          subTitle:'描述3'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品4',
          subTitle:'描述4'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品5',
          subTitle:'描述5'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品6',
          subTitle:'描述6'
        },
        {
          image:require('./images/product-image-01.jpg'),
          subTitle:'描述7'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品8',
          subTitle:'描述8'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品9',
          subTitle:'描述9'
        },
        {
          image:require('./images/product-image-01.jpg'),
          title:'商品10',
          subTitle:'描述10'
        }
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
      searchText:'',
      isRefreshing:false
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
          <Button style={styles.button} title='搜索' color='green' onPress={()=>Alert.alert('搜索内容'+this.state.searchText,null,null)} ></Button>
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
         <ListView dataSource={this.state.dataSource} renderRow={this._renderRow}
          renderSeparator={this._renderSeperator} refreshControl={this._renderRefreshControl()} >
          </ListView>
        </View>
      </View>
    );
  }

  _renderRow=(rowData,sectionID,rowID)=>{
    return(
      <TouchableHighlight onPress={()=>Alert.alert('商品','单击了商品',null)}>
      <View style={styles.row}>
      <Image source={rowData.image} style={styles.productImage} />
      <View style={styles.productText}>
      <Text style={styles.productTitle}>{rowData.title}</Text>
        <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  }

  _renderSeperator(sectionID,rowID,adjacentRowHightlighted){
    return(
      <View  style={styles.divider}>
        </View>
    );
  }

  _renderRefreshControl(){
      return (
      <RefreshControl refreshing={this.state.isRefreshing} tintColor={'#FF0000'} title={'正在刷新数据，请稍后...'} titleColor={'#0000FF'}
       onRefresh={this._OnRefesh}>

      </RefreshControl>
      );
  }

  _OnRefesh=()=>{
    this.setState({isRefreshing:true});
    setTimeout(()=>{
      const products= Array.from(new Array(10)).map((value,index)=>({image:require('./images/product-image-01.jpg'),title:'新商品'+index,subTitle:'新商品描述'+index}));
      this.setState({isRefreshing:false,dataSource:ds.cloneWithRows(products)});
  },2000)
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
    justifyContent:'center'
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
    flexDirection:'row',
    backgroundColor:'white'
  },
  productImage:{
    marginLeft:10,
    marginRight:10,
    width:40,
    height:40,
    alignSelf:'center'
  },
  productText:{
   flex:1,
   marginTop:10,
   marginBottom:10
  },
  productTitle:{
    flex:3,
    fontSize:16
   },
   productSubTitle:{
    flex:2,
    fontSize:14,
    color:'gray'
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
  },
  divider:{
    height:1,
    width:Dimensions.get('window').width-5,
    marginLeft:5,
    backgroundColor:'lightgray'
  }
});
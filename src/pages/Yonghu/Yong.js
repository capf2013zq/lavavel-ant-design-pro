import React, { Component } from 'react';
import {connect} from 'dva';
import { Table, Divider, Tag,Popconfirm,Button,message,Input, Icon} from 'antd';
import CollectionsPage　from './Jia';
import CollectionsPage2　from './Gai';
import CollectionsPage3　from './Phoot';
import CollectionsPage4　from './See';

class Yong extends Component
{
  state = {
    shuu: '',
  };

  constructor(props){           //构造函数
    super(props);
  }

  componentWillMount(){       　　//１．生命周期方法　　通过方法调用模板方法获取数据
    const {dispatch} =this.props;
    dispatch({
      type:"yong/fetch",
    })
  }

//====================================引用删除的方法
  dell(idd){
    const {dispatch} = this.props;
    // console.log(this.props);
    dispatch({
      type:'yong/delete',
      id:idd,
    });
    message.success("删除成功!");
  };
//=================================查询方法

  search = (value) => {
    const {dispatch,yong} = this.props;
      // console.log(this.props)
    // let liang = yong[0].length;
    dispatch({
      type:'yong/cha',
      id:value,
    });
    message.success("查询成功");
  }

  // lokk = (id) => {
  //   const {dispatch} = this.props;
  //   dispatch({
  //     type:'yong/see',
  //     id:id,
  //   });
  //
  // }

  render(){
     const {yong} = this.props;  　//２．在render中获得数据　来自于模板文件reponse 　
    // console.log(yong[0]);
        //多图按钮
    const ButtonGroup = Button.Group;
        //搜索组件
    const Search = Input.Search;
//=====
//  表单
//=====
    const columns = [{
      title: '员工号',
      dataIndex: 'id',
    },{
      title: '人员姓名',
      dataIndex: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
    }, {
      title: '头像',
      render: (record) => {
        // console.log(record);　　每一条具体的数据遍历了出来　record也是全部数据
        return (
          <div>
            <img src={(record.photo ? record.photo : '15.jpeg' )} alt="avatar"
                 style={{
                   height: "100px",
                   width: "100px",
                   borderRadius: "8px",
                   border: "4px solid #ddd",
                   padding: "4px",
                   background: "#fff"
                 }}/>
          </div>
        );
      },
    }, {
      title: '手机',
      dataIndex: 'tel',
    }
    , {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return(
          <div style={{ display:"flex" }}>
                        {/* 查看相册　Ｓee.js*/}
              <CollectionsPage4　shu={ record.p1 }/>
                        {/* 增加相册　Phoot.js*/}
           　 <CollectionsPage3 shu={ record }/>
                        {/* 更改基本信息　Gai.js*/}
              <CollectionsPage2 shu={ record }/>

            <Popconfirm title="确认删除?" onConfirm={() => this.dell(record.id)} >
              <Button type="danger"　icon="delete"　title="删除">
              </Button>
            </Popconfirm>



          </div>
          );
        },

    }];
//=====＝＝＝
//  表单结束
//=====＝＝＝
    return (
      <div>
        <Search
          placeholder="用户/性别/手机　模糊查询"
          enterButton="Search"
          size="large"
          onSearch={this.search}
          style={{
            width: "300px",
            marginLeft:"30%"
          }}
        />
        <CollectionsPage />
                  {/*这里是增加用户的组件*/}
        <Table columns={columns} dataSource={yong[0]} />
                  {/*　表格的组件，分别是列　和　全部的数据　*/}

      </div>

    )
  }
}

export default connect(yong => yong)(Yong);

import React from 'react';
import {connect} from 'dva';
import { Table,Drawer, Form, Button, Col, Row, Input, Popconfirm, Select, DatePicker,message,Upload, Icon, Menu, Dropdown, } from 'antd';
import Add from './Ceup';
import Oto from './Photo';

@connect(({ ceshi }) => ({
  ceshi,
}))

class DrawerForm extends React.Component {
  state = {
    visible: false,
    nameCreate: false,
    telCreate: false,
    photoCreate: false,
    loading: false,
  };

  //＝＝
  showDrawer = () => {
    this.setState({
      visible: true,
    });
    this.props.form.resetFields();
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

//===========
  //＝＝　图片验证方法
  // beforeUpload =(file) => {
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('不能大于２ＭＢ');
  //   }
  //   // console.log(file)
  //   // ``````````````` 这里已经拿到了图文件
  //   this.getBase64(file, (imageUrl) =>
  //   {
  //     this.setState({
  //       imageUrl,
  //       loading: true
  //     })
  //
  //   });
  //   return 1;
  // },
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

//================================添加方法
  handleSubmit = ()=> {
//==========判断添加条件
    this.props.form.validateFields(
      (err,values)=>{
        values['photo'] =  this.state.imageUrl;
        // console.log(values)
        if(this.state.nameCreate == true && this.state.telCreate == true && this.state.loading == true){
          const {dispatch} = this.props;
          dispatch({
            type:'ceshi/spp',
            id:values,
          });
          message.success("添加成功!");
          this.setState({
            visible: false,
          })
        }else{
          message.warning("添加失败!");
        }
      }
    );
  };



  addname =(relu,value,callback)=>{
    console.log(value);
    let re = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/);
    if(!re.test(value)){
      callback('用户名不正确');
      this.setState({
        nameCreate: false,
      });
      // console.log(1);
      return;
    }
    this.setState({
      nameCreate: true,
    });
    callback('*账户可用*');
  };

  addtel =(relu,value,callback)=> {
    console.log(value);
    let re = new RegExp(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/);
    if(!re.test(value)){
      callback('手机号不正确');
      this.setState({
        telCreate: false,
      });
      // console.log(1);
      return;
    }
    this.setState({
      telCreate: true,
    });
    callback('*手机号可用*');
  }
//=========================第二种上传图功能

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    this.setState({
      loading: true,
    });
    return e && e.fileList;
  }



//＝＝＝＝＝＝＝＝＝＝＝＝上传图的方法
//   handleChange = (info) => {
//     // console.log(info)
//     if (info.file.status === 'uploading') {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       this.setState({
//         imageUrl,
//         loading: false,
//       });
//     }
//   }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    //=============
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    // console.log(imageUrl)
    //============= 他这里自己尽然可以拿的到　不可思议
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          添加用户
        </Button>
        <Drawer
          title="填写信息"
          width={720}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical"  onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="用户名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '帐户不能为空' },{
                      validator:this.addname
                      //＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 正则验证方法
                    }],
                  })(<Input placeholder="请输入账户" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号">
                  {getFieldDecorator('tel', {
                    rules: [{ required: true, message: '手机不能为空' },{
                      validator:this.addtel
                    }],
                  })(<Input placeholder="请填写手机号" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                {/*＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝上传图片＝＝＝＝＝＝＝＝＝＝*/}
                <Form.Item
                  label="*头像">
                  <Upload
                    {... getFieldDecorator ('photo')}
                    name="photo"
                    listType="picture-card"
                    showUploadList={false}
                    action=""
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>


            </Row>
            <input type="submit" value="注册"/>
          </Form>

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'left',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              退出
            </Button>
            {/*<Button onClick={this.onClose} type="primary">提交</Button>*/}
          </div>
        </Drawer>
      </div>
    );
  }
}
const App = Form.create()(DrawerForm);

//将ａｐｐ　组件替换到原表格组件中
class Ceshi extends React.Component {
  constructor(props){       // 第一　引入构造函数　初始化
    super(props);
  }
  componentWillMount(){       //第二　创建生命周期方法 引入connect　就要有此方法　方法内就要有dispath
    const {dispatch} = this.props;

    dispatch({            //注意dispatch
      type:"ceshi/fetch",

    })
  }
//========================

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
//====================================引用删除的方法
  dell(idd){
    const {dispatch} = this.props;
    console.log(this.props);
    dispatch({
      type:'ceshi/delete',
      id:idd,
    });
    message.success("删除成功!");
  };

  render() {
    // console.log(this.props);
    const { ceshi } = this.props;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;



    const columns = [{
      title: 'Id',            //字段标题
      dataIndex: 'id',        //字段值
    }, {
      title: '用户名',
      dataIndex: 'name',
    },{
      title: '手机号',
      dataIndex: 'tel',
    },{
      title: '头像',
      render: (record) => {
        // console.log(record);　　每一条具体的数据遍历了出来
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
      //================================================================================
    },
      {
        title: '操作',
        render: (text, record) => {
          // console.log(record);　　每一条具体的数据遍历了出来
          return (
            <div>
              <Popconfirm title="确认删除?" onConfirm={() => this.dell(record.id)} >
                <Button type="danger">
                  删除
                </Button>
              </Popconfirm>
              <Button>
                <Add id={(record.id)} name={(record.name)} tel={(record.tel)}/>
              </Button>
              {/*给子组件传递ｉｄ　非常重要的一个步骤　　传值很重要*/}
              <Button>
                <Oto id={(record)}/>
              </Button>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <App />
          {/*//新的组件*/}
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={　ceshi[0]　}　rowKey={'id'} />

      </div>
    );
  }
}



export default connect(ceshi => ceshi)(Ceshi);

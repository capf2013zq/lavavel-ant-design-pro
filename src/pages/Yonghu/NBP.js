import { Upload, Icon, Modal,message } from 'antd';
import React, { Component } from 'react';


export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  //生命周期初始化方法
  componentWillMount(){       　　//生命周期方法
    const {　ima　} =this.props;
    //判断是否有值　没值就提醒　终止
    if(!ima){
      // message.warning('请上传头像');
      return ;
    }
    //      js中将字符转化为数组

    // let id  = Math.ceil(Math.random()*1000)%100;
    //　同时更改state　来触发方法　morImg方法
      let newarr =[];
      let idd  = Math.ceil(Math.random()*1000)%100;
     newarr[0] = {thumbUrl:ima,uid:idd};
    this.setState({
      fileList:newarr,
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })


  beforeUpload =(file) => {
    // console.log(file);
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG && !isPNG) {
      message.error('请上传正确的图文件!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
      return false;
    }
    return (isJPG || isPNG)  && isLt2M;
  }

  handlePreview = (file) => {
    // console.log(file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    // console.log(fileList);
    this.props.changes(fileList);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const {ima} = this.props;
    // console.log(ima);
    // console.log(this.state.fileList);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={ fileList}
          src={ima}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={ previewImage} />
        </Modal>
      </div>
    );
  }
}



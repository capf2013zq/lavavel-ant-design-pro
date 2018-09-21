import { Upload, Icon, Modal ,message} from 'antd';

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    morImg:'',
    fileList: [],
  };
  componentWillMount(){       　　//生命周期方法
    const {　shu　} =this.props;
    //判断是否有值　没值就提醒　终止
    if(!shu){
      message.warning('请上传');
      return ;
    }
    //      js将字符转化为数组
    let mydata = shu.split("#");
    // let id  = Math.ceil(Math.random()*1000)%100;
    //　同时更改state　来触发方法　morImg方法
    this.setState({
      morImg:this.morImg(mydata),
    });
  }
  morImg = (value)=>{
    let newarr = [];
    for(let i=0;i<value.length;i++){
      let idd  = Math.ceil(Math.random()*1000)%100;
        newarr[i] = {thumbUrl:value[i],uid:idd};
    }
    this.setState({
      fileList:newarr,
    })
  }


  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) =>{
    this.setState({ fileList })
    //    子组件给父组件传递数据
    this.props.changes(fileList);
  }


  render() {
    const { shu } = this.props;
    // console.log(shu);

    const { previewVisible, previewImage, fileList } = this.state;
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
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


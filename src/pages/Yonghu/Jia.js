import { Button, Modal, Form, Input, Radio,message } from 'antd';
import {connect} from 'dva';
import Nbp from "./NBP";
const FormItem = Form.Item;


const CollectionCreateForm = Form.create()(
class extends React.Component {

  state ={
    nameCreate: false,
    telCreate: false,
    photoCreate: false,
  };

  // onChange = () => {
  //   // this.setState({
  //   //   fileList,
  //   // });
  //   this.props.yanzheng(this.state);
  //   // this.props.onJia(this.state);
  //   // console.log(fileList);
  // }

  changes = (fileList) => {
    this.props.onJia(fileList);
  }
//=======手机正则方法
  addtel =(relu,value,callback)=> {
    console.log(value);
    let re = new RegExp(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/);
    if(!re.test(value)){
      callback('手机号不正确');
      this.setState({
        telCreate:false,
      });
      return;
    }else{
      this.setState({
        telCreate: true,
      });
      this.props.phone(true);
      callback('*手机号可用*');
    }
  };
//=========用户正则
  addname =(relu,value,callback)=>{
    console.log(value);
    let re = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/);
                          //代表匹配任意汉字
    if(!re.test(value)){
      callback('用户名不正确');
      this.setState({
        nameCreate:false,
      });
      return;
    }else{
      // if(!value){
      //   message.error('请填写账户');
      // }
      this.setState({
        nameCreate: true,
      });
      callback('*账户可用*');
      this.props.yanzheng(true);
    }

  };
    render() {
      const { visible, onCancel, onCreate, form} = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="添加信息"
          okText="添加"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="用户姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写用户' },{
                  validator:this.addname
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="头像">
            <Nbp changes={this.changes}/>
            </FormItem>
            <FormItem label="手机号">
              {getFieldDecorator('tel',{
                rules: [{ required: true, message: '手机不能为空' },{
                  validator:this.addtel
                 }],
              })(<Input type="textarea" />)}
            </FormItem>
            <FormItem　label="性别"
              className="collection-create-form_last-form-item">
              {getFieldDecorator('sex', {
                initialValue: '男',
              })(
                <Radio.Group>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

@connect(({ yong }) => ({
  yong,
}))

export default class CollectionsPage extends React.Component {
  state = {
    visible: false,
    nameCreate: '',
    telCreate: '',
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }
// =================上面组件传来的图片
  onJia = (e) => {
    this.setState({
      e,
    });
    // console.log(fileList[0]);
    //  console.log(this.state);
  }

//=================上面组件传来的名字验证
  yanzheng = (list) => {
    this.setState({
      nameCreate:list,
    });
    console.log('名字验证'+list);
  }

//＝＝＝＝＝＝＝＝＝＝＝手机验证
  phone = (list) => {
    this.setState({
      telCreate:list,
    });
    console.log('手机验证'+list);
  }

  handleCreate = () => {
      // console.log(this.state);
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      // console.log(values);
    values['photo']= this.state.e;
      // if (err) {
      //   console.log(err);
      //   return;
      // }
      if(this.state.nameCreate && this.state.telCreate){
        // console.log()
        const {dispatch} = this.props;
        dispatch({
          type:'yong/spp',
          id:values,
        });
        message.success('添加成功!');
        form.resetFields();
        this.setState({ visible: false });
      }else{
        message.error('请正确填写信息!');
      }

       // console.log('Received values of form: ', values);

    });
  }




  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>增加用户</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onJia={this.onJia}
          yanzheng={this.yanzheng}
          phone={this.phone}
        />
      </div>
    );
  }
}

// ReactDOM.render(<CollectionsPage />, mountNode);

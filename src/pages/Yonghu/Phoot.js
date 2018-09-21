import { Button, Modal, Form, Input,message,Popconfirm } from 'antd';
import Npp　from './Photos';
import {connect} from 'dva';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  class extends React.Component {

            //接收到photos子组件的值　再次传递给下面的主键
    changes = (fileList) => {
      this.props.onJia(fileList);
    }
    render() {
      const { visible, onCancel, onCreate, form ,shuju} = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="添加图片"
          okText="确定＊"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="ID">
              {getFieldDecorator('id', {
                initialValue:shuju.id,
              })(
                <Input disabled/>
              )}
            </FormItem>
            <FormItem label="相册">
              <Npp changes={this.changes}　shu={shuju.p1}/>
            </FormItem>

          </Form>
        </Modal>
      );
    }
  }
);


class CollectionsPage3 extends React.Component {
  state = {
    visible: false,
    fileList: [],
  };
  onJia = (files) => {
    this.setState({
      fileList: files,
    });
      console.log(this.state.fileList);
  }
  showModal = () => {
    this.setState({ visible: true });


  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      values['p1']= this.state.fileList;
      console.log(values);
      if (err) {
        return;
      }
      const {dispatch} =this.props;
      dispatch({
        type:'yong/ftt',
        id:values,
      });
      message.success('更改成功!');
      // console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){
    const {shu} =this.props;
    // console.log(shu.p1)
    return (
      <div>
        <Button onClick={this.showModal}　 icon="plus"  title="相册"></Button>
        {/*<a onClick={this.showModal}>添加相册</a>*/}

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onJia={this.onJia}
          shuju ={shu}
       />




      </div>
    );
  }
}

export default connect(yong => yong)(CollectionsPage3);

import { Drawer, Form, Button, Col, Row, Input, InputNumber,Select, DatePicker,message } from 'antd';
import {connect} from 'dva';
import Ceshi from './Ceshi';
import PicturesWall　from './Soto';
import * as qiniu from 'qiniu-js'

const { Option } = Select;

// 子组件　接收数值，非常重要的一个步骤　－＊－＊－＊
@connect(({ ceshi }) => ({
  ceshi,
}))


class DrawerForm extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { visible: false };
  // constructor(props){       // 第一　引入构造函数　初始化
  //   super(props);
  // }
  //==================================== 接收并打印子传递来的ｉｄ
  showDrawer = () => {
    this.setState({
      visible: true,
    });

    const {dispatch,id} = this.props;
    const idp = id;
    // const naa = name;
    // console.log(naa);
    dispatch({
        type:'photo/update',
        id:idp,
      }
    );
    this.props.form.resetFields();
  };

//=============================正在修改的值
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      visible: true,

    });
    this.props.form.validateFields(
      (err,values)=>{
        console.log(values)

        const {dispatch} = this.props;
        //＝＝＝＝＝＝＝＝＝没有值　只有ｉｄ
        dispatch({
          type:'photo/update',
          id:values,
          // console.log(values)
        });
        this.setState({
          visible: false,
        });
        message.success("添加图片成功!");
      }
    );

  };

  //=============




//====================



  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { photo,id } = this.props;      //这里析构出自己的所有字段值
    //console.log(this.props);
    const { getFieldDecorator} = this.props.form;
    return (
      <div>
        <a  onClick={this.showDrawer}> 添加相册</a>
        <Drawer
          title={id.name +"的相册＊"}
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

              <PicturesWall />

            </Row>
            <input type="submit" value="提交"/>

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
const Oto = Form.create()(DrawerForm);

export default Oto;


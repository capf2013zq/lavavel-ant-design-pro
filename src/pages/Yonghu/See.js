import { Button, Modal, Form, Input, Radio,Carousel,message } from 'antd';
const FormItem = Form.Item;
import {connect} from 'dva';


export default class CollectionsPage4 extends React.Component {
  state = {
    visible: false,
    morImg:""
  };
      //点击触发此方法
  showModal = () => {
      //同时获取主组件的传值
    const { shu } = this.props;
      //判断是否有值　没值就提醒　终止
    if(!shu){
      message.warning('暂无图片');
      return ;
    }
    //      js中将字符转化为数组
    let mydata = shu.split("#");
    //　同时更改state　来触发方法　morImg方法
    this.setState({
      visible: true,
      morImg:this.morImg(mydata),
    });
  }

  handleCancel = () => {
    this.setState({
      visible:false,
    });
  }
  handleOk　= () => {
    this.setState({
      visible:false,
    });
  }

  //遍历图片
  morImg = (value)=>{
    return value.map(item =>{
      return ( <div style={{
        width: "100%",
        display: "inline-block",
        background: "red"

      }}><img src={item} alt="" style={{
                    width: "100%",
                    borderRadius: "8px",
                    border: "6px solid #ccc",
                    borderBottomColor:"#00FF00",
                    padding: "4px",
                    background: "#00FF00"
                        }} /></div>);
           })
  }

  //图片方法
  // showImg(){
  //   return (
  //         <div>{this.state.morImg}</div>
  //   );
  // }

  render() {

    return (
        <div>
          <Button type="primary" onClick={this.showModal} icon="search" shape="circle" title="查看相册"></Button>
          <Modal
            title="图片展示"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{
              width:"700px",

            }}
          >
            <Carousel autoplay
            style={{ background:"red",
                      width:"400px",

                  }}
            >
            {this.state.morImg}
            </Carousel>
          </Modal>
      </div>
    );
  }
}




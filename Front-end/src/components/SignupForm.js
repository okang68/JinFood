import React, {Component} from 'react'
import {Modal, Button, Form, Input, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {signup} from "../utils"

class SignupForm extends Component {
    state = {displayModal: false, loading: false}

    handleCancel = () => {
        this.setState({displayModal: false})
    }

    signupOnClick = () => {
        this.setState({displayModal: true})
    }

    onFinish = data => {
        console.log('Received values of sign up form: ', data)
        this.setState({loading: true})
        signup(data)
            .then(() => {
                message.success(`Successfully signed up`)
                this.setState({displayModal: false})
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <>
                <Button
                    type="primary"
                    shape="round"
                    onClick={this.signupOnClick}
                >Register
                </Button>
                <Modal
                    title="Register"
                    visible={this.state.displayModal}
                    onCancel={this.handleCancel}
                    okButtonProps={{style: {display: 'none'}}}
                    //footer={null}
                    destroyOnClose={true}
                >
                    <Form
                        name="normal_register"
                        onFinish={this.onFinish}
                        preserve={false}
                    >
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: "Please input your email!"}]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Email"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: "Please input your password!"}]}
                        >
                            <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                        </Form.Item>
                        <Form.Item
                            name="firstName"
                            rules={[{required: true, message: "Please input your first name!"}]}
                        >
                            <Input placeholder="First Name"/>
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[{required: true, message: "Please input your last name!"}]}
                        >
                            <Input placeholder="Last Name"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default SignupForm

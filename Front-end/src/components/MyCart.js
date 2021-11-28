import React, {useState, useEffect} from 'react'
import {Drawer, Button, Typography, message, List} from 'antd'
import {getCart, checkout} from "../utils"

const {Text} = Typography

function MyCart() {
    const [cartVisible, setCartVisible] = useState(false)
    const [cartData, setCartData] = useState({})
    const [loading, setLoading] = useState(false)
    const [checking, setChecking] = useState(false)

    const onOpenDrawer = () => {
        setCartVisible(true)
    }

    const onCloseDrawer = () => {
        setCartVisible(false)
    }

    const onCheckOut = () => {
        setChecking(true)
        checkout()
            .then(() => {
                message.success("Successfully checkout")
                setCartVisible(false)
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                setChecking(false)
            })
    }

    useEffect(() => {
        if (!cartVisible) {
            return
        }

        setLoading(true)
        getCart()
            .then(cartData => {
                console.log('cartData: ', cartData)
                setCartData(cartData)
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [cartVisible])

    return (
        <>
            <Button type="primary"
                    shape="round"
                    onClick={onOpenDrawer}
            >Cart
            </Button>
            <Drawer
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width={520}
                footer={
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Text strong={true}>
                            {/*{`Total price: $${cartData?.totalPrice.toFixed(2)}`} /!*No. 1*!/*/}
                            {/*{`Total price: $${cartData ? cartData.totalPrice.toFixed(2) : 0.0.toFixed(2)}`} /!*No. 2*!/*/}
                            {`Total price: $${cartData.totalPrice ? cartData.totalPrice.toFixed(2) : 0.0.toFixed(2)}`} {/*No. 3*/}
                            {/*{`Total price: $${cartData.totalPrice.toFixed(2)}`} /!*No. 4*!/*/}
                        </Text>
                        <div>
                            <Button
                                style={{marginRight: 8}}
                                onClick={onCloseDrawer}
                            >Cancel
                            </Button>
                            <Button
                                type="primary"
                                onClick={onCheckOut}
                                loading={checking}
                                // disabled={loading || cartData?.orderItemList.length === 0} /*No. 1*/
                                // disabled={loading || (cartData && cartData.orderItemList.length === 0)} /*No. 2*/
                                disabled={loading || (cartData.orderItemList && cartData.orderItemList.length === 0)} /*No. 3*/
                                // disabled={loading || cartData.orderItemList.length === 0} /*No. 4*/
                            >Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    loading={loading}
                    // dataSource={cartData?.orderItemList} /*No. 123*/
                    // dataSource={cartData ? cartData.orderItemList : []} /*No. 123*/
                    dataSource={cartData.orderItemList ? cartData.orderItemList : []} /*No. 123*/
                    // dataSource={cartData.orderItemList} /*No. 4*/
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.menuItem.name}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    )
}

export default MyCart

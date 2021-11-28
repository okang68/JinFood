import React, {useState, useEffect} from 'react'
import {Select, message, List, Card, Tooltip, Button} from 'antd'
import {PlusOutlined} from "@ant-design/icons"
import {getRestaurants, getMenus, addItemToCart} from "../utils"

const {Option} = Select

const AddToCartButton = ({itemId}) => {
    const [loading, setLoading] = useState(false)

    const addToCart = () => {
        console.log('itemId: ', itemId)
        setLoading(true)
        addItemToCart(itemId)
            .then(() => {
                message.success(`Successfully add item`)
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                type="primary"
                icon={<PlusOutlined/>}
                onClick={addToCart}
                loading={loading}
            />
        </Tooltip>
    )
}

const FoodList = () => {
    const [curRest, setCurRest] = useState()
    const [restaurants, setRestaurants] = useState([])
    const [loadingRest, setLoadingRest] = useState(false)
    const [foodData, setFoodData] = useState([])
    const [loadingFood, setLoadingFood] = useState(false)

    useEffect(() => {
        setLoadingRest(true)
        getRestaurants()
            .then(restData => {
                console.log('restData: ', restData)
                setRestaurants(restData)
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                setLoadingRest(false)
            })
    }, [])

    useEffect(() => {
        if (curRest) {
            setLoadingFood(true)
            getMenus(curRest)
                .then(menuData => {
                    console.log('menuData: ', menuData)
                    setFoodData(menuData)
                })
                .catch(err => {
                    message.error(err.message)
                })
                .finally(() => {
                    setLoadingFood(false)
                })
        }
    }, [curRest])

    return (
        <>
            <Select value={curRest}
                    placeholder="Select a restaurant"
                    style={{width: 300}}
                    onSelect={value => setCurRest(value)}
                    loading={loadingRest}
            >{
                restaurants.map(item => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
            }
            </Select>
            {
                curRest && <List
                    style={{marginTop: 20}}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    loading={loadingFood}
                    dataSource={foodData}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                title={item.name}
                                extra={<AddToCartButton itemId={item.id}/>}
                            >
                                <img src={item.imageUrl}
                                     alt={item.name}
                                     style={{height: 'auto', width: "100%", display: "block"}}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />
            }
        </>
    )
}

export default FoodList

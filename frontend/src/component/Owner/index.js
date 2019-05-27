import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";
// import jwt from 'jsonwebtoken'
import rp from 'request-promise';
import { connect } from 'react-redux'

import PopupStamp from './Popup_Stamp';
import Dropdown from '../Dropdown';
// import PopupPrivate from '../Popup_Key';
import { showLoading, hideLoading } from './actions'


const myConfig = require('../../utils/config.json')


class Owner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            ownerAddress: '',
            productCode: null,
            quantity: 0,
            url: null,
            orders: null,
            showStamps: false,
            activePage: 1,
            itemsCountPerPage: 0,
            totalItemsCount: 0
        }
    }

    handleSelectData({ address, code }) {
        address && this.setState({ ownerAddress: address })
        code && this.setState({ productCode: code })
    }

    componentDidMount() {
        this.loadingData()
    }

    loadingData() {
        const token = localStorage.getItem('token')
        if (token) {
            // const user = jwt.decode(token)
            var options = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                json: true // Automatically parses the JSON string in the response
            };
            rp.get(`${myConfig.BACKEND_API}/product-type`, options)
                .then((parseBody) => {
                    let data = parseBody.data.map(item => ({
                        id: item.productType.id,
                        code: item.productType.code,
                        description: item.productType.description,
                        name: item.productType.name
                    }))
                    this.setState({
                        products: data
                    })

                })
                .catch((err) => {
                    toast.success("get product type fail!")
                })

            this.handlePageChange(1)
        }
    }

    handleGenerate() {
        const { quantity, productCode } = this.state
        const token = localStorage.getItem('token')
        if (!productCode) { toast.error("Product is not empty"); return }
        if (!quantity) { toast.error("Quantity is not empty"); return }
        if (token) {
            var options = {
                method: 'POST',
                uri: `${myConfig.BACKEND_API}/stamp/init`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    qty: quantity,
                    productCode
                },
                json: true // Automatically parses the JSON string in the response
            };
            rp.post(options)
                .then((parseBody) => {
                    this.loadingData()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    handleShowStamps(orderId) {
        this.setState({
            orderId: orderId,
            showStamps: true
        })
    }

    handleHideStamps() {
        this.setState({
            showStamps: false
        })
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });

        const token = localStorage.getItem('token')
        if (token) {
            // const user = jwt.decode(token)
            var options = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                json: true // Automatically parses the JSON string in the response
            };

            rp.get(`${myConfig.BACKEND_API}/stamp/order/${pageNumber}`, options)
                .then((parseBody) => {
                    this.setState({
                        orders: parseBody.data.data,
                        totalItemsCount: parseInt(parseBody.data.total),
                        itemsCountPerPage: parseBody.data.perPage,
                    })
                })
                .catch((err) => {
                    toast.error("get stamp orders fail!")
                })
        }
    }

    render() {
        return (
            <div className='temp'>
                <div className='profile_company'>
                    <div className='profile_company--item'>
                        <p>Owner Address:</p>
                        <a href={`${myConfig.KLAYTN_ETHER_SCAN}/account/0xaa608af8fb6d132676b93fd133e1895f0eb59a22`}>{
                            this.state.ownerAddress.length ?
                                this.state.ownerAddress :
                                `0xaa608af8fb6d132676b93fd133e1895f0eb59a22`
                        }</a>
                    </div>
                </div>
                <div className='general_transfer'>
                    <div>
                        <div className='general_transfer--item'>
                            <p>Product Type:</p>
                            <Dropdown dataList={this.state.products}
                                type="product"
                                handleSelectData={this.handleSelectData.bind(this)} />
                        </div>
                        <div className='general_transfer--item'>
                            <p>Quantity:</p>
                            <input placeholder='Quantity...' type='number' className='txtInput'
                                onChange={(e) => {
                                    this.setState({ quantity: parseInt(e.target.value) })
                                }} />
                        </div>
                    </div>
                    <button className='btn' onClick={() => this.handleGenerate()}>GENERATE</button>
                </div>
                <div className='stamp_order_list'>
                    <div className='list_stamp'>
                        <h2>List Of Stamp Orders</h2>
                        <div className='list_stamp--table'>
                            <div className='row'>
                                <div>No.</div>
                                <div>Order</div>
                                <div>Product Code</div>
                                <div>Quantity</div>
                                <div>Status</div>
                            </div>
                            {this.state.orders ? this.state.orders.map((s, index) => (
                                <div className='row' key={s + index}
                                    onClick={() => this.handleShowStamps(s.id)}>
                                    <div>{index + 1}</div>
                                    <div>{s.name}</div>
                                    <div>{s.productCode}</div>
                                    <div>{s.qty}</div>
                                    <div>{s.status === 0 ? "Newly" :
                                        <a href={s.url} download>Generated</a>}</div>
                                </div>
                            )) : null}
                        </div>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                        />
                    </div>
                    {this.state.showStamps && <PopupStamp
                        orderId={this.state.orderId}
                        handleHideStamps={() => this.handleHideStamps()} />}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = { showLoading, hideLoading }

export default connect(null, mapDispatchToProps)(Owner);

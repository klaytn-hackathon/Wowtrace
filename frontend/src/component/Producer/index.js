import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "react-js-pagination";

// import Dropdown from '../Dropdown';
import PopupProduct from './Popup_Product';
import PopupPrivate from '../Popup_Key';
import rp from 'request-promise';
import ProgressBar from "../ProgressBar"

const { sendActivateStamp } = require('../../utils/SendRawTransaction')
const myConfig = require("../../utils/config.json")

class Producer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: false,
            isShowPrivate: false,
            isShowProduct: false,
            stamps: [],
            productList: [],
            productName: null,
            activePage: 1,
            itemsCountPerPage: 0,
            totalItemsCount: 0
        }
    }

    componentWillMount() {
        this.handlePageChange(1)
    }

    handleShowPrivateBox = () => {
        const privateKey = localStorage.getItem('private')
        if (!privateKey) {
            this.setState({
                isShowPrivate: true
            })
        } else {
            this.handleActivate()
        }
    }

    handleShowProductBox = (name) => {
        this.setState({
            isShowProduct: !this.state.isShowProduct,
            productName: name
        })
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            let arr = this.state.stamps
            if (!arr.includes(e.target.value)) {
                arr.push(e.target.value)
            }
            this.setState({ stamps: arr })
            e.target.value = ""
        }
    }

    _renderStampList(stamps) {
        return stamps.map((stamp, index) => (
            <div className='row' key={index}>
                <div>{index + 1}</div>
                <div>{stamp}</div>
            </div>
        ))
    }

    _renderProductList() {
        return this.state.productList.map((product, index) => (
            <div className='row' key={index + product}>
                <div>{index + 1}</div>
                <div>{product.name}</div>
                <div>{product.qty} stamps</div>
                <div className='view'>
                    <button onClick={() => this.handleShowProductBox(product.name)}>view detail</button>
                </div>
            </div>
        ))
    }

    handlePageChange(pageNumber) {
        const token = localStorage.getItem('token')
        if (token) {
            var options = {
                uri: `${myConfig.BACKEND_API}/stamp/get-activate/${pageNumber}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },

                json: true // Automatically parses the JSON string in the response
            };
            rp.get(options)
                .then((parseBody) => {
                    // console.log(bodyParser)
                    this.setState({
                        productList: parseBody.data.data,
                        totalItemsCount: parseInt(parseBody.data.total),
                        itemsCountPerPage: parseBody.data.perPage,
                        activePage: pageNumber
                    })
                })
        }
    }

    handleActivate() {
        const self = this
        this.setState({
            isShowPrivate: false,
            showLoading: true
        })
        let { stamps, productList } = this.state
        const token = localStorage.getItem('token')
        if (token && stamps.length > 0) {
            var options = {
                method: 'POST',
                uri: `${myConfig.BACKEND_API}/stamp/create-activate`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    codes: stamps
                },
                json: true // Automatically parses the JSON string in the response
            };
            rp.post(options)
                .then(() => {
                    sendActivateStamp(stamps, true).then((data) => {
                        productList.push(data)
                        self.setState({
                            productList,
                            showLoading: false
                        })
                        toast.success("Activated successfully", {
                            position: toast.POSITION.TOP_CENTER,
                            toastId: "Activated successfully"
                        })
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    componentDidUpdate() {
        const self = this
        const productPopupWrap = window.document.getElementById("productPopup")
        const privatePopupWrap = window.document.getElementById("privatePopup")
        if (productPopupWrap) {
            productPopupWrap.addEventListener("click", (e) => {
                if (e.target !== productPopupWrap)
                    return;
                self.setState({
                    isShowProduct: false
                })
            })
        }
        if (privatePopupWrap) {
            privatePopupWrap.addEventListener("click", (e) => {
                if (e.target !== privatePopupWrap)
                    return;
                self.setState({
                    isShowPrivate: false
                })
            })
        }
    }

    render() {
        const { productList, productName } = this.state
        return (
            <div className='temp'>
                <div className='profile_company product_name'>
                    {this.state.isShowProduct && <PopupProduct product={productName} />}
                    <div className='row'>
                        <div>No.</div>
                        <div>Product Name</div>
                        <div>Quantity stamp</div>
                        <div></div>
                    </div>
                    {this.state.showLoading ?
                        (<ProgressBar />) :
                        (productList.length ?
                            this._renderProductList(productList) :
                            (<i>No products</i>))}
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                    />
                </div>
                <div className='scan'>
                    <div className='scan_stamp'>
                        <div className='scan_stamp--item'>
                            <label>Add stamp</label>
                            <div className='scan_stamp--qrcode'>

                                <input
                                    type='text'
                                    className='txtScan'
                                    placeholder='Scan stamp...'
                                    onKeyPress={(e) => this.handleKeyPress(e)} />
                            </div>
                        </div>
                        <div className='scan_stamp--item'>
                            <label>Remove stamp</label>
                            <div className='scan_stamp--qrcode'>

                                <input
                                    type='text'
                                    className='txtScan'
                                    placeholder='Scan stamp...'
                                    onKeyPress={(e) => this.handleKeyPress(e)} />
                            </div>
                        </div>
                        <div className='scan_stamp--item'>
                            <label>Add range of stamps</label>
                            <div className='scan_stamp--draw'>
                                <label>From</label>
                                <input type='text' className='txtNum' placeholder='Start number...' />
                                <label>To</label>
                                <input type='text' className='txtNum' placeholder='End number...' />
                            </div>
                        </div>
                    </div>
                    <div className='list_stamp'>
                        <h2>List stamp</h2>
                        <div className='list_stamp--table'>
                            <div className='row'>
                                <div>No.</div>
                                <div>stamp ID</div>
                            </div>
                            {this.state.stamps.length === 0 ?
                                <div>No Stamps</div> :
                                this._renderStampList(this.state.stamps)}
                        </div>
                        <button className='btnComplete' onClick={this.handleShowPrivateBox}>COMPLETE</button>
                        {this.state.isShowPrivate && <PopupPrivate handleSubmit={this.handleActivate.bind(this)} />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Producer;

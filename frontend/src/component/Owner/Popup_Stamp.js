import React, { Component } from 'react';
import { connect } from 'react-redux'
import rp from 'request-promise';
import Pagination from "react-js-pagination";


import PopupPrivate from '../Popup_Key';
import { showLoading, hideLoading } from './actions'
const { sendInitStamp } = require('../../utils/SendRawTransaction')
const myConfig = require('../../utils/config.json')

const NEWLY = 0
// const INITIATED = 1

class Popup_Stamp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPrivate: false,
            product: null,
            showActivate: false,
            activePage: 1,
            itemsCountPerPage: 0,
            totalItemsCount: 0
        }
    }

    componentWillMount() {
        this.handlePageChange(1)
    }

    handlePageChange(pageNumber) {
        const token = localStorage.getItem('token')

        var options = {
            uri: `${myConfig.BACKEND_API}/stamp/${this.props.orderId}/${pageNumber}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            json: true // Automatically parses the JSON string in the response
        };
        rp.get(options)
            .then((parseBody) => {
                const showActivate = (parseBody.data.data.filter((p) => (p.status === NEWLY))).length !== 0
                this.setState({
                    product: parseBody.data.data,
                    totalItemsCount: parseInt(parseBody.data.total),
                    itemsCountPerPage: parseBody.data.perPage,
                    showActivate,
                    activePage: pageNumber
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    _renderStampList() {
        const { product } = this.state
        return (product ? product.map((item, index) => (
            <div className='row' key={index + item}>
                <div>{index + 1}</div>
                <div>{item.code}</div>
                {item.txn ? <a href={`${myConfig.KLAYTN_ETHER_SCAN}/tx/${item.txn}`}>{item.txn}</a> : <div />}
            </div>)) : null)
    }

    handleInitiate() {
        this.props.showLoading()
        let { product } = this.state
        const stampCodes = product.filter((p) => (p.status === NEWLY)).map(p => (p.code))
        this.handleHidePrivateKey()
        sendInitStamp(stampCodes, true)
            .then((data) => {
                this.props.hideLoading()
                this.handlePageChange(this.state.activePage)
            })
            .catch(() => {
                this.props.hideLoading()
                this.handlePageChange(this.state.activePage)
            })
    }

    handleClose(e) {
        if (e.target.id === "productPopup") {
            this.props.handleHideStamps()
        }
    }

    handleShowPrivateKey() {
        const privateKey = localStorage.getItem('private')
        if (!privateKey) {
            this.setState({
                isShowPrivate: true
            })
        } else {
            this.handleInitiate()
        }
    }

    handleHidePrivateKey() {
        this.setState({
            isShowPrivate: false
        })
    }

    render() {
        return (
            <div className='popup_wra' id="productPopup" onClick={(e) => this.handleClose(e)} >
                <div className='popup_wra--form pop_product'>
                    <label>Product Name</label>
                    <div className='list_stamp'>
                        <div className='list_stamp--table'>
                            <div className='row'>
                                <div>No.</div>
                                <div>Stamp Code</div>
                                <div>Tnx</div>
                            </div>
                            {this._renderStampList()}
                        </div>
                    </div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                    />
                    <div className='popup_wra--footer'>
                        {this.state.showActivate && (<button onClick={() => this.handleShowPrivateKey()}>Activate Stamps</button>)}
                    </div>
                </div>
                {this.state.isShowPrivate && <PopupPrivate
                    handleSubmit={() => this.handleInitiate()}
                    handleHidePrivateKey={() => this.handleHidePrivateKey()}
                />}
            </div>
        );
    }
}

const mapDispatchToProps = { showLoading, hideLoading }

export default connect(null, mapDispatchToProps)(Popup_Stamp);

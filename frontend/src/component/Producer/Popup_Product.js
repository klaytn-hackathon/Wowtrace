import React, { Component } from 'react';
import Pagination from "react-js-pagination";

import rp from 'request-promise';
const myConfig = require('../../utils/config.json')

class Popup_Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            product: props.product,
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
        if (token) {
            var options = {
                uri: `${myConfig.BACKEND_API}/stamp/activate/${this.state.product}/${pageNumber}`,
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

    _renderStampList() {
        return this.state.productList.map((item, index) => (
            <div className='row' key={index}>
                <div>{index + 1}</div>
                <div>{item.code}</div>
                <a href={`${myConfig.KLAYTN_ETHER_SCAN}/tx/${item.txn}`}>{item.txn}</a>
            </div>))
    }

    render() {
        return (
            <div className='popup_wra' id="productPopup">
                <div className='popup_wra--form pop_product'>
                    <label>Product Name</label>
                    <div className='list_stamp'>
                        <div className='list_stamp--table'>
                            <div className='row'>
                                <div>No.1</div>
                                <div>Stamp code</div>
                                <div>txn</div>
                            </div>
                            {this._renderStampList()}
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={5}
                                onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Popup_Product;

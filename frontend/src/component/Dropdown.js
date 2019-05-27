import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChange: false,
            currentNumber: '',
        }
    }

    handleClick = () => {
        this.setState({
            isChange: !this.state.isChange
        })
    }

    handleSelect = (selected, {code, address}) => {
        this.setState({
            currentNumber: selected,
            isChange: !this.state.isChange
        })
        this.props.handleSelectData({code, address})
    }

    _renderProducts (data) {
        const list = data.map((item) => 
        (<li onClick={() => this.handleSelect(item.name, {code: item.code})} key={item.id}>
            <p>{item.name}</p>
            <p>{item.code}</p>
        </li>))
        return (<ul> 
            {list}
        </ul>)
    }

    _renderOwner (data) {
        const list = data.map((item) => 
        (<li onClick={() => this.handleSelect(item.name, {address: item.address})} key={item.id}>
            <p>{item.name}</p>
            <p>{item.address}</p>
        </li>))
        return (<ul> 
            {list}
        </ul>)
    }

    render() {
        const { dataList, type } = this.props
        return (
            <div className='dropdown__contain'>
            <div className='inp'>
                <input onClick={this.handleClick} className='inp__input' name='inp__input' readOnly placeholder='Your choose number' defaultValue={this.state.currentNumber} />
                <button onClick={this.handleClick}>{this.state.isChange ? 'Done':'Choose'}</button>
            </div>
            {this.state.isChange && <div className='dropdown'>
                {dataList.length === 0 && type === "product" ? 
                    (
                    <ul>
                        <li >Autherization</li>
                    </ul>
                    ) : type === "owner" ?  this._renderOwner(dataList) : this._renderProducts(dataList)
                }
                    
            </div>}
        </div>
        );
    }
}

export default Dropdown;

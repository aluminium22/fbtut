import Repeatable from 'react-repeatable';
import React, {Component} from 'react';
import './dice.css';

class DieButton extends Component {

    onPressLocal = () => {
        this.props.onPressDice(this.props.value.number)
    };

    render() {
        return (
            <div
                className={this.props.className}
                onClick={(event) => {
                    this.onPressLocal()
                    // Callback fired when the mousedown or touchstart event is triggered.
                }}
            >
                <img className='dice-button-img' alt={this.props.value.number}
                     src={require(`../dice/images/${this.props.value.image}`)}/>
                <span className=' text-darken-4 text-bold font-size16'>{this.props.value.number}</span>
            </div>
        )
    }
}

export default DieButton
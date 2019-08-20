import Repeatable from 'react-repeatable';
import React, {Component} from 'react';
import './dice.css';

class DieButton extends Component {

    onPressLocal = () => {
        this.props.onPressDice(this.props.value.number)
    };
    onHoldStartLocal = () => {
        this.props.onHoldStart(this.props.value.number)
    };
    onReleaseLocal = () => {
        this.props.onRelease(this.props.value.number)
    };
    onHoldEnd = () => {
        this.props.onHoldEnd(this.props.value.number)
    };

    render() {
        return (
            <Repeatable
                className={this.props.className}
                repeatDelay={this.props.repeatDelay}
                repeatInterval={this.props.repeatInterval}
                onPress={(event) => {
                    this.onPressLocal()
                    // Callback fired when the mousedown or touchstart event is triggered.
                }}
                onHoldStart={() =>
                    this.onHoldStartLocal()
                    // Callback fired once before the first hold action.
                }
                onHold={() => {
                    this.props.onHold()
                    // Callback fired mutiple times while holding down.
                }}
                onHoldEnd={() => {
                    this.onHoldEnd()
                    // Callback fired once after the last hold action.
                }}
                onRelease={(event) => {
                    console.log('event', event);
                    this.onReleaseLocal(event)
                    // Callback fired when the mouseup, touchcancel, or touchend event is triggered.
                }}
            >
                <img className='dice-button' alt={this.props.value.number}
                     src={require(`../dice/images/${this.props.value.image}`)}/>
                <span className=' text-darken-4 text-bold font-size16'>{this.props.value.number}</span>
            </Repeatable>
        )
    }
}

export default DieButton
import Repeatable from 'react-repeatable';
import React, {Component} from 'react';

class DieButton extends Component {
    onPressLocal = () => {
        this.props.onPressDice(this.props.value)
    };
    onHoldStartLocal = () => {
        this.props.onHoldStart(this.props.value)
    };
    onReleaseLocal = () => {
        this.props.onRelease(this.props.value)
    };
    onHoldEnd = () => {
        this.props.onHoldEnd(this.props.value)
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
                {this.props.value}
            </Repeatable>
        )
    }
}

export default DieButton
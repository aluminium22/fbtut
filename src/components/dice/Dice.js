import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import DieButton from "./DieButton";
import './dice.css';

const modConstants = [{index: 1, numbers: [0, 1, 2, 3, 4, 5]}, {index: 2, numbers: [6, 7, 8, 9, 10, 11]}, {
    index: 3,
    numbers: [12, 13, 14, 15, 16, 17]
}, {index: 4, numbers: [18, 19, 20, 21, 22, 23]}, {index: 5, numbers: [24, 25, 26, 27, 28, 29]}];
const diceSelection = [
    {
        index: 1,
        row: [
            {number: 4, name: '1d4', image: '', quantity: 1},
            {number: 6, name: '1d6', image: '', quantity: 1},
            {number: 8, name: '1d8', image: '', quantity: 1},
            {number: 10, name: '1d10', image: '', quantity: 1},
        ]
    },
    {
        index: 2,
        row: [
            {number: 12, name: '1d12', image: '', quantity: 1},
            {number: 100, name: '1d100', image: '', quantity: 1},
            {number: 20, name: '1d20', image: '', quantity: 1},
            {number: 1000, name: 'custom', image: '', quantity: 1}
        ]
    }

];

class Dice extends Component {
    state = {
        transition: 'scale-out',
        isRollTypeAuto: true,
        mod: 0,
        quantity: 1,
        roll: 0,
        multiRoll: [],
        dieMax: 0,
        isImbrogliando: false,
        ImbrogliandoType: 'none'
    };

    handleImbrogliare(type) {
        this.setState({
            isImbrogliando: !this.state.isImbrogliando,
            ImbrogliandoType: type
        });
        // setTimeout(
        //     setTimeout(() => {
        //         this.setState({
        //             isImbrogliando:false,
        //             ImbrogliandoType:'none'
        //         });
        //     }, 4000)
        // );
        console.log('cheat trigger', this.state.isImbrogliando)
    }

    handleModSet = (e) => {
        this.setState({mod: e})
    };

    handlePressDice = (v) => {
        this.setState({
            dieMax: v
        })
    };

    handleHoldStartDice = () => {
        this.setState({
            transition: 'scale-in',
        });
        console.log('dice start',)
    };

    handleHold = () => {
        console.log('hold')
    };

    handleHoldEnd = (die) => {
        console.log('hold end');
        this.setState({transition: 'scale-out'})

        // this.setState({roll:e})
    };

    handleRelease = (die) => {
        this.setState({transition: 'scale-out'});
        // this.setState({roll:e})
        console.log('cancel release', die);
        const rolls = this.rollDice();
        this.setState({
            roll: rolls.sumRoll,
            multiRoll: rolls.rollCollection
        })
    };

    static findMaxAndLow(isImbrogliando, type, roof) {
        let range = {floor: 1, roof: roof};
        console.log('is cheating?', isImbrogliando, 'type', type, 'roof', roof);
        if (isImbrogliando) {
            console.log('inside@@@#', isImbrogliando, 'type', type, 'roof', roof);
            switch (type) {
                case 'Hi':
                    range.floor = range.roof * 0.75;
                    console.log('hi roll', range.floor, range.roof);
                    return Math.floor(Math.random() * (range.roof - range.floor) + range.floor);
                case 'Mid':
                    console.log('mid roll', range.floor, range.roof);
                    range.floor = range.roof * 0.75;
                    range.roof = range.roof * 0.25;
                    return Math.floor(Math.random() * (range.roof - range.floor) + range.floor);
                case 'Low':
                    console.log('low roll', range.floor, range.roof);
                    range.roof = range.roof * 0.30;
                    return Math.floor(Math.random() * (range.roof - range.floor) + range.floor);
                default:
                    return Math.floor(Math.random() * (range.roof - range.floor) + range.floor);
            }
        }
        return Math.floor(Math.random() * (range.roof - range.floor) + range.floor);
    }

    rollDice = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let rolls = {};
        rolls.rollCollection = [];
        rolls.currentRoll = 0;
        rolls.sumRoll = 0;
        for (let i = 0; i < this.state.quantity; i++) {
            rolls.rollCollection.push(Dice.findMaxAndLow(this.state.isImbrogliando, this.state.ImbrogliandoType, this.state.dieMax) + this.state.mod);
        }
        rolls.currentRoll = rolls.rollCollection[rolls.rollCollection.length - 1];
        rolls.sumRoll = rolls.rollCollection.reduce(reducer);
        return rolls;
    };
    toggleCheatClass = () => {
        return this.state.isImbrogliando ? ` red-text text-darken-4` : ` red-text text-lighten-1`;
    };
    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    };
    changeToggle = (e) => {
        this.setState({isRollTypeAuto: !this.state.isRollTypeAuto})
    };

    operator(val, last) {
        if (val + 1 === last) {
            return (
                <span className={'center-align font14 red-text text-darken-4 padding8'}> = </span>
            );
        } else {
            return (
                <span className={'center-align font14 red-text text-darken-4 padding8'}> + </span>
            );
        }
    }

    rollType(type) {
        switch (type) {
            case 'auto':
                if (this.state.isRollTypeAuto) {
                    return 'scale-in'
                } else {
                    return 'scale-out'
                }
            case 'manual':
                if (!this.state.isRollTypeAuto) {
                    return 'scale-in'
                } else {
                    return 'scale-out'
                }
        }
    }

    render() {
        const {characters, auth} = this.props;
        // if(!auth.uid){
        //     return <Redirect to='/signin' />
        // }
        return (
            <div className='dashboard al-container' style={{margin: 0 + 'px', padding: 0 + 'px', width: '100%'}}>
                <div className='row' style={{padding: 16 + 'px'}}>
                    <div className={'col s6 scale-transition '}>
                        <a className="waves-effect red darken-2 btn" style={{margin: 0 + 'px'}}>show</a>
                    </div>
                    <div className='col s6 center-align'>
                        <label className='red-text text-lighten-1 font14'>Roll Type</label>
                        <div className="switch">
                            <label>Auto<input type="checkbox" id='isRollTypeAuto' onChange={this.changeToggle}/><span
                                className="lever"></span>Input</label>
                        </div>
                    </div>
                </div>
                <div className='row flex-center-row' style={{margin: 0 + 'px'}}>
                    <div className='center-align valign-wrapper flex-tag'>
                        <span className={'center-align font14' + this.toggleCheatClass()}>Modifier</span>
                        <span className='grey-text text-lighten-3 center-align font14'>
                            <span className='padding8'> + </span>
                            {this.state.mod}
                        </span>
                    </div>
                    <div className='center-align valign-wrapper flex-tag'>
                        <span className={'center-align font14' + this.toggleCheatClass()}>Quantity </span>
                        <span className='grey-text text-lighten-3 center-align font14'>
                            <span className='padding8'> x </span>
                            <input style={{width: 44, display: 'inline', textAlign: 'center'}}
                                   className="grey-text text-lighten-3" value={this.state.quantity} type="number"
                                   id="quantity" min="1" max="20" onChange={this.handleChange}>
                        </input>
                        </span>
                    </div>
                </div>
                {this.state.quantity > 1 &&
                <div className='row flex-center-row' style={{margin: 0 + 'px'}}>
                    {this.state.multiRoll.map((roll, ind) => {
                        return (
                            <div key={ind} className='center-align valign-wrapper flex-tag'>
                                <span className='grey-text text-lighten-3 center-align font14'>
                                    {roll}
                                </span>
                                {
                                    this.operator(ind, this.state.multiRoll.length)
                                }
                            </div>
                        )
                    })
                    }
                </div>
                }
                <div className={'row center-align scale-transition ' + this.rollType('auto')}>
                    <div className='center-align'>
                        <h1 className='font10r' style={{margin: 0 + 'px'}}>{this.state.roll}</h1>
                    </div>
                </div>
                <div className={'row center-align auto-input scale-transition ' + this.rollType('manual')}>
                    <div className='center-align'>
                        <input style={{width: '20%', display: 'inline', textAlign: 'center'}}
                               className="grey-text text-lighten-3 large-input" value={this.state.roll} type="number"
                               id="roll" min="1" max="100" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className='row center-align' style={{padding: 0 + 'px', margin: 0 + 'px'}}>
                    <div className='col s4 height44' onClick={() => this.handleImbrogliare('Low')}>

                    </div>
                    <div className='col s4 height44' onClick={() => this.handleImbrogliare('Mid')}>

                    </div>
                    <div className='col s4 height44' onClick={() => this.handleImbrogliare('Hi')}>

                    </div>
                </div>
                <div className='row center-align' style={{padding: 0 + 'px'}}>
                    <div className='col s12 grey darken-3'>
                        {
                            diceSelection.map((ob, index) => {
                                return (
                                    <div className='row' key={ob.index}>
                                        {
                                            ob.row.map((dice, index) => {
                                                return (
                                                    <div className='col s3 height44 flex flex-align-items displayGrid'
                                                         key={dice.number} style={{margin: 0 + 'px'}}>
                                                        <DieButton
                                                            value={dice.number}
                                                            className="waves-effect waves-red btn-flat grey-text text-lighten-2"
                                                            repeatDelay={300}
                                                            repeatInterval={32}
                                                            onPressDice={this.handlePressDice}
                                                            onHoldStart={this.handleHoldStartDice}
                                                            onHold={this.handleHold}
                                                            onHoldEnd={this.handleHoldEnd}
                                                            onRelease={this.handleRelease}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={'al-container mod-deck z-depth-3 scale-transition ' + this.state.transition}>
                        {
                            modConstants.map((ob, index) => {
                                return (
                                    <div className='row center-align' style={{margin: 0 + 'px'}} key={ob.index}>
                                        {
                                            ob.numbers.map(number => {
                                                return (
                                                    <div onPointerOver={() => this.handleModSet(number)}
                                                         className='col s2 height44 flex flex-align-items displayGrid'
                                                         key={number} style={{margin: 0 + 'px'}}>
                                                        {number}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        characters: state.firestore.ordered.characters,
        auth: state.firebase.auth
    }
};
export default compose(
    firestoreConnect(['characters']),
    connect(mapStateToProps)
)(Dice);
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
            {number: 4, name: '1d4', image: '1d4.png', quantity: 1},
            {number: 6, name: '1d6', image: '1d6.png', quantity: 1},
            {number: 8, name: '1d8', image: '1d8.png', quantity: 1},
            {number: 10, name: '1d10', image: '1d10.png', quantity: 1},
        ]
    },
    {
        index: 2,
        row: [
            {number: 12, name: '1d12', image: '1d12.png', quantity: 1},
            {number: 100, name: '1d100', image: '1d100.png', quantity: 1},
            {number: 20, name: '1d20', image: '1d20.png', quantity: 1},
            {number: 1000, name: 'custom', image: 'd.png', quantity: 1}
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
        isNat: false,
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
        this.setState({mod: e});
        this.handleHoldEnd()
    };

    handlePressDice = (v) => {
        this.setState({
            dieMax: v
        });
        this.handleRelease(v)
    };

    handleHoldStartDice = () => {
        this.setState({
            transition: 'scale-in',
        });
        console.log('dice start',)
    };

    handleHoldEnd = (die) => {
        console.log('hold end');
        this.setState({transition: 'scale-out'})

        // this.setState({roll:e})
    };

    // shareRoll = () => {
    //     this.props.shareRoll(this.state.roll);
    // };
    shareInit = () => {
        this.props.shareInit(this.state.roll);
    };

    handleRelease = (die) => {
        this.setState({transition: 'scale-out'});
        // this.setState({roll:e})
        console.log('cancel release', die);
        const rolls = this.rollDice(die);
        this.setState({
            isNat: rolls.isNat,
            roll: rolls.sumRoll,
            multiRoll: rolls.rollCollection,
            isImbrogliando: false,
            ImbrogliandoType: 'none'
        });
        if (this.props.shareRoll) {
            this.props.shareRoll(rolls.sumRoll);
        }
    };

    static findMaxAndLow(isImbrogliando, type, roof) {
        let range = {floor: 0, roof: roof};
        if (isImbrogliando) {
            console.log('inside@@@#', isImbrogliando, 'type', type, 'roof', roof);
            switch (type) {
                case 'Hi':
                    range.floor = range.roof * 0.75;
                    console.log('hi roll');
                    return Math.ceil(Math.random() * (range.roof - range.floor) + range.floor);
                case 'Mid':
                    console.log('mid roll');
                    range.floor = range.roof * 0.75;
                    range.roof = range.roof * 0.25;
                    return Math.ceil(Math.random() * (range.roof - range.floor) + range.floor);
                case 'Low':
                    console.log('low roll');
                    range.roof = range.roof * 0.30;
                    return Math.ceil(Math.random() * (range.roof - range.floor) + range.floor);
                default:
                    return Math.ceil(Math.random() * (range.roof - range.floor) + range.floor);
            }
        }
        return Math.ceil(Math.random() * (range.roof - range.floor) + range.floor);
    }

    rollDice = (dieMax) => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let rolls = {};
        rolls.rollCollection = [];
        rolls.sumArray = [];
        rolls.currentRoll = 0;
        rolls.sumRoll = 0;
        rolls.isNat = false;
        for (let i = 0; i < this.state.quantity; i++) {
            let rollResult = Dice.findMaxAndLow(this.state.isImbrogliando, this.state.ImbrogliandoType, dieMax) + this.state.mod;
            if ((rollResult - this.state.mod) === dieMax) {
                rolls.rollCollection.push({isNat: true, roll: rollResult});
            } else {
                rolls.rollCollection.push({isNat: false, roll: rollResult});
            }
            rolls.sumArray.push(rollResult)
        }
        rolls.currentRoll = rolls.rollCollection[rolls.rollCollection.length - 1];
        console.log('sum array', rolls);
        rolls.sumRoll = rolls.sumArray.reduce(reducer);
        if (rolls.rollCollection.length === 1) {
            if ((rolls.sumRoll - this.state.mod) === dieMax) {
                rolls.isNat = true;
            }
        }
        return rolls;
    };
    toggleImbrogliareClass = () => {
        return this.state.isImbrogliando ? ` grey-text text-lighten-1` : ` grey-text text-lighten-2`;
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

    isNat = (roll) => {
        console.log('pulse? ', roll, this.state.isNat);
        console.log('pulse? ', roll);
        return roll ? 'red pulse' : '';
    };

    render() {
        const {characters, auth} = this.props;
        // if(!auth.uid){
        //     return <Redirect to='/signin' />
        // }
        return (
            <div className={`dashboard al-container ${this.props.className}`}
                 style={{margin: 0 + 'px', padding: 0 + 'px', width: '100%'}}>
                <div className='row' style={{padding: 16 + 'px'}}>
                    {/*{this.props.shareRoll &&*/}
                    {/*<div className={'col s6 scale-transition '}>*/}
                    {/*    <a className="waves-effect red darken-2 btn" onClick={this.shareRoll}*/}
                    {/*    >Share Roll</a>*/}
                    {/*</div>*/}
                    {/*}*/}
                    {this.props.shareInit &&
                    <div className={'col s6 scale-transition '}>
                        <a className="waves-effect red darken-2 btn" onClick={this.shareInit}
                        >Share Initiative</a>
                    </div>
                    }
                    <div className='col s6 center-align'>
                        <label className='red-text text-lighten-1 font14'>Roll Type</label>
                        <div className="switch">
                            <label>Auto<input type="checkbox" id='isRollTypeAuto' onChange={this.changeToggle}/><span
                                className="lever"></span>Input</label>
                        </div>
                    </div>
                </div>
                <div className='row flex-center-row' style={{margin: 0 + 'px'}}>
                    <div onClick={this.handleHoldStartDice} className='center-align valign-wrapper flex-tag'>
                        <span className={'center-align font14 red-text text-darken-2'}>Modifier</span>
                        <span className='grey-text text-lighten-3 center-align font14'>
                            <span className={`padding8 ${this.toggleImbrogliareClass()}`}> + </span>
                            {this.state.mod}
                        </span>
                    </div>
                    <div className='center-align valign-wrapper flex-tag'>
                        <span className={'center-align font14 red-text text-darken-2'}>Quantity </span>
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
                    {this.state.multiRoll.map((rollResult, ind) => {
                        return (
                            <div key={ind} className='center-align valign-wrapper flex-tag'>
                                <div className={`pulse-wrapper ${this.isNat(rollResult.isNat)}`}>
                                    <span className='grey-text text-lighten-3 center-align font14'>
                                        {rollResult.roll}
                                    </span>
                                </div>
                                {
                                    this.operator(ind, this.state.multiRoll.length)
                                }
                            </div>
                        )
                    })
                    }
                </div>
                }
                <div>
                    <div className={'row center-align scale-transition ' + this.rollType('auto')}>
                        <div className='center-align'>
                            <div className={`roll ${this.isNat(this.state.isNat)}`}>
                                <span style={{margin: 0 + 'px'}}>{this.state.roll}</span>
                            </div>
                        </div>
                    </div>
                    <div className={'row center-align auto-input scale-transition ' + this.rollType('manual')}>
                        <div className='center-align'>
                            <input style={{width: '20%', display: 'inline', textAlign: 'center'}}
                                   className="grey-text text-lighten-3 large-input" value={this.state.roll}
                                   type="number"
                                   id="roll" min="1" max="100" onChange={this.handleChange}/>
                        </div>
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
                    <div className='col s12 grey darken-3 padding8'>
                        {
                            diceSelection.map((ob, index) => {
                                return (
                                    <div className='row' key={ob.index}>
                                        {
                                            ob.row.map((dice, index) => {
                                                return (
                                                    <div
                                                        className='col s3 height44 flex flex-align-items displayGrid flex-justify-content'
                                                        key={dice.number} style={{margin: 0 + 'px'}}>
                                                        <DieButton
                                                            value={dice}
                                                            className="waves-effect waves-red btn-flat grey-text text-lighten-2 height44 dice-button"
                                                            onPressDice={this.handlePressDice}
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
                                                    <div onClick={() => this.handleModSet(number)}
                                                         className='col s2 height44 flex flex-align-items displayGrid'
                                                         key={number} style={{margin: 0 + 'px'}}>
                                                        <a className="waves-effect waves-light red darken-1 btn">{number}</a>
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
    connect(mapStateToProps)
)(Dice);
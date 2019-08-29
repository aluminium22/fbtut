import React, {Component} from 'react';
import {Link} from "react-router-dom";

const border = {
    border: "1px solid #00000059"
};

class EncounterCharacter extends Component {
    constructor(props) {
        super(props);
        this.detachMaster = this.detachMaster.bind(this);
        this.removeEncounter = this.removeEncounter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitCharUpdate = this.submitCharUpdate.bind(this);
        this.roll = this.roll.bind(this);


        this.state = {
            hp: 0,
            damage: 0,
        }
    }

    renderStyle() {
        console.log('render styles', this.props);
        if (this.props.encounter) {
            return this.props.encounter.id === this.props.character.id ? 'scale-in turn-border' : '';
        } else {
            return ''
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.character !== prevProps.character) {
            this.setState({
                ...this.props.character
            })
        }
    }

    componentDidMount() {
        this.setState({
            ...this.props.character
        })
    }

    handleChange(e) {
        console.log('kljlkj', e.target.value.slice(0, this.props.character.maxHp));
        this.setState({[e.target.id]: e.target.value.slice(0, this.props.character.maxHp)})
    }

    submitCharUpdate() {
        this.props.updateChar(this.state);
    }

    detachMaster() {
        this.props.detachMaster(this.props.character)
    }

    removeEncounter() {
        this.props.removeEncounter(this.props.character, this.props.character.encounterId)
    }

    calculateHealth() {

        let percent = ((parseInt(this.state.hp) / parseInt(this.props.character.maxHp)) * 100).toString();

        return {width: percent + '%'}
    }

    roll() {
        this.props.roll(this.props.character)
    }

    render() {
        return (
            <div className={`scale-transition ${this.renderStyle()}`}>
                <div className={`flex flex-space-between flex-align-items scale-transition`}>
                    <li className="collection-item z-depth-2 margin8-right grey darken-3 display-inline-block flex flex-space-between flex-align-items width90"
                        style={border}>
                        <div className={`flex flex-space-between flex-align-items`}>
                            <a className='flex flex-align-items'>
                                {
                                    this.props.character.imageLink &&
                                <img src={this.props.character.imageLink} alt="" className="circle-image"/>
                                }
                                {!this.props.character.imageLink &&
                                <img src={require(`../characters/images/Tuun-avatar-flat.jpg`)} alt=""
                                     className="circle-image"/>
                                }
                                <div className="flex-col padding-left16 flex-justify-left width100">
                                    <div>
                                          <span className="title">
                                              {this.props.character.name}
                                          </span>
                                        {this.props.character.class &&
                                        <span className="text-grey text-lighten-2">
                                              Class: {this.props.character.class}
                                          </span>
                                        }
                                    </div>
                                    {!(this.props.character.masterId === this.props.character.userId) &&
                                    <div className="flex-center-row flex-space-between">
                                            <span className={'hp'}>
                                             HP: {<input type="number" className={'encounter-input'} id='hp' min={0}
                                                         max={this.props.character.maxHp.toString()}
                                                         onChange={this.handleChange} value={this.state.hp}/>}
                                            </span>
                                        <span className={`health-outer`}><span className={`health-inner`}
                                                                               style={this.calculateHealth()}></span></span>
                                    </div>
                                    }
                                    {(this.props.character.masterId === this.props.character.userId) &&
                                    <div className="flex-center-row flex-space-between">
                                            <span className={'hp'}>
                                             DMG: {this.props.auth.uid !== this.props.character.masterId &&
                                            <span>{this.state.damage}</span>
                                            }
                                                {this.props.auth.uid === this.props.character.masterId &&
                                                <input type="number" className={'encounter-input'} id='damage' min={0}
                                                       max={this.props.character.maxHp.toString()}
                                                       onChange={this.handleChange} value={this.state.damage}/>
                                                }
                                            </span>
                                    </div>
                                    }
                                </div>
                            </a>
                            <div className='flex-col'>
                                {(this.props.character.hp !== this.state.hp) || (this.state.damage !== this.props.character.damage && this.props.auth.uid === this.props.character.masterId) &&
                                <a className="waves-effect grey darken-4 waves-light btn-small"
                                   onClick={this.submitCharUpdate}>Update</a>}
                                <span
                                    className='display-inline-block text-bold'>Init:<span>{this.props.character.initiative}</span></span>
                            </div>
                        </div>
                    </li>
                    <div className={`width10`}>
                        {this.props.character.currentRoll && <div onClick={this.roll}
                                                                  className={'waves-effect waves-dark z-depth-3 char-roll'}>{this.props.character.currentRoll}</div>}
                        {!this.props.character.currentRoll &&
                        <div onClick={this.roll} className={'waves-effect waves-dark z-depth-3 char-roll'}>Roll</div>}
                    </div>
                </div>
            </div>
        )
    }
}


export default EncounterCharacter;
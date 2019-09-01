import React, {Component} from 'react';

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
        this.showConditionToggle = this.showConditionToggle.bind(this);
        this.handleConditionToggle = this.handleConditionToggle.bind(this);
        this.roll = this.roll.bind(this);


        this.state = {
            hp: 0,
            damage: 0,
            showCondition: false,
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

    showConditionToggle() {
        if ((this.props.character.userId === this.props.uid) || (this.props.character.masterId === this.props.uid)) {
            this.setState({
                showCondition: !this.state.showCondition
            })
        }
    }

    handleConditionToggle(value) {
        this.props.condition(this.props.character, value);
        this.showConditionToggle();
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
        if (this.props.character.userId === this.props.uid) {
            this.props.roll(this.props.character)
        }
    }

    render() {
        return (
            <div className={`scale-transition ${this.renderStyle()}`}>
                <div className={`flex flex-space-between flex-align-items scale-transition`}>
                    <li className="collection-item z-depth-2 margin8 grey darken-3 display-inline-block flex flex-space-between flex-align-items character-encounter"
                        style={border}>
                        <div className={`flex flex-space-between flex-align-items`}>
                            <div className='flex flex-align-items'>
                                <a onClick={this.showConditionToggle}>
                                {
                                    this.props.character.imageLink &&
                                <img src={this.props.character.imageLink} alt="" className="circle-image"/>
                                }
                                {!this.props.character.imageLink &&
                                <img src={require(`../characters/images/Tuun-avatar-flat.jpg`)} alt=""
                                     className="circle-image"/>
                                }
                                </a>
                                <div className="flex-col padding-left16 flex-justify-left width100">
                                    <div className="display-inline-block">
                                          <span className="title">
                                              {this.props.character.name}
                                          </span>
                                        {this.props.character.class &&
                                        <span className="text-grey text-lighten-2">
                                              Init: {this.props.character.initiative}
                                          </span>
                                        }
                                    </div>
                                    {this.state.conditions &&
                                    <div className="display-inline-block">
                                        {this.state.conditions.isBlind &&
                                        <img src={require(`../characters/images/conditions/blind.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isCharmed &&
                                        <img src={require(`../characters/images/conditions/charmed.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isDeaf &&
                                        <img src={require(`../characters/images/conditions/deaf.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isFrightened &&
                                        <img src={require(`../characters/images/conditions/frightened.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isGrappled &&
                                        <img src={require(`../characters/images/conditions/grappled.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isIncapacitated &&
                                        <img src={require(`../characters/images/conditions/incapacitated.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isInvisible &&
                                        <img src={require(`../characters/images/conditions/invisible.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isParalyzed &&
                                        <img src={require(`../characters/images/conditions/paralyzed.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isPetrified &&
                                        <img src={require(`../characters/images/conditions/pertrified.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isPoisoned &&
                                        <img src={require(`../characters/images/conditions/poisoned.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isProne &&
                                        <img src={require(`../characters/images/conditions/prone.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isRestrained &&
                                        <img src={require(`../characters/images/conditions/restrained.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isStunned &&
                                        <img src={require(`../characters/images/conditions/stunned.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                        {this.state.conditions.isUnconscious &&
                                        <img src={require(`../characters/images/conditions/unconscious.png`)} alt=""
                                             className="condition-image"/>
                                        }
                                    </div>
                                    }
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
                            </div>
                            <div className='flex-col'>
                                {(this.props.character.hp !== this.state.hp) &&
                                <a className="waves-effect grey darken-4 waves-light btn-small"
                                   onClick={this.submitCharUpdate}>SET</a>
                                }
                                {(this.state.damage !== this.props.character.damage && (this.props.character.masterId === this.props.character.userId)) &&
                                <a className="waves-effect grey darken-4 waves-light btn-small"
                                   onClick={this.submitCharUpdate}>SET</a>
                                }
                                <div className="display-inline-block">
                                    {this.props.character.currentRoll &&
                                    <div onClick={this.roll} className={'waves-effect waves-dark z-depth-3 char-roll'}>
                                        {this.props.character.currentRoll}
                                    </div>
                                    }
                                    {!this.props.character.currentRoll &&
                                    <div onClick={this.roll} className={'waves-effect waves-dark z-depth-3 char-roll'}>
                                        Roll</div>
                                    }
                                </div>
                            </div>
                        </div>
                        {this.state.showCondition &&
                        <div className="display-inline-block">
                            <a onClick={() => this.handleConditionToggle('isBlind')}
                               className="padding8 waves-effect condition-button" id="blind">
                                <img src={require(`../characters/images/conditions/blind.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isCharmed')}
                               className="padding8 waves-effect condition-button" id="charmed">
                                <img src={require(`../characters/images/conditions/charmed.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isDeaf')}
                               className="padding8 waves-effect condition-button" id="deaf">
                                <img src={require(`../characters/images/conditions/deaf.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isFrightened')}
                               className="padding8 waves-effect condition-button" id="frightened">
                                <img src={require(`../characters/images/conditions/frightened.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isGrappled')}
                               className="padding8 waves-effect condition-button" id="grappled">
                                <img src={require(`../characters/images/conditions/grappled.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isIncapacitated')}
                               className="padding8 waves-effect condition-button" id="incapacitated">
                                <img src={require(`../characters/images/conditions/incapacitated.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isInvisible')}
                               className="padding8 waves-effect condition-button" id="invisible">
                                <img src={require(`../characters/images/conditions/invisible.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isParalyzed')}
                               className="padding8 waves-effect condition-button" id="paralyzed">
                                <img src={require(`../characters/images/conditions/paralyzed.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isPetrified')}
                               className="padding8 waves-effect condition-button" id="petrified">
                                <img src={require(`../characters/images/conditions/pertrified.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isPoisoned')}
                               className="padding8 waves-effect condition-button" id="poisoned">
                                <img src={require(`../characters/images/conditions/poisoned.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isProne')}
                               className="padding8 waves-effect condition-button" id="prone">
                                <img src={require(`../characters/images/conditions/prone.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isRestrained')}
                               className="padding8 waves-effect condition-button" id="restrained">
                                <img src={require(`../characters/images/conditions/restrained.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isStunned')}
                               className="padding8 waves-effect condition-button" id="stunned">
                                <img src={require(`../characters/images/conditions/stunned.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                            <a onClick={() => this.handleConditionToggle('isUnconscious')}
                               className="padding8 waves-effect condition-button" id="unconscious">
                                <img src={require(`../characters/images/conditions/unconscious.png`)} alt=""
                                     className="condition-image"/>
                            </a>
                        </div>
                        }
                    </li>
                </div>
            </div>
        )
    }
}


export default EncounterCharacter;
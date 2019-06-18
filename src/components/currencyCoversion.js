import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import {lastestCurrencyActions} from '../actions';
import Button from '@material-ui/core/Button';

//here you can put styling just for this component
const styles = () => ({
    container: {
        width : '320px',
        height : '600px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        margin: 'auto',
        marginTop: '4vh',
        borderRadius:'5px'
    },
    header: {
        width:'100%',
        height: '72px',
        borderBottom: '1px solid #4CAF50',
        backgroundColor: '#4CAF50',
        color:'white'
    },
    content: {
        width:'100%',
        height: '478px',
        overflowY: 'auto'
    },
    content_list: {
        border: '1px solid #4CAF50',
        margin:'8px'
    },
    footer: {
        width:'100%',
        height: '50px',
        borderTop: '1px solid #4CAF50',
        backgroundColor: '#4CAF50',
        color:'white'
    },
    button: {
        margin: '0',
        padding: '20px 1px',
        minWidth: '40px'
    },
});

//variable for month name
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyData: [],
            selectedCurrencyList: [],
            currencyOption:[],
            addSelectedCurrency:'',
            baseCurrency: {value:'USD', label:'United States Dollar'},
            baseValue: 10,
            add: false,
            addMessage: 'Add More Currency',
        }
    }

    //every time this component is loaded this function will run handleLoadData
    componentWillMount() {
        this.handleLoadData();
    };

    componentWillReceiveProps = (nextprops) => {
        const {lastestCurrency,allCurrencyList,selectedCurrencyList} = nextprops;
        let myArray = allCurrencyList.filter( ( el ) => !selectedCurrencyList.some( (item) => item.value === el.value ) );
        if (lastestCurrency.length !== 0){
            this.setState({
                currencyData : lastestCurrency,
                selectedCurrencyList : selectedCurrencyList,
            })
            if(myArray.length > 0 && allCurrencyList.length !== selectedCurrencyList.length){
                this.setState({
                    currencyOption: myArray,
                    addSelectedCurrency: myArray[0].value,
                    addMessage: 'Add More Currency',
                })
            } else {
                this.setState({
                    currencyOption: [],
                    addSelectedCurrency: '',
                    addMessage: 'No More Currency',
                })
            }
        }
    }

    // convert date format
    convertDateName = (str) => {
        const date = new Date(str),
            mnth = date.getMonth(),
            day = ("0" + date.getDate()).slice(-2);
        return day + ' ' + monthNames[mnth] + ' ' + date.getFullYear();
    };

    // load data by request from API that trigger action getLastestCurrency in file lastestCurrencyActions
    handleLoadData = async () => {
        const {dispatch} = this.props;
        const statusCurrency = await dispatch(lastestCurrencyActions.getLastestCurrency());
        if (statusCurrency === 200) {
            this.setState({
                
            });
        }
    };

    //control to open from for add currency, if there is no option anymore, the button will not work anymore
    addControl = () => {
        const {currencyOption} = this.state;
        if(currencyOption.length > 0){
            this.setState({
                add: true
            })
        } else {
            this.setState({
                addMessage: 'No More Currency',
            })
        }
    }

    //handling change state select currency in form add currency
    onChangeSelectCurrency = (e) => {
        this.setState({
            addSelectedCurrency : e.target.value
        })
    }

    //submit function in form add currency and trigger action to add selected currency
    addSubmit = () => {
        const {dispatch} = this.props;
        const {addSelectedCurrency,currencyOption} = this.state;
        dispatch(lastestCurrencyActions.addCurrency(currencyOption.filter(function(e) { return e.value === addSelectedCurrency })[0]));
        this.setState({
            add: false
        })
    }

    //function handling delete currency from the list and trigger action to delete selected currency
    onDelete = (value) => {
        const {dispatch} = this.props;
        dispatch(lastestCurrencyActions.deleteCurrency(value))
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <div style={{fontSize:'0.7rem', margin:'12px', paddingTop:'12px'}}>
                            <div style={{display:'inline', fontWeight:'bold'}}>
                                {this.state.baseCurrency.value} - {this.state.baseCurrency.label}
                            </div>
                            <div style={{display:'inline', float:'right'}}>
                                {this.convertDateName(this.state.currencyData.date)}
                            </div>
                        </div>
                        <div style={{fontSize:'1.4rem', fontWeight:'bold', margin:'12px'}}>
                            <div style={{display:'inline'}}>
                                {this.state.baseCurrency.value}
                            </div>
                            <div style={{display:'inline', float:'right'}}>
                                {this.state.baseValue.toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className={classes.content}>
                        {this.state.selectedCurrencyList.map( cur =>{
                            return (
                                <div key={cur.value} className={classes.content_list}>
                                    <table style={{width:'100%',borderCollapse: 'collapse'}}>
                                        <tbody>
                                            <tr>
                                                <td style={{padding:'6px'}}>
                                                    <div style={{fontSize:'1.1rem'}}>
                                                        <div style={{display:'inline'}}>
                                                            {cur.value}
                                                        </div>
                                                        <div style={{display:'inline', float:'right'}}>
                                                            {(this.state.currencyData.length !== 0)?(this.state.currencyData.rates[cur.value]*this.state.baseValue).toLocaleString():0}
                                                        </div>
                                                    </div>
                                                    <div style={{fontWeight:'bold',fontSize:'0.7rem'}}>
                                                        {cur.value} - {cur.label}
                                                    </div>
                                                    <div style={{fontSize:'0.7rem'}}>
                                                        1 {this.state.baseCurrency.value} = {cur.value} {(this.state.currencyData.length !== 0)?(this.state.currencyData.rates[cur.value]).toLocaleString():0}
                                                    </div>
                                                </td>
                                                <td style={{width:'40px'}}>
                                                    <Button onClick={()=>{this.onDelete(cur)}} variant="contained" color="secondary" className={classes.button}>
                                                        X
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.footer}>
                        {(this.state.add)?
                        <div style={{margin:'7px'}}>
                            <select onChange={this.onChangeSelectCurrency} value={this.state.addSelectedCurrency} style={{height:'36px', width:'230px'}}>
                                {this.state.currencyOption.map(cur=>{
                                    return (
                                        <option key={cur.value}>{cur.value}</option>
                                    )
                                })}
                            </select>
                            <Button onClick={this.addSubmit} style={{height:'36px', width:'76px', cursor:'pointer', backgroundColor:'green', color:'white'}}>Submit</Button>
                        </div>
                        :
                        <div onClick={this.addControl} style={{margin:'7px', backgroundColor:'green', lineHeight:'36px', textAlign:'center', cursor:'pointer'}}>{this.state.addMessage}</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    const {lastestCurrency,selectedCurrencyList,allCurrencyList} = state.lastestCurrency;
    return {
        lastestCurrency,
        selectedCurrencyList,
        allCurrencyList
    };
};

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(Index));

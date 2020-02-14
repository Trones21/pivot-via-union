import React from "react";
import PropTypes from "prop-types";
import TextInput from './TextInput';
import '../css/box.css';
import '../css/TableForm.css';
import expandArrow from '../images/downArrowOpen32.png';
import collapseArrow from '../images/downArrowOpen32.png';
// const FormStyle = {
//     color: "white",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center"
// }


export class TableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TableName: props.TableName || '', //use this to optionally setState via props
            SelectMeAsTable: '',
            keyColumn: '',
            columnList: [],
            dirtyColumnList: '',
            charFront: props.charFront,
            charBack: props.charBack,
            sql: props.sql || '',
            isCollapsed: props.isCollapsed
        };

        this.sendSQL = () => { props.getSQL(props.id, this.state.sql) };
        this.remove = () => { props.removeMe(props.id) };
        this.id = props.id;
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    toggleForm = () => {
        this.state.isCollapsed === true ?
            this.setState({ isCollapsed: false }) :
            this.setState({ isCollapsed: true });
    }

    //need to check why one letter remains when I delete most of the line
    async handleColumnsChange(event) {
        this.setState({ dirtyColumnList: event.target.value },
            () => {
                this.cleanColumnList();
                //this.updateSQL called after this
            })
            ;

    }

    handleFieldChange(newValue, parentStateId) {
        switch (parentStateId) {
            case "TableName":
                this.setState({ TableName: newValue }, this.updateSQL);
                break;
            case "SelectMeAsTable":
                this.setState({ SelectMeAsTable: newValue }, this.updateSQL);
                break;
            case "keyColumn":
                this.setState({ keyColumn: newValue }, this.updateSQL);
                break;
            default:
                console.log("Invalid parentStateId passed " + parentStateId);
        }

    }



    cleanColumnList() {
        console.log(this.state.dirtyColumnList);
        var chk = this.state.dirtyColumnList.split('\n');
        console.log(chk);
        var tempArray = this.state.dirtyColumnList.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        this.setState({ columnList: tempArray }, this.updateSQL);
    }

    singleSQLstatement(column) {

        return `select
'${this.state.SelectMeAsTable}' as "Table",
'${this.keyColumn}' as "KeyColumn", 
'${column}' as "Column",
"${column}" as "Value"
from ${this.state.TableName}
union all
`
    }

    updateSQL() {
        let newSQL = '';
        for (let column of this.state.columnList) {
            let addthis = this.singleSQLstatement(column)
            newSQL = newSQL + addthis;
        }
        if (this.state.columnList.length === 0) {
            let addthis = this.singleSQLstatement('')
            newSQL = newSQL + addthis;
        }
        //upate child - callback update parent
        //this.setState({ sql: newSQL });
        this.setState({ sql: newSQL }, this.sendSQL);
    }


    render() {

        if (this.state.isCollapsed === true) {
            return (
                <div className="collapsedForm">
                    <div className="formHeader">
                        <div>{this.state.TableName}</div>
                        <img 
                            src={collapseArrow} alt="expand"
                            onClick={this.toggleForm}
                        ></img>
                    </div>
                </div>
            )
        }
        else
            return (
                <>
                    <div className="shownForm">
                        <div className="formHeader">
                            <div>{this.state.TableName}</div>
                            <img 
                                src={collapseArrow} alt="expand"
                                onClick={this.toggleForm}
                            ></img>
                        </div>
                    </div>
                    <form className="Form">
                        <TextInput
                            setParentState={this.handleFieldChange}
                            parentStateId="SelectMeAsTable"
                            value={this.state.SelectMeAsTable}
                            label="Select  ' '  as Table" />
                        <TextInput
                            setParentState={this.handleFieldChange}
                            parentStateId="TableName"
                            value={this.state.TableName}
                            label="Schema/Table" />
                        <TextInput
                            setParentState={this.handleFieldChange}
                            parentStateId="keyColumn"
                            value={this.state.keyColumn}
                            label="Key Column" />

                        <div className="boxesContainer">
                            <div className="boxLayout boxStyle">
                                <p>Enter a list of columns here:</p>
                                <textarea
                                    className="boxStyle"
                                    value={this.state.dirtyColumnList}
                                    onChange={this.handleColumnsChange}
                                />
                            </div>
                            <div className="boxLayout boxStyle">
                                <p>SQL Preview:</p>
                                <textarea 
                                    readOnly
                                    className="boxStyle"
                                    value={this.state.sql}
                                />
                            </div>
                        </div>
                    </form>

                </>
            );
    }
}

TableForm.propTypes = {
    getSQL: PropTypes.func,
}


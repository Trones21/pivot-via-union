import React from "react";
import TextInput from './TextInput';
import '../css/box.css';
import '../css/TableForm.css'

const FormStyle = {
    color: "white",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
}

export class TableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TableName: props.TableName || '', //use this to optionally setState via props
            SelectMeAsTable: '',
            keyColumn: '',
            columnList: [],
            dirtyColumnList: '',
            sql: '',
            isCollapsed: props.isCollapsed || false
        };
        
        this.toggleForm = () => 
        {
            props.toggleForm(props.id);
        }
        this.remove = () => {props.removeMe(props.id)};
        this.id = props.id; 
        this.handleColumnsChange = this.handleColumnsChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    //need to check why one letter remains when I delete most of the line
    handleColumnsChange(event) {
        this.setState({ dirtyColumnList: event.target.value });
        this.cleanColumnList();
        this.updateSQL();
    }

    handleFieldChange(newValue, parentStateId) {
        switch(parentStateId){
        case "TableName":
        this.setState({ TableName: newValue });
        break;
        case "SelectMeAsTable":
        this.setState({ SelectMeAsTable: newValue });
        break;
        case "keyColumn":
        this.setState({ keyColumn: newValue });
        break;
        default:
            console.log("Invalid parentStateId passed " + parentStateId);
        }
        this.updateSQL();
    }

    cleanColumnList() {
        var tempArray = this.state.dirtyColumnList.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        this.setState({ columnList: tempArray })
    }

    singleSQLstatement(column) {

        return `select
        '${this.state.SelectMeAsTable}' as "Table", 
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
        if(this.state.columnList.length === 0){
            let addthis = this.singleSQLstatement('')
            newSQL = newSQL + addthis;
        }
        this.setState({ sql: newSQL })
    }

   
    render() {

        if(this.state.isCollapsed === true){
        return(
                <div>
                    {this.id}
                    <button onClick={this.toggleForm}>Show/Hide</button>
                </div>
        )}
        else
        return (
            <>
                <div className="collapsedForm">
                    <div style={{position:"absolute", right:"0px", color:"white"}}>id: {this.id}</div>
                    <button onClick={this.toggleForm}>Show/Hide</button>
                    <button onClick={this.remove}>Remove</button>
                </div>
                <form style={FormStyle}>
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

                    <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-evenly" }}>
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
                            <textarea readOnly
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
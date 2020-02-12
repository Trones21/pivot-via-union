import React, {useState} from "react";
import { TableForm } from "./TableForm";


export function TableFormList(){
    const [tables, setTables] = useState([]);
    
    const addTable = () => {
        let newTablekey = {id: tables.length, isCollapsed: false};
        setTables(tables => [...tables, newTablekey])
        console.log("addTable");
    }

    const removeTablet = () => {
    
    const key = 1; 
    const testArr = [{id:1,op:"adsad"}, {id:2,op:"adsad"},{id:3,op:"adsad"} ];
    console.log(key);
    console.log(testArr[key].id);
    const fml = testArr.filter( (el) => (el.id !== key));
    console.log(fml)
    }


//  const removeTable = (id) => {}
    const removeTable = (tableId) => {
        console.log("Number of tables:")
        console.log(tables);
        console.log("Id Passed:")
        console.log(tableId);
        const newArray = tables.filter((el) => (el.id !== tableId)
        );
        console.log(newArray);
        setTables(newArray)
    }

    const toggleForm = () => {};
    // const toggleForm = (id) => {
    //         console.log("pfc")
    //         console.log(tables[id])
    //         if(tables[id].isCollapsed === true){
    //             //setTables()tables[id].isCollapsed = false;
    //         } else {
    //             let newArr = tables. 
    //             tables[id].isCollapsed = true;
    //         }
    //     }
    

    const TableForms = tables.map((t) =>
       <TableForm  
       key={t.id}
       id={t.id}
       isCollapsed={t.isCollapsed}
       toggleForm={toggleForm}
       removeMe={removeTable}/>
    );

    return(
    <>
    <ol>{TableForms}</ol>
    <div>
        <button onClick={""}>Collapse All</button>
        <button onClick={addTable}>Add Table</button>
        <button onClick={removeTablet}>test</button>
        <button onClick={() => {console.log("NumTables via Separate Button:")
        console.log(tables);}}>NumTables</button>
        
    </div>
    </>
    );
}


import React, { useState } from "react";
import { TableForm } from "./TableForm";


export function TableFormList() {

    const [tables, setTables] = useState([]);
    const [SQLCombined, setSQLCombined] = useState({});

    const test = () => {
        let id = 2;
        //console.log(tables.find((i) => (i.id === id),id)); 
        console.log(tables.filter((i) => (i.id !== id), id));
    }

    const SQLtoClipboard = () => {

    }

    const addTable = () => {
        let newTable = { id: tables.length, isCollapsed: false };
        setTables(tables => [...tables, newTable])
    }

    const getchildsSQL = (id, sql) => {
        const table = tables.find((i) => (i.id === id), id);
        table.sql = sql;
        let updatedTables = [...tables.filter((i) => (i.id !== id), id), table];
        setTables(updatedTables);
    }


    const TableForms = tables.map((t) =>
        <TableForm
            key={t.id}
            id={t.id}
            getSQL={getchildsSQL}
            isCollapsed={t.isCollapsed}
        />
    );

    return (
        <>
                <div>
                    <button onClick={""}>Collapse All</button>
                    <button onClick={addTable}>Add Table</button>
                    <button onClick={SQLtoClipboard}>Copy Full SQL to Clipboard</button>
                    <button onClick={test}>Test</button>
                </div>
                <ol>{TableForms}</ol>
        </>
    );
}


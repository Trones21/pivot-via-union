import React, { useState } from "react";
import FileSaver from "file-saver";
import { TableForm } from "./TableForm";
import { copytoClipBoard } from "../utils/utils";


export function TableFormList() {

    const [tables, setTables] = useState([]);
    const [SQLarray, setSQLarray] = useState([]);

    const test = () => {

    }

    const concatSQL = () => {
        let fullSQL = '';
        for (var item in SQLarray) {
            fullSQL += SQLarray[item].sql;
        }
        return fullSQL;
    }

    const saveFile = () => {
        let sql = concatSQL();
        var blob = new Blob([sql], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "unPivotviaUnion.sql")
    }

    const SQLtoClipboard = () => {
        let sql = concatSQL();
        console.log(sql);
        copytoClipBoard(sql)

    }

    const addTable = (isCollapsed) => {
        let newTable = { id: tables.length, isCollapsed: isCollapsed };
        setTables(tables => [...tables, newTable])
    }

    const getchildsSQL = (id, sql) => {
        setSQLarray(SQLarray => {
            const sqlObj = SQLarray.find((saItem) => (Number(saItem.id) === Number(id)), id);
            if (typeof (sqlObj) === 'undefined') {
                return [...SQLarray, { id: id, sql: sql }]
            } else {
                return [...SQLarray.filter((i) => (i.id !== id), id), { id: id, sql: sql }];
            }
        });
    }


    //Start with one table
    if (tables.length === 0) {
        addTable(false)
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
            <div style={{ margin: "16px 2px 10px 2px" }}>
                <label onClick={() => {
                    addTable(true);
                }}
                    type="button" className="btn btn-dark">Add Table</label>
                <label type="button"
                    onClick={saveFile}
                    className="btn btn-dark">Save Full SQL</label>
            </div>
            <ol style={{paddingInlineStart:0, width: "100%" }}>{TableForms}</ol>
        </>
    );
}


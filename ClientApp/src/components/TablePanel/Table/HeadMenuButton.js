﻿import React, { useState, useEffect } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '../Components/Button';

export const HeadMenuButton = ({ TableInfo }) => {

    const deleteMode = TableInfo.TableState.deleteMode

    //удалить строки в таблице
    const DeleteClick = () => {
        if (deleteMode == false) { return }
        TableInfo.TableState.TableData
            .columnData[0].rowVals.forEach((rowVal, i) => {
                if (rowVal.value == true) {
                    delete TableInfo.TableState.TableData.rowIds[i]
                    TableInfo.TableState.TableData
                        .columnData.forEach(columnData => {
                            delete columnData.rowVals[i]                            
                        })
                }
            })
        TableInfo.TableState.TableData
            .columnData.forEach(columnData => {
                columnData.rowVals =
                    columnData.rowVals.filter(rowVal => rowVal != undefined)
            })
        TableInfo.TableState.TableData.rowIds =
            TableInfo.TableState.TableData.rowIds
                .filter(rowId => rowId != undefined)
        //применить изменения
        TableInfo.setTableState({ ...TableInfo.TableState })
    }

    if (deleteMode) {
        return (
            < Button
                Icon={< DeleteIcon size="small" />}
                text='Удалить'
                Click={DeleteClick}
            />
        )
    } else {
        return null
    }
}
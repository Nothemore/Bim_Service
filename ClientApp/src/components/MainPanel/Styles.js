﻿import { createUseStyles } from 'react-jss';
import {
    HeadBlockHeight,
    MainPanelMargin,
    SepPanel_W,
    Window_minW
} from '../../constants/Constants'

let NavAndSource = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '2.3em 1fr',
    padding: '0 12px 12px 12px ',

    border: '0.1vh solid rgba(109, 109, 109, 0.8)',
    borderRadius: 4,
    background: 'rgba(200, 200, 200, 0.3)',
    boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.4)',

    overflow: 'hidden'
}

const AddUnits = (val) => {
    if (val !== '1fr') {
        return val + 'px'
    }
    return val
}

export const useStyles = createUseStyles({
    MainPanel: data => ({
        display: 'grid',
        gridTemplateColumns:
            AddUnits(data.NavPanel_W) + ' ' +
            AddUnits(SepPanel_W) + ' ' +
            AddUnits(data.SourcePanel_W),
        gridTemplateRows: '1fr',
        margin: MainPanelMargin,
        height: 'calc(100vh - ' +
            HeadBlockHeight + ' - ' +
            2 * MainPanelMargin + 'px)',
        minWidth: Window_minW
    }),
    SourcePanel: NavAndSource,
    NavPanel: NavAndSource,
    SepPanel: { cursor: 'col-resize' }
});

//ЕСЛИ НАДО БУДЕТ СКРЫВАТЬ ПАНЕЛИ
//NavPanel: Object.assign({}, NavAndSource, { display: 'none' }),
//SepPanel: Object.assign({ cursor: 'col-resize' }, { display: 'none' })






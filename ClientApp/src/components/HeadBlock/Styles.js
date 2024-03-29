﻿import { createUseStyles } from 'react-jss';
import { HeadBlockHeight, Window_minW, MainPanelMargin, ThemeColor2  } from '../../constants/Constants'

export const useStyles = createUseStyles({
    HeadBlock: {
        height: HeadBlockHeight,
        display: 'flex',
        alignItems: 'center',
        minWidth: Window_minW + MainPanelMargin,

        background: ThemeColor2,
        boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.3)',
                
        userSelect: 'none',

        '& >h2, >span': {                       
            margin: '0 0 0 5px'
        },
        '& >span': {
            fontSize: 36
        },
    }
})









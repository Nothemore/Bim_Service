﻿import { createUseStyles } from 'react-jss';

import {
    ThemeColor1,
    ThemeColor2,
    ThemeColor3,
    SelectColor1,
    SelectColor2,
    SimpleLineStyle,
    BoldLineColor,
    SimpleLineColor,
} from '../../../constants/Constants'

//стили
export const TableStyle = createUseStyles({
    Table: {
        display: Data => Data.newRowMode ? 'block' : 'flex',
        flexFlow: Data => Data.newRowMode ? null : 'column nowrap',
        overflow: Data => Data.newRowMode ? null : 'hidden',
        margin: '5px 0 0 0',
        '& >.TableHead': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 35,
            '& >.HeadText': {
                display: 'flex',
                alignItems: 'center',
                userSelect: 'none',
                '& p': {
                    color: Data => Data.disabled ?
                        SimpleLineColor : BoldLineColor
                }
            },
            '& >.HeadMenuContainer': {

            },
        },
        '& >.BodyContainer': {
            position: 'relative',
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'flex-start',
            background: ThemeColor2,
            border: SimpleLineStyle,
            borderRadius: 6,
            overflowY: 'hidden',
            overflowX: 'auto',
            '& >.BodyHead': {
                display: 'flex',
                '& >.BodyCell': {
                    display: 'flex',
                    background: ThemeColor3,
                    '& >.CellContent': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: SimpleLineStyle,
                        //текст заголовка столбцов
                        '& >p': {
                            margin: 5,
                            textAlign: 'center',
                            userSelect: 'none',
                            color: Data => Data.disabled ?
                                SimpleLineColor : BoldLineColor
                        }
                    }
                }
            },
            '& >.TableBody': {
                overflowX: 'hidden',
                overflowY: 'auto',
                height: '100%',
                '& >.BodyRow': {
                    display: 'flex',
                    background: ThemeColor3,
                    '& >.BodyCell': {
                        display: 'flex',
                        '& >.CellContent': {
                            display: 'flex',
                            alignItems: 'center',
                            height: 25,
                            borderBottom: SimpleLineStyle,
                        },
                    },
                    '&:hover': {
                        background: Data =>
                            Data.deleteMode && Data.newRowMode == false ?
                            SelectColor1 : SelectColor2,
                    }
                }
            },
            '& >.SeparIndicator': {
                position: 'absolute',
                width: 3,
                height: '100%',
                cursor: 'col-resize',
                background: ThemeColor1
            }
        },
        '& .CellSepar': {
            width: 3,
            cursor: 'col-resize',
            background: ThemeColor1
        }
    }
})
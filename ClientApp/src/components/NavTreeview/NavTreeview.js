﻿import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss';

import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

import { TreeIcons, SimpleLineStyle } from '../../constants/Constants'
import { LoadTreeNodesData } from '../../actions/Index'

//стили для TreeItem
const StyledTreeItem = withStyles(() => ({
    iconContainer: {
        '& .minus, .plus': {
            width: 16,
            height: 16
        },
        '& .minus, .plus': { opacity: 0.6 },
        margin: 0
    },
    content: {
        margin: '0 0 2px 0'
    },
    group: {
        paddingLeft: 13,
        marginLeft: 7,
        borderLeft: `1px dashed rgba(0, 0, 0, 0.2)`
    },
    label: {
        whiteSpace: 'nowrap',
        userSelect: 'none',
        padding: 0,
        '& > div': {
            display: 'flex',
            alignItems: 'center'
        },
        '& .clients, .client, .object, .files, .file, .stage, .templates, .template, .plugin, .checking, .setting': {
            margin: '0 4px 0 4px'
        },
        '& .files, .file, .stage': {
            minWidth: 20,
            minHeight: 20,
            width: 20,
            height: 20
        },
        '& .checking, .setting, .plugin, .templates, .template': {
            minWidth: 17,
            minHeight: 17,
            width: 17,
            height: 17
        },
        '& .clients, .client': {
            minWidth: 22,
            minHeight: 22,
            width: 22,
            height: 22
        },
        '& .object': {
            fontSize: '1.5em'
        }
    }
}))((props) => <TreeItem {...props} />);

//компонент
function NavTreeView({ TreeNodesData, LoadData }) {

    useEffect(() => {
        //начальная загрузка TreeNodes
        LoadData()
    }, [])

    //создание лейбла
    const LabelConstructor = (label) => {
        return (
            <div>
                <label.icon />
                <p>{label.name}</p>
            </div>
        )
    }
    //рекурсивно строится дерево
    const TreeConstructor = (TreeNodes) => {
        if (TreeNodes === null || TreeNodes === undefined) {
            return <p>Загрузка...</p>
        }
        //получить, например, 'Stage' из '12345_Stage'
        const arr = TreeNodes.id.split('_');
        const nodeType = arr[1]
        //создание лейбла
        const label =
            LabelConstructor({
                //словарь TreeIcons хранит SVG иконку (ключ - имя)
                icon: TreeIcons.get(nodeType),
                name: TreeNodes.name
            })

        return (
            <StyledTreeItem key={TreeNodes.id} nodeId={TreeNodes.id} label={label} >
                {Array.isArray(TreeNodes.children) ?
                    TreeNodes.children.map((node) => TreeConstructor(node)) : null}
            </StyledTreeItem >)
    }
    //событие выделения узла
    const onNodeSelect = (event, nodeId) => {
        //загрузка дерева и передача Id выделенного узла
        LoadData(nodeId)
    }

    //стиль контейнера
    const containerStyles = createUseStyles({
        container: {
            overflow: 'auto',
            padding: '5px 0 0 5px',
            borderTop: SimpleLineStyle
        }
    })

    return (
        <div class={containerStyles().container} >
            <TreeView
                defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon className="plus" />}
                defaultExpandIcon={<AddBoxOutlinedIcon className="minus" />}
                onNodeSelect={onNodeSelect}
            >
                {TreeConstructor(TreeNodesData)}
            </TreeView>
        </div>
    )
}

//присоединение состояния к компоненту
export default connect(
    state => ({ TreeNodesData: state.TreeNodes.Data }),
    dispatch => ({
        LoadData: (SelectedId) => LoadTreeNodesData(dispatch, SelectedId)
    }))
    (NavTreeView)
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Bim_Service.Model.Constants;

namespace Bim_Service.Model
{
    //данные таблицы (в формате, удобном в веб клиенте)
    public class TableData_Client
    {
        public int selectedId { get; set; }
        public string tableName { get; set; } = "";
        public List<int> rowIds { get; set; } = new List<int>();
        public List<ColumnData> columnData { get; set; } =
            new List<ColumnData>();
        public bool bAddNewRow { get; set; } = false;

        public TableData_Client(int selectedId,
                                string tableName,
                                bool bAddNewRow,
                                List<ColumnData> columnData = null,
                                List<int> rowIds = null)
        {
            this.selectedId = selectedId;
            this.tableName = tableName;
            this.bAddNewRow = bAddNewRow;
            if (rowIds != null) this.rowIds = rowIds;
            if (columnData != null) this.columnData = columnData;
        }
        //перевод данных в формат, удобный на сервере
        public TableData_Server TransformToServer()
        {
            List<CellContainer> HeaderCellContainer =
                new List<CellContainer>();
            for (int i = 0; i < columnData.Count; i++)
            {
                ColumnData CD = columnData[i];
                CellInfo CI = new CellInfo(CD.headerName,
                                           CD.headerPropName,
                                           (ControlType)CD.type,
                                           i,
                                           CD.comboboxData);
                CellContainer CC =
                     new CellContainer(CD.defVal, CI);
                HeaderCellContainer.Add(CC);
            }             
            List<RowContainer> RowContainers = new List<RowContainer>();    
            for (int x = 0; x < rowIds.Count; x++)
            {
                List<CellContainer> ValueCellContainer =
                    new List<CellContainer>();
                for (int y = 0; y < columnData.Count; y++)
                {
                    CellInfo CI = HeaderCellContainer[y].CI;
                    string value = columnData[y].rowVals[x].value;
                    CellContainer CC = new CellContainer(value, CI);
                    ValueCellContainer.Add(CC);
                }
                RowContainer RC = new(rowIds[x], ValueCellContainer);
                RowContainers.Add(RC);
            }
            TableData_Server TDS =
                new TableData_Server(selectedId,
                                     tableName,
                                     HeaderCellContainer,
                                     bAddNewRow,
                                     RowContainers);

            return TDS;
        }
    }
    //данные столбца
    public class ColumnData
    {
        //тип контрола (0-textbox, 1-combobox, 2-checkbox)
        public int type { get; set; }
        //имя заголовка столбца
        public string headerName { get; set; } = "";
        //системное имя для заголовка столбца
        public string headerPropName { get; set; } = "";
        //данные комбобокса
        public List<string> comboboxData { get; set; } =
            new List<string>();
        //значение по умолчанию
        public string defVal { get; set; } = "";
        //значения ячеек в одном столбце
        public List<TableDataCellValue> rowVals { get; set; } =
            new List<TableDataCellValue>();

        public ColumnData(int type,
                          string headerName,
                          string headerPropName,
                          string defVal = null,
                          List<TableDataCellValue> rowVals = null,
                          List<string> comboboxData = null)
        {
            this.type = type;
            this.headerName = headerName;
            this.headerPropName = headerPropName;
            if (defVal != null) this.defVal = defVal;
            if (rowVals != null) this.rowVals = rowVals;
            if (comboboxData != null) this.comboboxData = comboboxData;
        }
    }
}

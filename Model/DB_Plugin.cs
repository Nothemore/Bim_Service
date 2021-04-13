﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bim_Service.Model
{
    public class DB_Plugin
    {
        public int Id { get; set; }
        public bool NeedChecking { get; set; }
        public bool NeedSetting { get; set; }
        public string CheckingData { get; set; }
        public string SettingData { get; set; }

        public DB_Plugin_const DB_Plugin_const { get; set; }
        public DB_Template DB_Template { get; set; }
        public DB_Stage DB_Stage { get; set; }
    }
}

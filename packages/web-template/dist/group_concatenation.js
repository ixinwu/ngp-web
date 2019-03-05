[
  {
    master_app_key: 'ZM_GIPM',
    master_app_key_name: '政府性投资项目管理',
    master_group_key: 'ZM_GIPM_ProjectStage',
    master_group_key_name: '项目阶段',
    slave_app_key: 'ZM_GIPM',
    slave_app_key_name: '政府性投资项目管理',
    slave_group_key: 'ZM_GIPM_LinkType',
    slave_group_key_name: '环节类别',
    concatenation_config: [
      {
        master_type_key: 'ZM_GIPM_ProjectStage_PreliminaryProcedures',
        master_type_key_name: '前期手续',
        slave_type_keys: [
          'ZM_GIPM_LinkType_ProApproval',
          'ZM_GIPM_LinkType_FeasibilityStudy',
          'ZM_GIPM_LinkType_PlanningScheme',
          'ZM_GIPM_LinkType_BudgetaryEstimate',
          'ZM_GIPM_LinkType_EarlyReview',
          'ZM_GIPM_LinkType_LandCertificate',
          'ZM_GIPM_LinkType_Licence',
          'ZM_GIPM_LinkType_ConstructionDrawingReview',
        ],
      },
      {
        master_type_key: 'ZM_GIPM_ProjectStage_AssetTransfer',
        master_type_key_name: '资产结转',
        slave_type_keys: ['ZM_GIPM_LinkType_AssetTransferTask'],
      },
      {
        master_type_key: 'ZM_GIPM_ProjectStage_TenderAndStart',
        master_type_key_name: '招标及开工',
        slave_type_keys: [
          'ZM_GIPM_LinkType_MainTender',
          'ZM_GIPM_LinkType_ConstructionPermit',
          'ZM_GIPM_LinkType_StartProject',
        ],
      },
      {
        master_type_key: 'ZM_GIPM_ProjectStage_FinalAcceptance',
        master_type_key_name: '竣工验收',
        slave_type_keys: [
          'ZM_GIPM_LinkType_FinalAcceptanceTask',
          'ZM_GIPM_LinkType_ProIsCompleted',
        ],
      },
      {
        master_type_key: 'ZM_GIPM_ProjectStage_AuditOfReturns',
        master_type_key_name: '决算审计',
        slave_type_keys: ['ZM_GIPM_LinkType_AuditOfReturnsTask'],
      },
    ],
  },
];

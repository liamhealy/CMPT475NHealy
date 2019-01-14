export class Constants {
    // RoleIDs
    static readonly HR_ROLE_ID = 1;
    static readonly MGR_ROLE_ID = 2;
    static readonly EMP_ROLE_ID = 3;

    // DepartmentIDs
    static readonly HR_DEP_ID = 1;
    static readonly IT_DEP_ID = 2;
    static readonly SALES_DEP_ID = 3;
    static readonly FIN_DEP_ID = 4;
    static readonly ACC_DEP_ID = 5;
    static readonly MARK_DEP_ID = 6;
    static readonly LEG_DEP_ID = 7;
    static readonly GEN_DEP_ID = 8;

    // Region Codes
    static readonly REGION_CODE = '+(##)';
    static readonly REGION_CODE_USA = '+1';
    static readonly REGION_CODE_ENG = '+44';
    static readonly REGION_CODE_JAP = '+81';
    static readonly REGION_CODE_FRA = '+33';

    // Local Storage Keys
    static readonly DEP_LOCAL_KEY = 'Departments';
    static readonly ROLE_LOCAL_KEY = 'Roles';
    static readonly LOC_LOCAL_KEY = 'Locations';
    static readonly APP_LOCAL_KEY = 'Applications';

    // Permission Status
    static readonly PERM_PENDING = 1;
    static readonly PERM_ACCEPTED = 2;
    static readonly PERM_DECLINED = 3;

    // Icons
    static readonly DROPDOWN_ICON = 'fa fa-caret-down';

    // MISC
    static readonly DESCR_STR = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
}

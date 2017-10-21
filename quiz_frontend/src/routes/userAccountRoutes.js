import * as routes from './index.js';

export default [
    {
        route: routes.USER_ACCOUNT_PATH,
        label: 'Profile',
        icon: 'user'
    },
    {
        route: routes.USER_SETTINGS_PATH,
        label: 'Settings',
        icon: 'setting'
    },
    {
        route: routes.USER_STATISTICS_PATH,
        label: 'Statistics',
        icon: 'area-chart'
    }
];

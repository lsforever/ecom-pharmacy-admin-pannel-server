import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    //MenuProps,
    //ReduxState,
} from 'react-admin';


import SubMenu from './submenu';
//import { AppState } from '../types';
//Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import AssistantIcon from '@mui/icons-material/Assistant';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';


const MenuNames = {
    users: 'menuUsers' ,
    medicine: 'menuMedicine' ,
    company: 'menuCompany'
    //catalog:'menuCatalog' ,
    //customers:  'menuCustomers',
}

const Menu = ({ dense = false }) => {
    const [state, setState] = useState({
        menuUsers: true,
        menuMedicine: true,
        menuCompany: true,
    });
    const translate = useTranslate();
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    useSelector((state) => state.theme); // force rerender on theme change
    const classes = useStyles();

    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div
            className={classnames(classes.root, {
                [classes.open]: open,
                [classes.closed]: !open,
            })}
        >
            {' '}
            <DashboardMenuItem />

            <SubMenu
                handleToggle={() => handleToggle(MenuNames.users)}
                isOpen={state.menuUsers}
                name="Users"
                icon={<PeopleIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/users',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`Basic Users`, {
                        smart_count: 2,
                    })}
                    leftIcon={<PeopleOutlineIcon />}
                    dense={dense}
                />
            </SubMenu>

            <SubMenu
                handleToggle={() => handleToggle(MenuNames.medicine)}
                isOpen={state.menuMedicine}
                name="Medicine Products"
                icon={<LocalHospitalIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/medicine-products',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`Medicines`, {
                        smart_count: 2,
                    })}
                    leftIcon={<MedicationIcon />}
                    dense={dense}
                />
                 <MenuItemLink
                    to={{
                        pathname: '/product-medicine-generic',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`Generic Names`, {
                        smart_count: 2,
                    })}
                    leftIcon={<EditAttributesIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/product-medicine-type',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`Medicine Types`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AssistantIcon />}
                    dense={dense}
                />
               
            </SubMenu>


            <SubMenu
                handleToggle={() => handleToggle(MenuNames.company)}
                isOpen={state.menuCompany}
                name="Companies"
                icon={<LocationCityIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/product-companies',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`Companies`, {
                        smart_count: 2,
                    })}
                    leftIcon={<BusinessIcon />}
                    dense={dense}
                />
            </SubMenu>



            {/* <SubMenu
                handleToggle={() => handleToggle(MenuNames.catalog)}
                isOpen={state.menuCatalog}
                name="pos.menu.catalog"
                icon={<CustomIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/products',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`resources.products.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CustomIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/categories',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`resources.categories.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CustomIcon />}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle(MenuNames.customers)}
                isOpen={state.menuCustomers}
                name="pos.menu.customers"
                icon={<CustomIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/customers',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`resources.customers.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CustomIcon />}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/segments',
                        state: { _scrollToTop: true },
                    }}
                    primaryText={translate(`resources.segments.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CustomIcon />}
                    dense={dense}
                />
            </SubMenu> */}

            {/* <MenuItemLink
                to={{
                    pathname: '/reviews',
                    state: { _scrollToTop: true },
                }}
                primaryText={translate(`resources.reviews.name`, {
                    smart_count: 2,
                })}
                leftIcon={<CustomIcon />}
                dense={dense}
            /> */}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    open: {
        width: 200,
    },
    closed: {
        width: 55,
    },
}));

export default Menu;
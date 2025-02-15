import classNames from "classnames/bind";
import styles from './Sidebar.module.scss'
import config from "~/config";
import Menu, { MenuItem } from './Menu'
import { HomeIcon, UserGroupIcon, LiveIcon, HomeActiveIcon, LiveActiveIcon } from '~/components/Icons'

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />}></MenuItem>
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<UserGroupIcon />}></MenuItem>
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />}></MenuItem>
            </Menu>
        </aside>
    );
}

export default Sidebar;
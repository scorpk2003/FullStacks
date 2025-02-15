import classNames from "classnames/bind";
import { faCircleQuestion, faCoins, faEarthAsia, faEllipsisVertical, faGear, faKeyboard, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss'

import { UploadIcon } from "~/components/Icons";
import Button from '~/components/Button';
import images from '~/assets/images'
import Menu from "~/components/Poper/Menu";
import Image from "~/components/Image"
import config from '~/config'
import Search from '../Search'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: "Language",
            data: [
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
                { code: 'en', title: 'English', },
                { code: 'vi', title: 'Tieng Viet', },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {

    const handleMenuChange = (menuItem) => { }

    const currentUser = true;

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/@khang',
        }, {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Coins',
            to: '/coin',
        }, {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log Out',
            to: '/logout',
            separate: true,
        }
    ]

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt='Tiktok' />
            </Link>
            <Search />

            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Tippy delay={[0, 200]} content="Upload Video" placement="bottom">
                            <button className={cx('action-btn')} >
                                <UploadIcon />
                            </button>
                        </Tippy>

                    </>
                ) : (
                    <>
                        <Button text>
                            Upload
                        </Button>
                        <Button primary>
                            Login
                        </Button>


                    </>
                )}

                <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                    {currentUser ? (
                        <Image
                            className={cx('user-avatar')}
                            alt='Cao Hoang Gia Khang'
                            src='https://i.pinimg.com/736x/70/bb/8b/70bb8b11ad013fa4375d0927bdf4309a.jpg'
                        />
                    ) : (

                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                        </button>
                    )}
                </Menu>
            </div>

        </div >
    </header >;
}

export default Header;
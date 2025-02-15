import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import MenuItem from "./MenuItem";
import styles from './Menu.module.scss'
import Header from "./Header";
import PropTypes from 'prop-types';
import { Wrapper as PoperWrapper } from '~/components/Poper'
import { useState } from "react";

const cx = classNames.bind(styles)

const defaultFn = () => { }

function Menu({
    children,
    items = [],
    onChange = defaultFn,
    hideOnClick = false
}) {

    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory((prev) => [...prev, item.children])
                } else {
                    onChange(item)
                }
            }}></MenuItem>
        }
        );
    };

    const handleResetToFirstPage = () => setHistory(prev => prev.slice(0, 1))

    return (
        < Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={attrs => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PoperWrapper className={cx('menu-poper')}>
                        {history.length > 1 && <Header title={current.title} onBack={() => {
                            setHistory(prev => prev.slice(0, prev.length - 1))
                        }}></Header>}
                        <div className={cx('menu-body')}>
                            {renderItems()}
                        </div>
                    </PoperWrapper>
                </div>
            )}
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy >
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.func,
}

export default Menu;
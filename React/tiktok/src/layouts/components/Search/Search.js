import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from 'classnames/bind';
import styles from './Search.module.scss'

import AccountItem from "~/components/AccountItem";
import * as searchServices from '~/Services/searchService'
import { Wrapper as PoperWrapper } from '~/components/Poper'
import { useDebounce } from '~/hooks';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 200);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([])
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounce);

            setSearchResult(result);
            setLoading(false);
        }

        fetchApi();

    }, [debounce]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchvalue = e.target.value;
        if (!searchvalue.startsWith(' ')) {
            setSearchValue(searchvalue);
        }
    }

    return (
        // Using div Wrap Warnings of Tippy
        <div>
            <HeadlessTippy
                interactive={true}
                appendTo={() => document.body}
                visible={showResult && searchResult.length > 0}
                render={attrs => (
                    <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                        <PoperWrapper>
                            <h3 className={cx('search-title')}>
                                Accounts
                            </h3>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result}></AccountItem>
                            ))}
                        </PoperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search Input and Videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />

                    {!!searchValue && !loading && (

                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>

                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>;
        </div>
    )
}

export default Search;
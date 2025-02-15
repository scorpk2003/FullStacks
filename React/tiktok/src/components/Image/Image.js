/* eslint-disable jsx-a11y/alt-text */
import { useState, forwardRef } from 'react';
import images from '~/assets/images'
import styles from './Image.module.scss'
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Image = forwardRef(({
    src,
    alt,
    className,
    fallback: customFallback = images.noImages,
    ...props }, ref) => {

    const [fallback, setFallback] = useState('')

    const handleError = () => {
        setFallback(customFallback)
    }

    return <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={fallback || src}
        {...props}
        onError={handleError}>

    </img>;
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image;
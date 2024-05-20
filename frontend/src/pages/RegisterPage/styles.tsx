import { CSSObject } from '@emotion/serialize';

export const SelectStyles = {
    container: (styles: CSSObject): CSSObject => ({
        ...styles,
        width: '538px',
        height: '56px',
        zIndex: '9999',
    }),
    control: (styles: CSSObject): CSSObject => ({
        ...styles,
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        height: '100%',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '4px',
        outline: 'transparent',
        boxShadow: 'none',
        color: '#7d7d7d',
        ':hover': {
            border: '1px solid rgba(255, 255, 255, 0.16)',
            backgroundColor: 'rgba(255, 255, 255, 0.16)',
            color: '#7d7d7d',
        },
        ':active': {
            boxShadow: 'none',
            color: '#7d7d7d',
        },
    }),
    option: (styles: CSSObject, { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }): CSSObject => ({
        ...styles,
        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.08)',
        color: isFocused ? 'white' : '#7d7d7d',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.16)',
            transition: 'all .2s ease',
        },
    }),
    menu: (styles: CSSObject): CSSObject => ({ ...styles, zIndex: 9999999999999 }),
    menuPortal: (styles: CSSObject): CSSObject => ({ ...styles, zIndex: 99999999999! }),
};

import React from 'react';
import { createTestInstance } from '@magento/peregrine';
import Row from '../row';

jest.mock('@magento/venia-drivers', () => ({
    resourceUrl: jest.fn(src => src)
}));

jest.mock('jarallax', () => {
    return {
        jarallax: jest.fn()
    };
});
import { jarallax } from 'jarallax';
const mockJarallax = jarallax.mockImplementation(() => {});

jest.mock('../../../../../../classify');

test('render row with no props', () => {
    const component = createTestInstance(<Row />);

    expect(component.toJSON()).toMatchSnapshot();
});

test('render row with parallax initializes Jarallax', () => {
    const rowProps = {
        desktopImage: 'parallax.jpg',
        backgroundRepeat: true,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        enableParallax: true,
        parallaxSpeed: 0.75
    };
    createTestInstance(<Row {...rowProps} />, {
        createNodeMock: () => {
            return true;
        }
    });

    expect(mockJarallax).toHaveBeenCalledWith(true, {
        speed: 0.75,
        imgPosition: 'center center',
        imgRepeat: 'repeat',
        imgSize: 'cover'
    });
});

test('row unmount causes Jarallax to be destroyed', () => {
    const rowProps = {
        desktopImage: 'parallax.jpg',
        backgroundRepeat: false,
        backgroundSize: 'contain',
        backgroundPosition: 'top left',
        enableParallax: true,
        parallaxSpeed: 0.75
    };
    const component = createTestInstance(<Row {...rowProps} />, {
        createNodeMock: () => {
            return true;
        }
    });
    component.unmount();

    expect(mockJarallax.mock.calls).toEqual([
        [
            true,
            {
                speed: 0.75,
                imgPosition: 'top left',
                imgRepeat: 'no-repeat',
                imgSize: 'contain'
            }
        ],
        [true, 'destroy']
    ]);
});

test('render row with all props configured', () => {
    const rowProps = {
        appearance: 'full-width',
        verticalAlignment: 'middle',
        minHeight: '200px',
        backgroundColor: 'red',
        desktopImage: 'desktop.jpg',
        mobileImage: 'mobile.jpg',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: true,
        enableParallax: false,
        parallaxSpeed: 0.5,
        textAlign: 'right',
        border: 'solid',
        borderColor: 'red',
        borderWidth: '10px',
        borderRadius: '15px',
        marginTop: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        cssClasses: ['test-class']
    };
    const component = createTestInstance(<Row {...rowProps} />, {
        createNodeMock: () => {
            return {
                offsetWidth: 250,
                offsetHeight: 250
            };
        }
    });

    expect(component.toJSON()).toMatchSnapshot();
});

test('render row with mobile image displayed and parallax enabled', () => {
    const rowProps = {
        mobileImage: 'mobile.jpg',
        backgroundSize: 'cover',
        enableParallax: true
    };

    window.matchMedia = jest.fn().mockImplementation(query => {
        return {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        };
    });

    const component = createTestInstance(<Row {...rowProps} />, {
        createNodeMock: () => {
            return {
                offsetWidth: 250,
                offsetHeight: 250
            };
        }
    });

    expect(component.toJSON()).toMatchSnapshot();
});

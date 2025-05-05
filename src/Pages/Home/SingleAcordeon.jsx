import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './style.css';

const SingleAcordeon = ({ title, children, isOpen, onToggle }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [isOpen]);

    return (
        <div>
            <section
                onClick={onToggle}
                className='acordeon'
                style={{ backgroundColor: isOpen ? 'rgb(39, 60, 57)' : '' }}
            >
                <p className='note_title'>{title}</p>
                {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
            </section>

            <div
                ref={contentRef}
                className='content-wrapper'
                style={{ maxHeight: height }}
            >
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SingleAcordeon;


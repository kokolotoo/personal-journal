import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './style.css';

const SingleAcordeon = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
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
                onClick={() => setIsOpen(prev => !prev)}
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


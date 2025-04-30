
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './style.css'

const SingleAcordeon = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <section
                onClick={() => setIsOpen(prev => !prev)}
                className='acordeon'
                style={{ backgroundColor: isOpen && 'rgb(39, 60, 57)'}}
            >
                <p>{title}</p>
                {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
            </section>

            <div className={`contenT ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default SingleAcordeon

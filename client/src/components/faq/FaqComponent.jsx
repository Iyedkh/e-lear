// FAQ.js

import React, { useState, useEffect } from 'react';
import './faqComponent.css';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/faq/');
            if (!response.ok) {
                throw new Error(`Failed to fetch FAQs: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setFaqs(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const toggleAnswer = (index) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index].showAnswer = !updatedFaqs[index].showAnswer;
        setFaqs(updatedFaqs);
    };

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            <ul className="faq-list">
                {faqs.map((faq, index) => (
                    <li key={index} className="faq-item">
                        <h3 className="faq-question">{faq.question}</h3>
                        <p className={`faq-answer ${faq.showAnswer ? 'show' : ''}`}>{faq.answer}</p>
                        <button className="toggle-button" onClick={() => toggleAnswer(index)}>
                            {faq.showAnswer ? 'Hide Answer' : 'Show Answer'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FAQ;

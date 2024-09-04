import React from 'react';
import { testCORS } from '../services/apiService';

const TestCORS: React.FC = () => {
    const handleTestCORS = async () => {
        try {
            const response = await testCORS();
            console.log('CORS Test Response:', response);
            alert('CORS test successful! Check console for details.');
        } catch (error) {
            console.error('CORS Test Error:', error);
            alert('CORS test failed. Check console for details.');
        }
    };

    return (
        <button onClick={handleTestCORS}>
            Test CORS
        </button>
    );
};

export default TestCORS;
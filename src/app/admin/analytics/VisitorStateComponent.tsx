import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

interface VisitorData {
    location: string;
    visitors: number;
}

interface VisitorStateComponentProps {
    visitorData: VisitorData[];
}

const VisitorStateComponent: React.FC<VisitorStateComponentProps> = ({ visitorData }) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">States</h2>
                <div className="text-xs text-gray-400">VISITORS</div>
            </div>
            <ul>
                {visitorData.map((item, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                            <span>{item.location}</span>
                        </div>
                        <span>{item.visitors}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
                <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                    View All
                    <ChevronsUpDown className="ml-1 w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default VisitorStateComponent;
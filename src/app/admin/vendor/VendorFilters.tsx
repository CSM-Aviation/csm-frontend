import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';

interface VendorFiltersProps {
    filters: {
        status: string;
        search: string;
        dateFrom: string;
        dateTo: string;
    };
    onFilterChange: (name: string, value: string) => void;
}

const VendorFilters: React.FC<VendorFiltersProps> = ({ filters, onFilterChange }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search filter */}
                <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Search
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Company name or email"
                            value={filters.search}
                            onChange={(e) => onFilterChange('search', e.target.value)}
                        />
                    </div>
                </div>

                {/* Status filter */}
                <div className="w-full md:w-48">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            id="status"
                            name="status"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                            value={filters.status}
                            onChange={(e) => onFilterChange('status', e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Date filters */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="flex-1">
                    <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
                        From Date
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            name="dateFrom"
                            id="dateFrom"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                            value={filters.dateFrom}
                            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1">
                    <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
                        To Date
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            name="dateTo"
                            id="dateTo"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md"
                            value={filters.dateTo}
                            onChange={(e) => onFilterChange('dateTo', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorFilters;
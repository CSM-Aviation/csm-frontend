import React, { useState } from 'react';
import { CheckCircle, XCircle, ClipboardList, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';
import VendorDetailView from './VendorDetailView';
import { Vendor } from '@/app/services/apiService';

interface VendorListProps {
    vendors: Vendor[];
    onUpdateStatus: (id: string, status: 'Approved' | 'Rejected' | 'Pending') => Promise<void>;
}

const VendorList: React.FC<VendorListProps> = ({ vendors, onUpdateStatus }) => {
    const [expandedVendor, setExpandedVendor] = useState<string | null>(null);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

    const toggleExpand = (id: string) => {
        setExpandedVendor(expandedVendor === id ? null : id);
    };

    const openDetailView = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setIsDetailViewOpen(true);
    };

    const closeDetailView = () => {
        setIsDetailViewOpen(false);
        setSelectedVendor(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (vendors.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No vendors found matching the selected filters.
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Submission Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {vendors.map((vendor) => (
                            <React.Fragment key={vendor._id}>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => toggleExpand(vendor._id)}
                                                className="mr-2 text-gray-400 hover:text-gray-500"
                                            >
                                                {expandedVendor === vendor._id ? (
                                                    <ChevronDown className="h-5 w-5" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5" />
                                                )}
                                            </button>
                                            {vendor.companyName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>{vendor.email}</div>
                                        <div>{vendor.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                                            {vendor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(vendor.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openDetailView(vendor)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                title="View Details"
                                            >
                                                <ClipboardList className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => onUpdateStatus(vendor._id, 'Approved')}
                                                className={`hover:text-green-600 ${vendor.status === 'Approved' ? 'text-green-600' : 'text-gray-400'}`}
                                                title="Approve Vendor"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => onUpdateStatus(vendor._id, 'Rejected')}
                                                className={`hover:text-red-600 ${vendor.status === 'Rejected' ? 'text-red-600' : 'text-gray-400'}`}
                                                title="Reject Vendor"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedVendor === vendor._id && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <h4 className="font-medium text-sm text-gray-500">Safety Status</h4>
                                                    <ul className="mt-2 text-sm text-gray-700">
                                                        <li>ARGUS: {vendor.argusStatus || 'N/A'}</li>
                                                        <li>Wyvern: {vendor.wyvernStatus || 'N/A'}</li>
                                                        <li>ISBAO: {vendor.isbaoStatus || 'N/A'}</li>
                                                        {vendor.alternativeCertification && (
                                                            <li>Other: {vendor.alternativeCertification}</li>
                                                        )}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm text-gray-500">Documents</h4>
                                                    <ul className="mt-2 text-sm text-gray-700">
                                                        {vendor.documents?.certificate && (
                                                            <li className="flex items-center">
                                                                <ExternalLink className="h-4 w-4 mr-1 text-blue-500" />
                                                                <a href={vendor.documents.certificate} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                    Air Carrier Certificate
                                                                </a>
                                                            </li>
                                                        )}
                                                        {vendor.documents?.insurance && (
                                                            <li className="flex items-center">
                                                                <ExternalLink className="h-4 w-4 mr-1 text-blue-500" />
                                                                <a href={vendor.documents.insurance} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                                    Certificate of Insurance
                                                                </a>
                                                            </li>
                                                        )}
                                                        {/* Add more document links as needed */}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => openDetailView(vendor)}
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        View Complete Details
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {isDetailViewOpen && selectedVendor && (
                <VendorDetailView
                    vendor={selectedVendor}
                    onClose={closeDetailView}
                    onUpdateStatus={onUpdateStatus}
                />
            )}
        </>
    );
};

export default VendorList;
import React from 'react';
import { X, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { Vendor } from '@/app/services/apiService';

interface VendorDetailViewProps {
    vendor: Vendor;
    onClose: () => void;
    onUpdateStatus: (id: string, status: 'Approved' | 'Rejected' | 'Pending') => Promise<void>;
}

const VendorDetailView: React.FC<VendorDetailViewProps> = ({ vendor, onClose, onUpdateStatus }) => {
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
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

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={onClose}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                    Vendor Details
                                </h3>

                                <div className="border-b border-gray-200 pb-4 mb-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-xl font-semibold text-gray-900">{vendor.companyName}</h4>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vendor.status)}`}>
                                            {vendor.status}
                                        </span>
                                    </div>
                                    <p><span className="text-gray-500">Submission Date:</span> {formatDate(vendor.createdAt)}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Contact Information */}
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900 mb-2">Contact Information</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li><span className="text-gray-500">Email:</span> {vendor.email}</li>
                                            <li><span className="text-gray-500">Phone:</span> {vendor.phone}</li>
                                        </ul>
                                    </div>

                                    {/* Safety Status */}
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900 mb-2">Safety Status</h4>
                                        <ul className="space-y-1 text-sm">
                                            <li><span className="text-gray-500">ARGUS Status:</span> {vendor.argusStatus || 'N/A'}</li>
                                            <li><span className="text-gray-500">Wyvern Status:</span> {vendor.wyvernStatus || 'N/A'}</li>
                                            <li><span className="text-gray-500">ISBAO Status:</span> {vendor.isbaoStatus || 'N/A'}</li>
                                            <li><span className="text-gray-500">Alternative Certification:</span> {vendor.alternativeCertification || 'N/A'}</li>
                                        </ul>
                                    </div>
                                    {vendor.status === 'Rejected' && vendor.rejectReason && (
                                        <div className="md:col-span-2 mt-4">
                                            <h4 className="text-md font-medium text-red-700 mb-2">Rejection Reason</h4>
                                            <div className="bg-red-50 p-4 rounded-md border border-red-200">
                                                <p className="text-sm text-red-800">{vendor.rejectReason}</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Reject Reason */}
                                    {vendor.status === 'Rejected' && (
                                        <div>
                                            <h4 className="text-md font-medium text-gray-900 mb-2">Reject Reason</h4>
                                            <p className="text-sm text-gray-700">{vendor.rejectReason}</p>
                                        </div>
                                    )}

                                    {/* Documents */}
                                    <div className="md:col-span-2">
                                        <h4 className="text-md font-medium text-gray-900 mb-2">Documents</h4>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            {vendor.documents && Object.keys(vendor.documents).length > 0 ? (
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {vendor.documents.certificate && (
                                                        <li>
                                                            <a
                                                                href={vendor.documents.certificate}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                Air Carrier Certificate
                                                            </a>
                                                        </li>
                                                    )}
                                                    {vendor.documents.smsManual && (
                                                        <li>
                                                            <a
                                                                href={vendor.documents.smsManual}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                SMS Manual
                                                            </a>
                                                        </li>
                                                    )}
                                                    {vendor.documents.opsSpec && (
                                                        <li>
                                                            <a
                                                                href={vendor.documents.opsSpec}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                Operations Specifications
                                                            </a>
                                                        </li>
                                                    )}
                                                    {vendor.documents.insurance && (
                                                        <li>
                                                            <a
                                                                href={vendor.documents.insurance}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                Certificate of Insurance
                                                            </a>
                                                        </li>
                                                    )}
                                                    {vendor.documents.additionalCerts && (
                                                        <li>
                                                            <a
                                                                href={vendor.documents.additionalCerts}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center text-blue-600 hover:text-blue-800"
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                Additional Certifications
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500 text-sm">No documents provided</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            onClick={() => onUpdateStatus(vendor._id, 'Approved')}
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${vendor.status === 'Approved' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm`}
                        >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Approve
                        </button>
                        <button
                            type="button"
                            onClick={() => onUpdateStatus(vendor._id, 'Rejected')}
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${vendor.status === 'Rejected' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
                        >
                            <XCircle className="h-5 w-5 mr-2" />
                            Reject
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDetailView;
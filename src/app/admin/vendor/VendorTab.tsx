import React, { useState, useEffect } from 'react';
import { apiService, Vendor } from '../../services/apiService';
import VendorList from './VendorList';
import VendorFilters from './VendorFilters';
import VendorDetailView from './VendorDetailView';
import { AlertCircle, Loader2, X } from 'lucide-react';

// Add this new component for the rejection modal
const RejectVendorModal = ({
    isOpen,
    onClose,
    onConfirm,
    vendorName
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    vendorName: string;
}) => {
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
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
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <AlertCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Reject Vendor
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        You are about to reject <strong>{vendorName}</strong>. Please provide a reason for the rejection.
                                    </p>
                                    <div className="mt-4">
                                        <label htmlFor="reject-reason" className="block text-sm font-medium text-gray-700">
                                            Rejection Reason
                                        </label>
                                        <textarea
                                            id="reject-reason"
                                            name="reject-reason"
                                            rows={4}
                                            className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                            placeholder="Please provide a detailed reason for rejecting this vendor..."
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => onConfirm(reason)}
                            disabled={!reason.trim()}
                        >
                            Confirm Rejection
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VendorTab: React.FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        status: 'all',
        search: '',
        dateFrom: '',
        dateTo: ''
    });

    // New state for rejection modal
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [vendorToReject, setVendorToReject] = useState<{ id: string, name: string } | null>(null);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            setLoading(true);
            const response = await apiService.getAllVendors();
            if (response.data) {
                setVendors(response.data);
                setFilteredVendors(response.data);
            } else if (response.error) {
                setError(response.error);
            }
        } catch (err) {
            setError('Failed to fetch vendors');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Apply filters whenever filters state changes
        applyFilters();
    }, [filters, vendors]);

    const applyFilters = () => {
        let result = [...vendors];

        // Filter by status
        if (filters.status !== 'all') {
            result = result.filter(vendor => vendor.status === filters.status);
        }

        // Filter by search term (company name or email)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                vendor =>
                    vendor.companyName.toLowerCase().includes(searchLower) ||
                    vendor.email.toLowerCase().includes(searchLower)
            );
        }

        // Filter by date range
        if (filters.dateFrom) {
            const fromDate = new Date(filters.dateFrom);
            result = result.filter(vendor => new Date(vendor.createdAt) >= fromDate);
        }

        if (filters.dateTo) {
            const toDate = new Date(filters.dateTo);
            toDate.setHours(23, 59, 59); // Set to end of day
            result = result.filter(vendor => new Date(vendor.createdAt) <= toDate);
        }

        setFilteredVendors(result);
    };

    const handleFilterChange = (name: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateStatus = async (id: string, status: 'Approved' | 'Rejected' | 'Pending', rejectReason?: string) => {
        // If rejecting without a reason, show the modal
        if (status === 'Rejected' && !rejectReason) {
            const vendor = vendors.find(v => v._id === id);
            if (vendor) {
                setVendorToReject({ id, name: vendor.companyName });
                setRejectModalOpen(true);
                return;
            }
        }

        try {
            const response = await apiService.updateVendorStatus(id, status, rejectReason);
            if (response.data) {
                // Update local state
                const updatedVendors = vendors.map(vendor =>
                    vendor._id === id ? { ...vendor, status, ...(rejectReason ? { rejectReason } : {}) } : vendor
                );
                setVendors(updatedVendors);
                setFilteredVendors(filteredVendors.map(vendor =>
                    vendor._id === id ? { ...vendor, status, ...(rejectReason ? { rejectReason } : {}) } : vendor
                ));
            } else if (response.error) {
                setError(response.error);
            }
        } catch (err) {
            setError('Failed to update vendor status');
            console.error(err);
        }
    };

    const handleRejectConfirm = (reason: string) => {
        if (vendorToReject) {
            handleUpdateStatus(vendorToReject.id, 'Rejected', reason);
            setRejectModalOpen(false);
            setVendorToReject(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Vendor Management</h3>

                {error && (
                    <div className="mt-4 bg-red-50 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <VendorFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />

                    <div className="mt-4">
                        <VendorList
                            vendors={filteredVendors}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    </div>
                </div>
            </div>
            {vendorToReject && (
                <RejectVendorModal
                    isOpen={rejectModalOpen}
                    onClose={() => {
                        setRejectModalOpen(false);
                        setVendorToReject(null);
                    }}
                    onConfirm={handleRejectConfirm}
                    vendorName={vendorToReject.name}
                />
            )}
        </div>
    );
};

export default VendorTab;
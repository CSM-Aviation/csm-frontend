'use client'

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import SignatureCanvas from 'react-signature-canvas';
import { apiService } from '../services/apiService';
// import Image from 'next/image';


interface FormData {
    companyName: string;
    email: string;
    phone: string;
    argusStatus: string;
    argusAuditDate: string;
    wyvernStatus: string;
    wyvernAuditDate: string;
    isbaoStatus: string;
    isbaoAuditDate: string;
    alternativeCertification: string;
    smsDirectorName: string;
    smsDirectorPhone: string;
    hasMotionSimTraining: string;
    hasAccidents: string;
    accidentDetails: string;
    hasFatalAccident: string;
    firstName: string;
    lastName: string;
    signerTitle: string;
    agreesToTerms: boolean;
    crewQualSignature: string; // Renamed first signature
    finalSignature: string;    // Added second signature field
    signerName: string;
    finalSignerName: string;
    finalSignerTitle: string;
}

interface UploadResponse {
    status: string;
    message: string;
    fileUrl: string;
    key: string;
    expiresIn: string;
}

const VendorSubmissionForm = () => {
    const router = useRouter();
    const crewQualSigCanvas = useRef<SignatureCanvas>(null); // Renamed first signature ref
    const finalSigCanvas = useRef<SignatureCanvas>(null);    // Added second signature ref
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        email: '',
        phone: '',
        argusStatus: '',
        argusAuditDate: '',
        wyvernStatus: '',
        wyvernAuditDate: '',
        isbaoStatus: '',
        isbaoAuditDate: '',
        alternativeCertification: '',
        smsDirectorName: '',
        smsDirectorPhone: '',
        hasMotionSimTraining: '',
        hasAccidents: '',
        accidentDetails: '',
        hasFatalAccident: '',
        firstName: '',
        lastName: '',
        signerTitle: '',
        agreesToTerms: false,
        crewQualSignature: '', // Renamed first signature field
        finalSignature: '',    // Added second signature field
        signerName: '',
        finalSignerName: '',
        finalSignerTitle: '',
    });

    const [files, setFiles] = useState<{
        certificate: File | null;
        smsManual: File | null;
        opsSpec: File | null;
        insurance: File | null;
        additionalCerts: File | null;
    }>({
        certificate: null,
        smsManual: null,
        opsSpec: null,
        insurance: null,
        additionalCerts: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<React.ReactNode>('');

    const resetForm = () => {
        setFormData({
            companyName: '',
            email: '',
            phone: '',
            argusStatus: '',
            argusAuditDate: '',
            wyvernStatus: '',
            wyvernAuditDate: '',
            isbaoStatus: '',
            isbaoAuditDate: '',
            alternativeCertification: '',
            smsDirectorName: '',
            smsDirectorPhone: '',
            hasMotionSimTraining: '',
            hasAccidents: '',
            accidentDetails: '',
            hasFatalAccident: '',
            firstName: '',
            lastName: '',
            signerTitle: '',
            agreesToTerms: false,
            crewQualSignature: '',
            finalSignature: '',
            signerName: '',
            finalSignerName: '',
            finalSignerTitle: '',
        });
        setFiles({
            certificate: null,
            smsManual: null,
            opsSpec: null,
            insurance: null,
            additionalCerts: null,
        });
        clearSignatures();
        setSubmitStatus('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files: fileList } = e.target;
        if (fileList && fileList[0]) {
            setFiles(prev => ({
                ...prev,
                [name]: fileList[0]
            }));
        }
    };

    // Handle first signature (Crew Qualifications)
    const handleCrewQualSignatureEnd = () => {
        if (crewQualSigCanvas.current) {
            const signatureData = crewQualSigCanvas.current.toDataURL('image/png');
            setFormData(prev => ({
                ...prev,
                crewQualSignature: signatureData
            }));
        }
    };

    // Handle second signature (Final Agreement)
    const handleFinalSignatureEnd = () => {
        if (finalSigCanvas.current) {
            const signatureData = finalSigCanvas.current.toDataURL('image/png');
            setFormData(prev => ({
                ...prev,
                finalSignature: signatureData
            }));
        }
    };

    const clearCrewQualSignature = () => {
        if (crewQualSigCanvas.current) {
            crewQualSigCanvas.current.clear();
            setFormData(prev => ({
                ...prev,
                crewQualSignature: ''
            }));
        }
    };

    const clearFinalSignature = () => {
        if (finalSigCanvas.current) {
            finalSigCanvas.current.clear();
            setFormData(prev => ({
                ...prev,
                finalSignature: ''
            }));
        }
    };

    const clearSignatures = () => {
        clearCrewQualSignature();
        clearFinalSignature();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // First, upload all files
            const fileUrls: Record<string, string> = {};

            // Helper function to upload a single file
            const uploadFile = async (file: File | null, fieldName: string) => {
                // console.log("file", file)
                // console.log("file name", fieldName)
                if (!file) return;

                const fileFormData = new FormData();
                fileFormData.append('file', file);
                fileFormData.append('fieldName', fieldName);
                fileFormData.append('vendorName', formData.companyName || 'vendor');

                const uploadResponse = await apiService.post<UploadResponse>('/api/vendor-form/upload-document', fileFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (uploadResponse.error) {
                    throw new Error(`Error uploading ${fieldName}: ${uploadResponse.error}`);
                }
                console.log("uploadResponse", uploadResponse.data)

                if (uploadResponse.data && uploadResponse.data.fileUrl) {
                    return {
                        url: uploadResponse.data.fileUrl,
                        key: uploadResponse.data.key || null
                    };
                }
            };

            // Upload all files in parallel
            const uploadResults = await Promise.all([
                uploadFile(files.certificate, 'certificate'),
                uploadFile(files.smsManual, 'smsManual'),
                uploadFile(files.opsSpec, 'opsSpec'),
                uploadFile(files.insurance, 'insurance'),
                uploadFile(files.additionalCerts, 'additionalCerts')
            ]);

            const fileKeys = ['certificate', 'smsManual', 'opsSpec', 'insurance', 'additionalCerts'];
            uploadResults.forEach((result, index) => {
                if (result) {
                    fileUrls[fileKeys[index]] = result.url;
                }
            });
            console.log("fileUrls", fileUrls)

            // Then submit the form with file URLs
            const vendorData = {
                ...formData,
                documents: fileUrls,
                submittedAt: new Date().toISOString()
            };

            const response = await apiService.post('/api/vendor-form/submit', vendorData);
            console.log("response", response)
            if (response.error) {
                throw new Error(response.error);
            }

            setSubmitStatus(
                <div className="text-center space-y-4">
                    <div className="text-green-600 text-lg">
                        Submission successful!
                    </div>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                    >
                        Submit New Form
                    </button>
                </div>
            );
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus(
                <div className="text-center text-red-600">
                    An error occurred during submission. Please try again later.
                </div>
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen text-black bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Vendor Information & Agreement</h1>
                        <p className="mt-2 text-gray-600">Please complete all required fields and submit necessary documentation</p>
                    </div>

                    {submitStatus ? (
                        <div className="text-center p-8">
                            <div className="text-green-600 text-lg">{submitStatus}</div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information Section */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company Name / DBA*
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            required
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Primary Contact Email*
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Primary Contact Phone*
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="(000) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Document Upload Section */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Required Documents</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            135 Air Carrier Certificate*
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label
                                                        htmlFor="certificate-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                    >
                                                        <span>Upload file</span>
                                                        <input
                                                            id="certificate-upload"
                                                            name="certificate"
                                                            type="file"
                                                            required
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                            accept=".pdf,.doc,.docx"
                                                        />
                                                    </label>
                                                    <p className="pl-1">{files.certificate ? files.certificate.name : 'or drag and drop'}</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            SMS Manual*
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label
                                                        htmlFor="smsManual-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                    >
                                                        <span>Upload file</span>
                                                        <input
                                                            id="smsManual-upload"
                                                            name="smsManual"
                                                            type="file"
                                                            required
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                            accept=".pdf,.doc,.docx"
                                                        />
                                                    </label>
                                                    <p className="pl-1">{files.smsManual ? files.smsManual.name : 'or drag and drop'}</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Copy of Ops Spec w/ Aircraft Tail Number listed. (D085-1).*
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label
                                                        htmlFor="opsSpec-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                    >
                                                        <span>Upload file</span>
                                                        <input
                                                            id="opsSpec-upload"
                                                            name="opsSpec"
                                                            type="file"
                                                            required
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                            accept=".pdf,.doc,.docx"
                                                        />
                                                    </label>
                                                    <p className="pl-1">{files.opsSpec ? files.opsSpec.name : 'or drag and drop'}</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Certificate of Insurance.*
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label
                                                        htmlFor="insurance-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                    >
                                                        <span>Upload file</span>
                                                        <input
                                                            id="insurance-upload"
                                                            name="insurance"
                                                            type="file"
                                                            required
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                            accept=".pdf,.doc,.docx"
                                                        />
                                                    </label>
                                                    <p className="pl-1">{files.insurance ? files.insurance.name : 'or drag and drop'}</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Add other file upload fields similarly */}
                                </div>
                            </div>

                            {/* Safety Status Section */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Safety Status</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* ARGUS Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            ARGUS Status*
                                        </label>
                                        <input
                                            type="text"
                                            name="argusStatus"
                                            required
                                            value={formData.argusStatus}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter ARGUS status"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last ARGUS Audit Date
                                        </label>
                                        <input
                                            type="date"
                                            name="argusAuditDate"
                                            value={formData.argusAuditDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500
                                                [&::-webkit-calendar-picker-indicator]:bg-gray-100 
                                                [&::-webkit-calendar-picker-indicator]:rounded
                                                [&::-webkit-calendar-picker-indicator]:p-1
                                                [&::-webkit-calendar-picker-indicator]:hover:bg-gray-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Wyvern Status*
                                        </label>
                                        <input
                                            type="text"
                                            name="wyvernStatus"
                                            required
                                            value={formData.wyvernStatus}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter Wyvern status"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Wyvern Audit Date
                                        </label>
                                        <input
                                            type="date"
                                            name="wyvernAuditDate"
                                            value={formData.wyvernAuditDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500
                                                [&::-webkit-calendar-picker-indicator]:bg-gray-100 
                                                [&::-webkit-calendar-picker-indicator]:rounded
                                                [&::-webkit-calendar-picker-indicator]:p-1
                                                [&::-webkit-calendar-picker-indicator]:hover:bg-gray-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            ISBAO Status*
                                        </label>
                                        <input
                                            type="text"
                                            name="isbaoStatus"
                                            required
                                            value={formData.isbaoStatus}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter ISBAO status"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last ISBAO Audit Date
                                        </label>
                                        <input
                                            type="date"
                                            name="isbaoAuditDate"
                                            value={formData.isbaoAuditDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500
                                                [&::-webkit-calendar-picker-indicator]:bg-gray-100 
                                                [&::-webkit-calendar-picker-indicator]:rounded
                                                [&::-webkit-calendar-picker-indicator]:p-1
                                                [&::-webkit-calendar-picker-indicator]:hover:bg-gray-200"
                                        />
                                    </div>


                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            If not ARGUS, Wyvern, or IS-BAO, please advise on other safety auditing certification you conform to.
                                        </label>
                                        <input
                                            type="text"
                                            name="alternativeCertification"
                                            required
                                            value={formData.alternativeCertification}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter other auditing certification"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Director of SMS Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="smsDirectorName"
                                            required
                                            value={formData.smsDirectorName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter SMS Name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Director of SMS Phone Number*
                                        </label>
                                        <input
                                            type="tel"
                                            name="smsDirectorPhone"
                                            required
                                            value={formData.smsDirectorPhone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="(000) 000-0000"
                                        />
                                    </div>





                                    {/* Add other safety status fields similarly */}
                                </div>
                            </div>

                            {/* Agreement and Signature Section */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Agreement and Signature</h2>

                                <div className="mb-6">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="agreesToTerms"
                                                name="agreesToTerms"
                                                type="checkbox"
                                                required
                                                checked={formData.agreesToTerms}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    agreesToTerms: e.target.checked
                                                }))}
                                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <label htmlFor="agreesToTerms" className="text-sm text-gray-700">
                                                Company agrees that Flight Crew and Aircraft must meet our minimum crew qualifications as listed below. <span className="text-red-500">*</span>
                                            </label>
                                            {/* <p className="mt-2 text-sm text-gray-500">
                                                If an assigned crew member has been involved in an accident/incident or has had any FAA violations, a detailed explanation of the event will be required. The crew member will be subject to review and either approval or denial by our safety team.
                                            </p> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Signer's Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="signerName"
                                                required
                                                value={formData.signerName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Signer's Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="signerTitle"
                                                required
                                                value={formData.signerTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Digital Signature <span className="text-red-500">*</span>
                                    </label>
                                    <div className="border border-gray-300 rounded-md p-1 bg-white">
                                        <SignatureCanvas
                                            ref={crewQualSigCanvas}
                                            canvasProps={{
                                                width: 600,
                                                height: 200,
                                                className: 'w-full h-48 cursor-crosshair border rounded-md'
                                            }}
                                            onEnd={handleCrewQualSignatureEnd}
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={clearCrewQualSignature}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Clear
                                        </button>
                                    </div>

                                    <div className="mb-8 mt-4">
                                        <h3 className="text-lg font-semibold mb-4">Wingman Vetting Requirements</h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="border border-gray-400 bg-gray-300 p-2 text-left">Detail</th>
                                                        <th className="border border-gray-400 bg-gray-300 p-2 text-center">Standard<br />PIC</th>
                                                        <th className="border border-gray-400 bg-gray-300 p-2 text-center">Standard<br />SIC</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Type Rating</td>
                                                        <td className="border border-gray-400 p-2 text-center">Required</td>
                                                        <td className="border border-gray-400 p-2 text-center">Required</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Medical</td>
                                                        <td className="border border-gray-400 p-2 text-center">Class 1</td>
                                                        <td className="border border-gray-400 p-2 text-center">Class 1</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Total PIC</td>
                                                        <td className="border border-gray-400 p-2 text-center">2000 hrs</td>
                                                        <td className="border border-gray-400 p-2 text-center">0 hrs</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Total Time</td>
                                                        <td className="border border-gray-400 p-2 text-center">3500</td>
                                                        <td className="border border-gray-400 p-2 text-center">1250 hrs</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">PIC Multiengine</td>
                                                        <td className="border border-gray-400 p-2 text-center">1800 hrs</td>
                                                        <td className="border border-gray-400 p-2 text-center">0 hrs</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Total Multiengine</td>
                                                        <td className="border border-gray-400 p-2 text-center">2000 hrs</td>
                                                        <td className="border border-gray-400 p-2 text-center">500 hrs</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">PIC in Type</td>
                                                        <td className="border border-gray-400 p-2 text-center">100 hrs</td>
                                                        <td className="border border-gray-400 p-2 text-center">0 hrs</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Time in Type</td>
                                                        <td className="border border-gray-400 p-2 text-center">200 hrs</td>
                                                        <td className="border border-gray-400 p-2 text-center">50 hrs</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Instrument Proficiency</td>
                                                        <td className="border border-gray-400 p-2 text-center">within 6 mos</td>
                                                        <td className="border border-gray-400 p-2 text-center">N/A</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Line Check</td>
                                                        <td className="border border-gray-400 p-2 text-center">within 12 mos</td>
                                                        <td className="border border-gray-400 p-2 text-center">N/A</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Recurrent Training</td>
                                                        <td className="border border-gray-400 p-2 text-center">within 12 mos</td>
                                                        <td className="border border-gray-400 p-2 text-center">within 12 mos</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-gray-400 p-2">Motion based sim training</td>
                                                        <td className="border border-gray-400 p-2 text-center">Required</td>
                                                        <td className="border border-gray-400 p-2 text-center">Required</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <p className="mt-4 text-sm text-gray-600">
                                            By signing above, you confirm that your operation meets or exceeds these minimum crew qualification requirements.
                                        </p> */}
                                    </div>

                                    <p className="mt-2 text-sm text-gray-500">
                                        By signing this, your company acknowledges that any flight operated by you will adhere to our stated requirements.
                                        If the flight does not adhere to these requirements, it will be subject to review and possible cancellation at your expense.
                                    </p>
                                </div>
                            </div>

                            {/* Crew Training Section */}
                            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Crew Training and Safety</h2>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Do all crew members employed by you receive motion based sim training? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="hasMotionSimTraining"
                                        required
                                        value={formData.hasMotionSimTraining}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Please Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>

                                    {formData.hasMotionSimTraining === 'No' && (
                                        <p className="mt-2 text-sm text-red-600">
                                            If no, we will request additional training and safety information.
                                        </p>
                                    )}
                                </div>

                                {/* Safety Certificates Upload */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Safety Certificates:
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="additionalCerts"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                >
                                                    <span>Upload files</span>
                                                    <input
                                                        id="additionalCerts"
                                                        name="additionalCerts"
                                                        type="file"
                                                        multiple
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                                <p className="pl-1">{files.additionalCerts ? files.additionalCerts.name : 'or drag and drop'}</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Please upload any additional safety certificates held by your company
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Accident History */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Has your company had any accidents/incidents within the last 10 years? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="hasAccidents"
                                        required
                                        value={formData.hasAccidents}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Please Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Has an accident ever occurred on an aircraft that you operate that resulted in a fatality? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="hasFatalAccident"
                                        required
                                        value={formData.hasFatalAccident}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Please Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                {/* Accident Details - Shown conditionally if either accident question is "Yes" */}
                                {(formData.hasAccidents === 'Yes' || formData.hasFatalAccident === 'Yes') && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            If yes to either of the last two questions, please describe the accident/incident(s).
                                        </label>
                                        <textarea
                                            name="accidentDetails"
                                            value={formData.accidentDetails}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Dates/Details/Corrections made"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Final Agreement and Signature Section - SECOND SIGNATURE */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Final Agreement and Signature</h2>

                                <div className="mb-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Signer's Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="finalSignerName"
                                                required
                                                value={formData.finalSignerName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="sm:w-1/2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Signer's Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="finalSignerTitle"
                                                required
                                                value={formData.finalSignerTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Final Agreement Signature <span className="text-red-500">*</span>
                                    </label>
                                    <div className="border border-gray-300 rounded-md p-1 bg-white">
                                        <SignatureCanvas
                                            ref={finalSigCanvas}
                                            canvasProps={{
                                                width: 600,
                                                height: 200,
                                                className: 'w-full h-48 cursor-crosshair border rounded-md'
                                            }}
                                            onEnd={handleFinalSignatureEnd}
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={clearFinalSignature}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-700 font-medium">
                                        By signing this, your company acknowledges that any flight operated by you will adhere to our stated requirements.
                                        If the flight does not adhere to these requirements, it will be subject to review and possible cancellation at your expense.
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4 items-center">
                                {submitStatus && <p className="text-sm text-gray-600">{submitStatus}</p>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorSubmissionForm;
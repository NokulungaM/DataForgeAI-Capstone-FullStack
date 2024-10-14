import React, { useState } from 'react';
import Link from 'next/link';

const TermsAndConditions = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-left my-6">Terms and Conditions</h1>
            <hr className="border-b-2 border-gray-300 mb-6" />

            <p className="text-gray-600 text-xs mb-4">
                Please review our Terms and Conditions. You must agree to the T's and C's before proceeding.
            </p>
            
            <button
                onClick={handleModalToggle}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
            >
                Read T's and C's
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-[800px] w-full mx-4 h-[90vh] overflow-y-auto">
                        <h2 className="text-lg font-bold text-left">Terms and Conditions</h2>
                        <hr className="border-b-2 border-gray-300 mb-6" />

                        <h2 className="text-lg font-bold text-left">Introduction</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            Welcome to DishDash! By accessing or using our services, you agree to comply with and be bound by these terms and conditions. Please read them carefully.
                        </p>

                        <h2 className="text-lg font-bold text-left">Use of the Website</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            You may use our recipe website for personal purposes only. You agree not to use the website for any unlawful activities or to harm, disrupt, or impair the site's functioning.
                        </p>

                        <h2 className="text-lg font-bold text-left">User Content</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            By submitting recipes, comments, or other content, you grant us the right to use, distribute, and display this content on our platform. You are responsible for ensuring your content is original and does not infringe upon third-party rights.
                        </p>

                        <h2 className="text-lg font-bold text-left">Intellectual Property</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            All content on this website, including recipes, images, and designs, is the property of DishDash or its content suppliers. You may not reproduce or distribute any content without permission.
                        </p>

                        <h2 className="text-lg font-bold text-left">Third-party Links</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            Our website may contain links to third-party websites. These are provided for convenience, and we do not endorse the content or services of those websites. We are not responsible for any third-party websites' practices.
                        </p>

                        <h2 className="text-lg font-bold text-left">Limitation of Liability</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            We strive to ensure the accuracy of the recipes and content provided, but we are not liable for any errors, omissions, or damages resulting from the use of this website.
                        </p>

                        <h2 className="text-lg font-bold text-left">Termination of Access</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            We reserve the right to terminate or suspend your access to our website at any time, without notice, for violating these terms or engaging in harmful behavior.
                        </p>

                        <h2 className="text-lg font-bold text-left">Changes to Terms</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            We may update these terms and conditions from time to time. Any changes will be posted on this page, and your continued use of the website constitutes your acceptance of the updated terms.
                        </p>

                        <h2 className="text-lg font-bold text-left">Governing Law</h2>
                        <p className="text-gray-600 text-xs mb-4">
                            These terms are governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions.
                        </p>

                        <div className="flex items-center mb-6">
                            <input 
                                type="checkbox" 
                                id="agreeCheckbox" 
                                className="mr-2" 
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="agreeCheckbox" className="text-gray-600 text-xs">
                                I have read and agree to the Terms and Conditions.
                            </label>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleModalToggle}
                                className="bg-red-500 hover:bg-gray-400 px-4 py-2 rounded-full"
                            >
                                Close
                            </button>
                            {isChecked && (
                                <Link href="/aboutUs">
                                    <button
                                        type="button"
                                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full"
                                    >
                                        Agree
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TermsAndConditions;

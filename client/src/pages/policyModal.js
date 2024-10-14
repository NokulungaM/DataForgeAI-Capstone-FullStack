import React, { useState } from 'react';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[800px] w-full mx-4 h-[1122px] overflow-auto"> {/* Added overflow-auto for scrolling */}
                <h2 className="text-3xl font-bold text-center mb-4">Privacy Policy</h2>
                <hr className="border-b-2 border-gray-300 mb-4" />

                <h2 className="text-lg font-bold">Collection of personal information</h2>
                <br />
                <p className="text-gray-600 text-sm">
                    You can access and use the Services without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the features offered on Services, you may be asked to provide certain Personal Information (for example, your name and email address).
                </p>
                <br />
                <p className="text-gray-600 text-sm">
                    We receive and store any information you knowingly provide to us when you create an account, publish content, or fill any forms on Services. When required, this information may include the following:
                </p>
                <br />
                <ul className="list-disc list-inside text-gray-600 text-sm">
                    <li>Account details (such as username, unique user ID, password, etc)</li>
                    <li>Contact information (such as email address, phone number, etc)</li>
                    <li>Basic personal information (such as name, country of residence, etc)</li>
                    <li>Any messages or inquiries you submit</li>
                </ul>
                <br />
                <p className="text-gray-600 text-sm">You can choose not to provide us with your Personal information, but then you may not be able to take advantage of some of the features on the Services. Users who are uncertain about what information is mandatory are welcome to contact us.</p>
                <br />
                <h1 className="text-lg font-bold">Use and processing of collected information</h1>
                <br />
                <p className="text-gray-600 text-sm">We act as a data controller and a data processor when handling Personal Information, unless we have entered into a data processing agreement with you in which case you would be the data controller and we would be the data processor.</p>
                <br />
                <p className="text-gray-600 text-sm">Our role may also differ depending on the specific situation involving Personal Information. We act in the capacity of a data controller when we ask you to submit your Personal Information that is necessary to ensure your access and use of the Services. In such instances, we are a data controller because we determine the purposes and means of the processing of Personal Information.</p>
                <br />
                <p className="text-gray-600 text-sm">We act in the capacity of a data processor in situations when you submit Personal Information through the Services. We do not own, control, or make decisions about the submitted Personal Information, and such Personal Information is processed only in accordance with your instructions. In such instances, the User providing Personal Information acts as a data controller.</p>
                <br />
                <p className="text-gray-600 text-sm">In order to make the Services available to you, or to meet a legal obligation, we may need to collect and use certain Personal Information. If you do not provide the information that we request, we may not be able to provide you with the requested products or services. Any of the information we collect from you may be used for the following purposes:</p>
                <br />
                <ul className="list-disc list-inside text-gray-600 text-sm">
                    <li>Create and manage user accounts</li>
                    <li>Protect from abuse and malicious users</li>
                    <li>Run and operate the Services</li>
                </ul>
                <br />
                <p className="text-gray-600 text-sm">Processing your Personal information depends on how you interact with the Services, where you are located in the world, and if one of the following applies: (a) you have given your consent for one or more specific purposes; (b) provision of information is necessary for the performance of this Policy with you and/or for any pre-contractual obligations thereof; (c) processing is necessary for compliance with a legal obligation to which you are subject; (d) processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in us; (e) processing is necessary for the purposes of the legitimate interests pursued by us or by a third party. We may also combine or aggregate some of your Personal Information in order to better serve you and to improve and update our Services.</p>
                <br />
                <p className="text-gray-600 text-sm">Note that under some legislations we may be allowed to process information until you object to such processing by opting out, without having to rely on consent or any other of the legal bases. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contact.</p>
                <br />
                <div className="text-center mt-4">
                    <button onClick={onClose} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white">
                        Agree
                    </button>
                </div>
            </div>
        </div>
    );
};

const YourComponent = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-white">
                Read T's and C's
            </button>
            <PrivacyPolicyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
};

export default YourComponent;

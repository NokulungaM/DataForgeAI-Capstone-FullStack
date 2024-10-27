import React from 'react';
import Link from 'next/link';

const Policy = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 mt-10">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-[800px] w-full mx-4 h-[90vh] overflow-auto"> {/* Adjusted height to fill space */}
                <h1 className="text-3xl font-bold text-center my-6">Privacy Policy</h1>
                <hr className="border-b-2 border-gray-300 mb-6" />

                <h2 className="text-lg font-bold text-center">Collection of Personal Information</h2>
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

                <h2 className="text-lg font-bold text-center">Use and Processing of Collected Information</h2>
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
                <p className="text-gray-600 text-sm">Note that under some legislations we may be allowed to process information until you object to such processing by opting out, without having to rely on consent or any other of the legal bases. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>
                <br />

                <div className="text-center mb-6"> {/* Added margin bottom to separate from the footer */}
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-white font-semibold transition-transform transform hover:scale-105 shadow-lg inline-block"
                    >
                        <Link href="/aboutUs" legacyBehavior>
                            <a className="block w-full h-full text-center">Agree</a>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Policy;

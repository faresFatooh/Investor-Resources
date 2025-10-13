
import React from 'react';

interface GetInTouchSectionProps {
    isActive: boolean;
}

export const GetInTouchSection: React.FC<GetInTouchSectionProps> = ({ isActive }) => {
    return (
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-xl font-semibold mb-4 text-dark-blue">Contact Information</h3>
                <p className="text-gray-600 mb-2">For any investor-related inquiries, please feel free to reach out to us.</p>
                <p className="text-gray-600 mb-4"><strong>Email:</strong> ir@example.com</p>
                
                <h3 className="text-xl font-semibold mb-4 text-dark-blue">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-500 hover:text-header-blue transition-colors">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-header-blue transition-colors">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                </div>
            </div>
            <div>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-header-blue focus:border-header-blue sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-header-blue focus:border-header-blue sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-header-blue focus:border-header-blue sm:text-sm"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#043244] hover:bg-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-header-blue transition-colors">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

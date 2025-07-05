import { useState } from 'react';
import { FiX, FiShare2, FiMail } from 'react-icons/fi';

const ShareModal = ({ isOpen, onClose, task, onShare }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter an email address');
      setMessageType('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await onShare(task._id, email.trim());
      setMessage('Task shared successfully!');
      setMessageType('success');
      setEmail('');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setMessage('');
        setMessageType('');
      }, 2000);
    } catch (error) {
      setMessage(error.message || 'Failed to share task');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setMessage('');
    setMessageType('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FiShare2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Share Task</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Task Preview */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-medium text-gray-800 mb-1">
              {task?.title}
            </h3>
            {task?.description && (
              <p className="text-sm text-gray-600">
                {task.description}
              </p>
            )}
          </div>

          {/* Share Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Share with email:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-3 rounded-md text-sm ${
                messageType === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sharing...</span>
                  </>
                ) : (
                  <>
                    <FiShare2 className="h-4 w-4" />
                    <span>Share Task</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700">
              💡 The user must have an account with this email address to receive the shared task.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
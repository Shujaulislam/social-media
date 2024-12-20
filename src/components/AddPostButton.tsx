import React from "react";
import { Plus } from "lucide-react"; // Icon library compatible with shadcn

interface FloatingPostButtonProps {
  onClick: () => void; // Callback when the button is clicked
}

const AddPostButton: React.FC<FloatingPostButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Add Post"
    >
      <Plus className="w-6 h-6 text-white" />
    </button>
  );
};

export default AddPostButton;

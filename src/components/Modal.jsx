const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-zinc-300 text-black rounded-xl p-6 w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
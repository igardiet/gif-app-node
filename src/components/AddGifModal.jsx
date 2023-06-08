import { GifForm } from './GifForm';
import { MdCancel } from 'react-icons/md';

export const AddGifModal = ({ onClose }) => {
  return (
    <div
      className='fixed top-0 right-0 bottom-0 left-0 m-auto z-50 h-screen w-screen flex items-center justify-center backdrop-blur-sm'
    >
      <span className='h-1/2 w-1/2 bg-[#f1f2f6] rounded border-3 border-[#303952]'>
        <button
          type='button'
          className='close pl-1'
          data-dismiss='modal'
          aria-label='Close'
          onClick={onClose}
        >
          <MdCancel className='text-[#ff3f34] m-1 h-6 w-6 mb-0' />
        </button>
        <GifForm onClose={onClose} />
      </span>
    </div>
  );
};

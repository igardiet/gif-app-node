import { GifForm } from './GifForm';

export const AddGifModal = ({ onClose }) => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 m-auto z-50 h-screen w-screen flex items-center justify-center backdrop-blur-sm'>
      <span className='h-1/2 w-1/2 bg-[#f1f2f6] rounded'>
        <button
          type='button'
          className='close pl-1'
          data-dismiss='modal'
          aria-label='Close'
          onClick={onClose}
        >
          X
        </button>
        <GifForm onClose={onClose} />
      </span>
    </div>
  );
};

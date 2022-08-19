import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
  modalState: boolean;
  modalTitle: string;
  modalDescription: string;
  buttonText1?: string;
  buttonText2?: string;
  buttonAction1?: () => void;
  buttonAction2?: () => void;
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  modalState,
  modalTitle,
  modalDescription,
  buttonText1,
  buttonAction1,
  buttonText2,
  buttonAction2,
  closeModal,
  children,
}) => {
  function handleClose() {
    closeModal();
  }

  return (
    <>
      <Transition appear show={modalState} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {modalTitle}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{modalDescription}</p>
                </div>

                {children}

                <div className="mt-4 space-x-2 flex flex-row items-end justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      if (buttonAction1) buttonAction1();
                      handleClose();
                    }}
                  >
                    {buttonText1}
                  </button>
                  {buttonText2 ? (
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={() => {
                        if (buttonAction2) buttonAction2();
                        handleClose();
                      }}
                    >
                      {buttonText2}
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

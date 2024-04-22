import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ToastType } from '../interfaces/ToastType';

/**
 * Show toast message
 *
 * @param type INFO | ERROR | SUCCESS
 * @param message Toast message
 * @param ttl Time to live
 * @returns Callback function to show toast
 */
const showToast = (type: ToastType = ToastType.INFO, message: string, ttl: number = 5000) => {
    switch (type) {
        case ToastType.ERROR:
            toast.error(message, {
                position: "top-right",
                autoClose: ttl,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        break;
        case ToastType.SUCCESS:
            toast.success(message, {
                position: "top-right",
                autoClose: ttl,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        break;
        case ToastType.INFO:
            toast.info(message, {
                position: "top-right",
                autoClose: ttl,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        break;
    }
};

const httpError = (status: number, message: string) => {
    const res = status + ": " + message;
    return res;
};

export default { showToast, httpError };
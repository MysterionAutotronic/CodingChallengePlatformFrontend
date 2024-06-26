import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user from '../../services/user';
import './ResetPasswordRequest.css';
import { ToastType } from '../../interfaces/ToastType';
import toast from '../../services/toast';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { StatusCodes } from 'http-status-codes';

/**
 * Reset Password Request Page
 * @author Matthias Roy
 *
 * @returns {React.ReactNode}
 */
const ResetPasswordRequest = () => {
    // Context
    /**
     * i18next Context
     * @author Matthias Roy
     *
     * @type {TFunction<[string, string], undefined>}
     */
    const { t } = useTranslation(['resetPassword', 'main']);

    // States
    /**
     * Email State
     * @author Matthias Roy
     *
     * @type {string}
     */
    const [email, setEmail] = useState<string>('');
    /**
     * Submit Staus State
     * @author Matthias Roy
     *
     * @type {boolean}
     */
    const [submitStatus, setSubmitStatus] = useState<boolean>(false);

    // Hooks
    /**
     * useNavigate Hook
     * @author Matthias Roy
     *
     * @type {NavigateFunction}
     */
    const navigate = useNavigate();

    /**
     * Handle Email Change
     * @author Matthias Roy
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    /**
     * Handle Form Submit
     * @author Matthias Roy
     *
     * @async
     * @param {React.FormEvent<HTMLFormElement>} e
     * @returns {void}
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus(true);

        try {
            const res = await user.requestPasswordChange(email);

            switch (res.status) {
                case StatusCodes.OK:
                    toast.showToast(ToastType.SUCCESS, t('successRequest'));
                    setSubmitStatus(false);
                    navigate('/login');
                    break;
                case StatusCodes.UNPROCESSABLE_ENTITY:
                    toast.showToast(ToastType.ERROR, t('errorInvalidEmail'));
                    setSubmitStatus(false);
                    break;
                case StatusCodes.NOT_FOUND:
                    toast.showToast(ToastType.ERROR, t('errorMailNotExists'));
                    setSubmitStatus(false);
                    break;
            }
        } catch (err) {
            toast.showToast(ToastType.ERROR, t('errorResetPassword'));
            setSubmitStatus(false);
        }
    };

    return (
        <div className="center">
            <form
                className="reset-form"
                onSubmit={handleSubmit}
                data-testid="reset-password-request-form"
            >
                <div className="input-wrapper">
                    <div className="input-with-label">
                        <label htmlFor="email">
                            {t('email', { ns: 'main' })}:
                        </label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>
                </div>
                <div className="oneLine">
                    <Button
                        text={t('buttonRequestNewPassword')}
                        loading={submitStatus}
                        disabled={submitStatus}
                    />
                    <Link to={'/login'}>
                        <Button
                            text={t('buttonCancel', { ns: 'main' })}
                        />
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordRequest;

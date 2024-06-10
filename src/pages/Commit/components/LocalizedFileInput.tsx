import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './LocalizedFileInput.css';

interface LocalizedFileInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
}

const LocalizedFileInput: React.FC<LocalizedFileInputProps> = ({ onChange, accept }) => {
    const { t } = useTranslation(['userProject']);
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        }
        else {
            setFileName("");
        }
        onChange(event);
    };

    return (
        <div>
            <input
                type='file'
                accept={accept}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                id='fileInput'
                name='filePath'
                data-testid="fileUpload"
            />
            <label htmlFor='fileInput' className='custom-file-input'>
                <button type="button">
                    {t('browse')}
                </button>
            </label>
            <span className='localized-file-input-span'>{(fileName === "") ? t('noFileSelected') : (fileName)}</span>
        </div>
    );
};

export default LocalizedFileInput;
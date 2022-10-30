import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';

const EditableCell = ({
    initialValue,
    saveValue,
    renderCell,
    renderEditView,
    readonly,
}) => {
    const [currentValue, setValue] = useState(initialValue);
    const [isEditing, setEditing] = useState(false);

    const {
        mutate,
        isLoading: isSaving,
        isError,
    } = useMutation(
        async () => {
            await saveValue(currentValue);
        },
        {
            onSettled: () => setEditing(false),
        }
    );

    function toggleEditing() {
        if (readonly) {
            return;
        }

        setEditing((value) => !value);
    }

    function onKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                setValue(initialValue);
                setEditing(false);
                e.preventDefault();
                break;

            case 'Enter':
                mutate();
                break;
        }
    }

    if (isEditing) {
        return renderEditView({
            value: currentValue,
            disabled: isSaving,
            error: isError,
            onKeyDown,
            onChange: (v) => setValue(v),
            onBlur: () => mutate(),
        });
    }

    return renderCell({
        value: currentValue,
        onClick: toggleEditing,
    });
};
EditableCell.propTypes = {
    initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    saveValue: PropTypes.func.isRequired,
    renderCell: PropTypes.func.isRequired,
    renderEditView: PropTypes.func.isRequired,
    readonly: PropTypes.bool,
};
EditableCell.defaultProps = {
    readonly: false,
};

export default EditableCell;

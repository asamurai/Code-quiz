import hocHelpers from './hocHelpers';

const {
    getValuesFromForm,
    getCertainValuesFromForm
} = hocHelpers;

const customForm = {
    name: { value: '' },
    phone: { value: '' }
};

describe('Hoc helpers test', () => {
    it('getValuesFromForm helper test', () => {
        expect(
            getValuesFromForm(customForm)
        ).toEqual(
            {
                name: '',
                phone: ''
            }
        );
    });
    it('getCertainValuesFromForm helper test', () => {
        const certaineListOfParams = ['name'];
        expect(
            getCertainValuesFromForm(customForm, certaineListOfParams)
        ).toEqual(
            {
                name: ''
            }
        );
    });
});

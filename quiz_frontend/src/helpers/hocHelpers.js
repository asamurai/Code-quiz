/**
 * Function for Antd form HOC  
 * 
 * Returns a value into parents state on forms change
 * 
 * @param {object} props       current state of form
 * @param {array}  fieldNames  field names to be subsribed
 * 
 * @return {object}            Form state
 */
export const getPropsObject = (props, fieldNames) => {
    const madePropsObj = (prev, curName) => ({
        ...prev,
        [curName]: {
            ...props[curName],
            value: props[curName].value
        }
    });

    return fieldNames.reduce(madePropsObj, {});
};

/**
 * Function for getting values of form state from state object
 * 
 * Returns an object of form values
 * 
 * @param {object} formState      current values of form
 * 
 * @return {object}               form values
 */
export const getValuesFromForm = formState => 
    Object.entries(formState)
    .reduce(
        (prev, curr) => ({
            ...prev,
            [curr[0]]: curr[1]['value']
        }),
        {}
    );

/**
 * Function for getting certain values of form state from state object
 * 
 * Returns an object of form values
 * 
 * @param {object}   formState      current values of form
 * @param {array}    keys           list of values of form to be returned
 * 
 * @return {object}                 form values
 */
export const getCertainValuesFromForm = (formState, keys) => 
    Object.entries(formState)
    .filter((entry) => keys.includes(entry[0]))
    .reduce((prev, curr) => ({
        ...prev,
        [curr[0]]: curr[1]['value']
    }), {});

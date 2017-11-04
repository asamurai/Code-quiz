export const getPropsObject = (props, fieldNames) => {
    const madePropsObj = (rez, curName) => ({
        ...rez,
        [curName]: {
            ...props[curName],
            value: props[curName].value
        }
    });

    return fieldNames.reduce(madePropsObj, {});
};

export const getValuesFromForm = formState => 
    Object.entries(formState)
    .reduce(
        (prev, curr) => ({
            ...prev,
            [curr[0]]: curr[1]['value']
        }),
        {}
    );

export const getCertainValuesFromForm = (formState, keys) => 
    Object.entries(formState)
    .filter((entry) => keys.includes(entry[0]))
    .reduce((prev, curr) => ({
        ...prev,
        [curr[0]]: curr[1]['value']
    }), {});

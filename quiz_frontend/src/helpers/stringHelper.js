const capitalize = ([first,...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

export default {
    capitalize
};

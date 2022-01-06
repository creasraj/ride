export default {
    getQueryString: (queryMapping = {}) => {
        const queryString = Object.keys(queryMapping)
            .filter(key => queryMapping[key] !== undefined)
            .map(
                key =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(queryMapping[key])}`,
            )
            .join('&');
        return `${"?"}${queryString}`;
    },
};

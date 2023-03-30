module.exports = {
    extends: ["react-app", "react-app/jest", "prettier"],
    rules: {
        "no-console": "warn",
        "react/self-closing-comp": [
            "error",
            {
                component: true,
                html: true,
            },
        ],
    },
};

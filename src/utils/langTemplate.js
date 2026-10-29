const cppTemplate = (functionalCode, implementerCode) => {
    const completeCode = `
#include <bits/stdc++.h>
using namespace std;

${functionalCode}

${implementerCode}
`;

    return completeCode;
};

const pythonTemplate = (functionalCode, implementerCode) => {
    const completeCode = `
${functionalCode}

${implementerCode}
`;

    return completeCode;
};

const javaTemplate = (functionalCode, implementerCode) => {
    const completeCode = `
${functionalCode}

${implementerCode}
`;

    return completeCode;
};

export {cppTemplate, pythonTemplate, javaTemplate};